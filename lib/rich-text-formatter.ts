import { resolveImageUrl } from "./utils";

export type RichTextMode = "general" | "news" | "job" | "exam";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface FormatRichTextOptions {
  mode?: RichTextMode;
  extractHeadings?: boolean;
  injectHeadingAnchors?: boolean;
  headingScrollMargin?: number;
  imageWidth?: number;
  imageQuality?: number;
}

export interface FormatRichTextResult {
  html: string;
  headings: HeadingItem[];
}

// ─── Regular Expressions ───────────────────────────────────────────────────
const HEADING_RE = /^(#{1,6})\s+(.+)$/;
const BQ_RE = /^>\s*(.*)$/;
const HR_RE = /^(\*{3,}|-{3,}|_{3,})$/;
const BARE_MARKER_RE = /^(\d+|[a-zA-Z]|[ivxlcdmIVXLCDM]+)[.)]$/;
const PAREN_LINE_RE = /^\(.+\)$/;

const UL_ITEM_RE = /^(\s*)[*\-•–●]\s+(.+)$/;
const OL_NUM_ITEM_RE = /^(\s*)\d+[.)]\s+(.+)$/;
const OL_ALPHA_ITEM_RE = /^(\s*)[a-zA-Z][.)]\s+(.+)$/;
const OL_ROMAN_ITEM_RE = /^(\s*)((?:x{1,3})?(?:ix|iv|v?i{1,3}|v))[.)]\s+(.+)$/i;

const TAG_REGEX = /<[^>]*>/g;
const SLUG_STRIP_REGEX = /[^a-z0-9]+/g;
const SLUG_TRIM_REGEX = /(^-|-$)/g;

const MINOR_WORDS = new Set([
  "to", "of", "and", "the", "a", "an", "in", "on", "for",
  "with", "by", "at", "from", "or", "as",
]);

type ListKind = "ul" | "ol" | "alpha" | "roman";
interface ListItemMatch {
  kind: ListKind;
  indent: number;
  text: string;
}

function indentOf(rawLine: string): number {
  const m = rawLine.match(/^(\s*)/);
  return m ? m[1].replace(/\t/g, "    ").length : 0;
}

function classifyListItem(rawLine: string, currentType: ListKind | null): ListItemMatch | null {
  let m = rawLine.match(UL_ITEM_RE);
  if (m) return { kind: "ul", indent: indentOf(rawLine), text: m[2] };

  m = rawLine.match(OL_NUM_ITEM_RE);
  if (m) return { kind: "ol", indent: indentOf(rawLine), text: m[2] };

  const alphaM = rawLine.match(OL_ALPHA_ITEM_RE);
  const romanM = rawLine.match(OL_ROMAN_ITEM_RE);

  if (alphaM && romanM) {
    if (currentType === "roman") {
      return { kind: "roman", indent: indentOf(rawLine), text: romanM[3] };
    }
    return { kind: "alpha", indent: indentOf(rawLine), text: alphaM[2] };
  }
  if (romanM) {
    return { kind: "roman", indent: indentOf(rawLine), text: romanM[3] };
  }
  if (alphaM) {
    return { kind: "alpha", indent: indentOf(rawLine), text: alphaM[2] };
  }
  return null;
}

function isOtherBlock(rawLine: string): boolean {
  const t = rawLine.trim();
  if (!t) return false;
  if (HEADING_RE.test(t)) return true;
  if (HR_RE.test(t)) return true;
  if (BQ_RE.test(t)) return true;
  if (PAREN_LINE_RE.test(t)) return true;
  return false;
}

function applyInline(str: string): string {
  return str
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<s>$1</s>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function looksLikeHeading(line: string): boolean {
  if (/[.!?:,;]$/.test(line)) return false;
  if (/^[(]/.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length > 8) return false;
  let majorWords = 0;
  let capWords = 0;
  for (const w of words) {
    const clean = w.replace(/[^A-Za-z]/g, "");
    if (!clean) continue;
    if (MINOR_WORDS.has(clean.toLowerCase())) continue;
    majorWords++;
    if (/^[A-Z]/.test(clean)) capWords++;
  }
  if (majorWords === 0) return false;
  return capWords / majorWords >= 0.8;
}

interface TreeNode {
  tag: string;
  attrs: string;
  children: TreeNode[];
  value?: string;
}

function parseListTree(html: string): TreeNode {
  const tagRe = /<(\/?)(\s*)(ul|ol|li)\b([^>]*)>/gi;
  let lastIndex = 0;
  const root: TreeNode = { tag: "root", attrs: "", children: [] };
  const stack: TreeNode[] = [root];
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html))) {
    const [full, closing, , tagName, attrs] = m;
    const textBefore = html.slice(lastIndex, m.index);
    if (textBefore) stack[stack.length - 1].children.push({ tag: "#text", attrs: "", children: [], value: textBefore });
    lastIndex = m.index + full.length;

    if (!closing) {
      const node: TreeNode = { tag: tagName.toLowerCase(), attrs, children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else {
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tagName.toLowerCase()) {
          stack.length = i;
          break;
        }
      }
    }
  }
  const trailing = html.slice(lastIndex);
  if (trailing) stack[stack.length - 1].children.push({ tag: "#text", attrs: "", children: [], value: trailing });
  return root;
}

function serializeTree(node: TreeNode): string {
  if (node.tag === "#text") return node.value ?? "";
  const inner = node.children.map(serializeTree).join("");
  if (node.tag === "root") return inner;
  return `<${node.tag}${node.attrs}>${inner}</${node.tag}>`;
}

function isBlankNode(node: TreeNode): boolean {
  return node.tag === "#text" && (node.value ?? "").trim() === "";
}

function unwrapRedundantNestedLists(node: TreeNode): TreeNode {
  if (node.tag === "#text") return node;
  node.children = node.children.map(unwrapRedundantNestedLists);

  if (node.tag === "ul" || node.tag === "ol") {
    const meaningfulChildren = node.children.filter((c) => !isBlankNode(c));
    if (meaningfulChildren.length === 1 && meaningfulChildren[0].tag === "li") {
      const li = meaningfulChildren[0];
      const liMeaningful = li.children.filter((c) => !isBlankNode(c));
      if (liMeaningful.length === 1 && (liMeaningful[0].tag === "ul" || liMeaningful[0].tag === "ol")) {
        return liMeaningful[0];
      }
    }
  }
  return node;
}

export function cleanRedundantNestedLists(html: string): string {
  if (!/<(ul|ol)\b/i.test(html)) return html;
  const tree = parseListTree(html);
  return serializeTree(unwrapRedundantNestedLists(tree));
}

function convertMarkdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];

  function peekNextNonBlank(idx: number): { line: string; index: number } | null {
    let j = idx;
    while (j < lines.length && lines[j].trim() === "") j++;
    return j < lines.length ? { line: lines[j], index: j } : null;
  }

  const TAG_FOR: Record<ListKind, "ul" | "ol"> = { ul: "ul", ol: "ol", alpha: "ol", roman: "ol" };
  const TYPE_ATTR_FOR: Record<ListKind, string> = { ul: "", ol: "", alpha: ' type="a"', roman: ' type="i"' };

  function parseList(start: number, baseIndent: number): { html: string; next: number } {
    let i = start;
    let currentType: ListKind | null = null;
    const items: string[] = [];

    while (i < lines.length) {
      const raw = lines[i];
      const trimmed = raw.trim();

      if (trimmed === "") {
        const next = peekNextNonBlank(i + 1);
        if (!next) break;
        const peekItem = classifyListItem(next.line, currentType);
        if (peekItem && peekItem.indent >= baseIndent) {
          i = next.index;
          continue;
        }
        break;
      }

      if (isOtherBlock(raw)) break;

      const item = classifyListItem(raw, currentType);
      if (!item) break;
      if (item.indent < baseIndent) break;
      if (currentType === null) currentType = item.kind;
      if (item.indent === baseIndent && item.kind !== currentType) break;

      if (item.indent > baseIndent) {
        if (items.length === 0) break;
        const nested = parseList(i, item.indent);
        items[items.length - 1] += nested.html;
        i = nested.next;
        continue;
      }

      let itemText = applyInline(item.text);
      i++;

      for (;;) {
        if (i >= lines.length) break;
        const rawNext = lines[i];
        const trimmedNext = rawNext.trim();

        if (trimmedNext === "") {
          const next = peekNextNonBlank(i + 1);
          if (!next) break;
          const peekItem = classifyListItem(next.line, currentType);
          if (peekItem && peekItem.indent > baseIndent) {
            i = next.index;
            const nested = parseList(i, peekItem.indent);
            itemText += nested.html;
            i = nested.next;
            continue;
          }
          break;
        }

        if (isOtherBlock(rawNext)) break;

        const nextItem = classifyListItem(rawNext, currentType);
        if (nextItem) {
          if (nextItem.indent > baseIndent) {
            const nested = parseList(i, nextItem.indent);
            itemText += nested.html;
            i = nested.next;
            continue;
          }
          break;
        }

        if (BARE_MARKER_RE.test(trimmedNext)) {
          i++;
          continue;
        }

        break;
      }

      items.push(itemText);
    }

    const tag = currentType ? TAG_FOR[currentType] : "ul";
    const typeAttr = currentType ? TYPE_ATTR_FOR[currentType] : "";
    let html = `<${tag}${typeAttr}>\n`;
    items.forEach((it) => (html += `  <li>${it}</li>\n`));
    html += `</${tag}>\n`;
    return { html, next: i };
  }

  let bqBuffer: string[] = [];
  function flushBlockquote() {
    if (!bqBuffer.length) return;
    const lastLine = bqBuffer[bqBuffer.length - 1];
    const isCite = /^[-–—]/.test(lastLine);
    if (isCite) {
      const quote = bqBuffer.slice(0, -1).join("<br />");
      output.push(
        `<blockquote>${applyInline(quote)}<cite>${applyInline(
          lastLine.replace(/^[-–—]\s*/, "")
        )}</cite></blockquote>`
      );
    } else {
      output.push(`<blockquote>${applyInline(bqBuffer.join("<br />"))}</blockquote>`);
    }
    bqBuffer = [];
  }

  let paraBuffer: string[] = [];
  function flushPara() {
    if (!paraBuffer.length) return;
    const joined = paraBuffer.join("<br />");
    output.push(`<p>${applyInline(joined)}</p>`);
    paraBuffer = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      flushBlockquote();
      flushPara();
      continue;
    }

    if (HR_RE.test(trimmed)) {
      flushBlockquote();
      flushPara();
      output.push("<hr />");
      continue;
    }

    const hMatch = trimmed.match(HEADING_RE);
    if (hMatch) {
      flushBlockquote();
      flushPara();
      const level = Math.min(hMatch[1].length, 4);
      const tag = level <= 2 ? "h2" : level === 3 ? "h3" : "h4";
      output.push(`<${tag}>${applyInline(hMatch[2])}</${tag}>`);
      continue;
    }

    const bqMatch = trimmed.match(BQ_RE);
    if (bqMatch) {
      flushPara();
      bqBuffer.push(bqMatch[1]);
      continue;
    } else if (bqBuffer.length) {
      flushBlockquote();
    }

    const listItem = classifyListItem(raw, null);
    if (listItem) {
      flushPara();
      const result = parseList(i, listItem.indent);
      output.push(result.html.trimEnd());
      i = result.next - 1;
      continue;
    }

    if (BARE_MARKER_RE.test(trimmed)) {
      continue;
    }

    if (PAREN_LINE_RE.test(trimmed)) {
      flushPara();
      output.push(`<p><strong>${applyInline(trimmed)}</strong></p>`);
      continue;
    }

    if (looksLikeHeading(trimmed)) {
      flushPara();
      output.push(`<h2>${applyInline(trimmed)}</h2>`);
      continue;
    }

    paraBuffer.push(trimmed);
  }

  flushBlockquote();
  flushPara();

  return output.join("\n");
}

/**
 * Parses and injects anchor IDs & scroll margins into headings (h2/h3).
 */
export function injectHeadings(
  html: string,
  scrollMarginPx = 120
): { html: string; headings: HeadingItem[] } {
  const headings: HeadingItem[] = [];
  let counter = 0;

  const parsedHtml = html.replace(
    /<(h2|h3)(\s+[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, innerHtml: string) => {
      const cleanText = innerHtml
        .replace(/&nbsp;/g, " ")
        .replace(/\u00a0/g, " ")
        .replace(TAG_REGEX, "")
        .trim();
      const slug = cleanText
        .toLowerCase()
        .replace(SLUG_STRIP_REGEX, "-")
        .replace(SLUG_TRIM_REGEX, "");
      const generatedId = `heading-${slug || "section"}-${counter++}`;
      const level = tag.toLowerCase() === "h2" ? 2 : 3;

      let headingAttrs = attrs || "";

      // Extract or set id
      const idMatch = headingAttrs.match(/id=(['"])(.*?)\1/i);
      const id = idMatch ? idMatch[2] : generatedId;
      headings.push({ text: cleanText, id, level });

      if (!idMatch) {
        headingAttrs = ` id="${id}"` + headingAttrs;
      }

      const scrollClass = `scroll-mt-[${scrollMarginPx}px]`;
      const classRegex = /class=(['"])(.*?)\1/i;
      if (classRegex.test(headingAttrs)) {
        headingAttrs = headingAttrs.replace(
          classRegex,
          (_: string, quote: string, classVal: string) => {
            const cleanClasses = classVal
              .replace(/scroll-mt-\[\d+px\]/g, "")
              .trim();
            return `class=${quote}${scrollClass}${cleanClasses ? " " + cleanClasses : ""}${quote}`;
          }
        );
      } else {
        headingAttrs += ` class="${scrollClass}"`;
      }

      return `<${tag}${headingAttrs}>${innerHtml}</${tag}>`;
    }
  );

  return { html: parsedHtml, headings };
}

/**
 * Unified Rich Text Formatter function for:
 * 1. News In-Article Content (`mode: "news"`)
 * 2. Job Descriptions (`mode: "job"`)
 * 3. Exam / Long Answer Previews (`mode: "exam"`)
 */
export function formatRichText(
  content?: string | null,
  options: FormatRichTextOptions = {}
): string {
  return formatRichTextWithHeadings(content, options).html;
}

/**
 * Formats rich text and optionally returns extracted headings (for TOC).
 */
export function formatRichTextWithHeadings(
  content?: string | null,
  options: FormatRichTextOptions = {}
): FormatRichTextResult {
  if (!content) {
    return { html: "", headings: [] };
  }

  const mode = options.mode || "general";
  const imageWidth = options.imageWidth || (mode === "news" ? 1920 : 1200);
  const imageQuality = options.imageQuality || (mode === "news" ? 95 : 85);

  // 1. Whitespace & character normalization (collapse multi-spaces and NBSP)
  let cleaned = content
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/[^\S\r\n]{2,}/g, " ");

  // 2. Markdown or HTML check & conversion
  const isHtml = /<(p|h[1-6]|ul|ol|li|blockquote|div|table|pre|hr|span|b|strong|i|em|a|img)\b/i.test(cleaned);
  if (!isHtml) {
    cleaned = convertMarkdownToHtml(cleaned);
  } else {
    cleaned = cleanRedundantNestedLists(cleaned);
  }

  // 3. Remove empty paragraphs and spacers
  cleaned = cleaned
    .replace(/<p>\s*(<br\s*\/?>|&nbsp;|\u00a0|\s)*<\/p>/gi, "")
    .replace(/<p>\s*<\/p>/gi, "");

  // 4. Strip justify formatting from headings (headings must never stretch with word-gaps)
  cleaned = cleaned.replace(/<(h[1-6])([^>]*)>/gi, (match, tag, attrs) => {
    const cleanAttrs = attrs
      .replace(/ql-align-justify/g, "")
      .replace(/text-align:\s*justify;?/gi, "");
    return `<${tag}${cleanAttrs}>`;
  });

  // 5. Job-specific enhancements (mode: "job")
  if (mode === "job") {
    // Format heading tags (h1-h6) containing emojis cleanly without converting headings to pills
    const headingEmojiRegex = /<(h[1-6])([^>]*)>\s*([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\u{1F300}-\u{1FAFF}])\s*([\s\S]*?)<\/\1>/giu;
    cleaned = cleaned.replace(headingEmojiRegex, (match, tag, attrs, emoji, text) => {
      return `<${tag}${attrs}><span class="heading-emoji">${emoji}</span> ${text.trim()}</${tag}>`;
    });

    // Convert short standalone benefit paragraphs (< 60 chars) starting with emoji into Figma benefit pills
    const benefitPillRegex = /<p>\s*([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\u{1F300}-\u{1FAFF}])\s*([\s\S]{1,60}?)<\/p>/giu;
    cleaned = cleaned.replace(benefitPillRegex, (match, emoji, text) => {
      const cleanText = text.trim();
      if (cleanText.includes("<h") || cleanText.length > 60) return match;
      return `<span class="job-benefit-pill"><span class="job-benefit-emoji">${emoji}</span><span class="job-benefit-text">${cleanText}</span></span>`;
    });
  }

  // 6. External Link Safety: open external links in a new tab
  cleaned = cleaned.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1([^>]*)>/gi, (match, quote, href, rest) => {
    if (!href) return match;
    const isExternal = /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href) || href.startsWith("//");
    if (isExternal && !/target=/i.test(match)) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${rest}>`;
    }
    return match;
  });

  // 7. Image resolution & proxying
  cleaned = cleaned.replace(/<img\s+(?:[^>]*?\s+)?src=(["'])(.*?)\1([^>]*)>/gi, (match, quote, src, rest) => {
    if (!src) return match;
    const resolvedSrc = resolveImageUrl(src, imageWidth, imageQuality);
    return `<img src="${resolvedSrc}"${rest}>`;
  });

  // 8. News mode / heading injection & extraction
  let headings: HeadingItem[] = [];
  if (mode === "news" || options.extractHeadings || options.injectHeadingAnchors) {
    const headingResult = injectHeadings(cleaned, options.headingScrollMargin ?? 120);
    cleaned = headingResult.html;
    headings = headingResult.headings;
  }

  return { html: cleaned, headings };
}
