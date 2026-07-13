import { ApiNewsArticle } from "./api";
import { NewsArticle } from "@/data/news-data";
import { resolveImageUrl } from "./utils";

// Helper to format Date strings to "MMM DD, YYYY"
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ---------------------------------------------------------------------------
// convertContentToHtml
// ---------------------------------------------------------------------------
// Converts Markdown-like plain text (or already-HTML) to clean HTML.
// Handles:
//   Headings     : # H1  ## H2  ### H3  #### H4 — all map to h2/h3/h4
//   Bold         : **text** or __text__
//   Italic       : *text* or _text_
//   Bold+Italic  : ***text***
//   Underline    : __text__ (when used alone, Markdown style)
//   Strikethrough: ~~text~~
//   Inline code  : `code`
//   Links        : [label](url)
//   Images       : ![alt](url)
//   HR           : --- or *** or ___ on its own line
//   Blockquotes  : > text  (with optional - citation on last line)
//   Unordered    : * item  |  - item  |  • item  |  – item  |  ● item
//   Ordered      : 1. item  |  1) item
//   Alpha ordered: a. item  |  a) item  |  A. item
//   Roman        : i. ii. iii.  /  I. II. III.
//   Paragraphs   : separated by blank lines
//   Line breaks  : single newline inside a paragraph → <br />
// ---------------------------------------------------------------------------
export function convertContentToHtml(content: string): string {
  if (!content) return "";

  // ── Minimal tag-aware parser limited to ul/ol/li ──────────────────────────
  // Used to detect and unwrap a specific, common export artifact: a
  // <ul>/<ol> whose only child is a single <li> that itself contains
  // nothing but a nested <ul>/<ol>. Browsers still draw a bullet/number for
  // that empty wrapping <li>, producing a visible "double bullet" on the
  // first real item. This never touches legitimate nested lists (where the
  // parent <li> has real text alongside its sub-list).
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
          return liMeaningful[0]; // collapse the pointless outer <ul>/<ol><li> wrapper
        }
      }
    }
    return node;
  }

  function cleanRedundantNestedLists(html: string): string {
    if (!/<(ul|ol)\b/i.test(html)) return html; // fast path: nothing to check
    const tree = parseListTree(html);
    return serializeTree(unwrapRedundantNestedLists(tree));
  }

  // ── If content is already HTML, clean up known list artifacts and return ─
  if (/<(p|h[1-6]|ul|ol|li|blockquote|div|table|pre|hr)\b/i.test(content)) {
    return cleanRedundantNestedLists(content);
  }

  // Normalise line endings
  let text = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // ── Inline formatting helpers ─────────────────────────────────────────────
  function applyInline(str: string): string {
    return str
      // Images before links so ![…](…) doesn't get matched as [label](url)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Bold + italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.*?)__/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Strikethrough
      .replace(/~~(.*?)~~/g, "<s>$1</s>")
      // Inline code
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  // ── Heuristic heading detector ────────────────────────────────────────────
  // Fallback used ONLY when a line has no markdown "#" marker. A line is
  // treated as a heading if it's short, doesn't end in sentence punctuation,
  // isn't a parenthetical, and is "Title Case" (most content words
  // capitalized) — the signature of CMS section headers that lost their
  // <h2> tags when the source HTML was flattened to plain text.
  // NOTE: this is a heuristic, not a guarantee. It's tuned to avoid firing
  // on normal sentence-case prose, but content with unusual capitalization
  // conventions could still be mis-tagged. The most reliable fix remains
  // preserving real HTML instead of round-tripping through plain text.
  const MINOR_WORDS = new Set([
    "to", "of", "and", "the", "a", "an", "in", "on", "for",
    "with", "by", "at", "from", "or", "as",
  ]);
  function looksLikeHeading(line: string): boolean {
    if (/[.!?:,;]$/.test(line)) return false; // sentences / list-intros end in punctuation
    if (/^[(]/.test(line)) return false; // parenthetical sub-lines aren't headings
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
    return capWords / majorWords >= 0.8; // most content words capitalized
  }

  const lines = text.split("\n");
  const output: string[] = [];

  const HEADING_RE = /^(#{1,6})\s+(.+)$/;
  const BQ_RE = /^>\s*(.*)$/;
  const HR_RE = /^(\*{3,}|-{3,}|_{3,})$/;
  // Bare list marker with no content, e.g. "1." or "a)" on its own —
  // an artifact of nested lists whose parent <li> had no text of its own
  // (common when nested Quill/rich-text lists get flattened to plain text).
  const BARE_MARKER_RE = /^(\d+|[a-zA-Z]|[ivxlcdmIVXLCDM]+)[.)]$/;
  // A line that is entirely wrapped in parentheses, e.g. "(Malik's Farm)" —
  // typically a bold sub-heading/attribution line under a section title.
  const PAREN_LINE_RE = /^\(.+\)$/;

  // ── List item matchers ────────────────────────────────────────────────────
  const UL_ITEM_RE = /^(\s*)[*\-•–●]\s+(.+)$/;
  const OL_NUM_ITEM_RE = /^(\s*)\d+[.)]\s+(.+)$/;
  const OL_ALPHA_ITEM_RE = /^(\s*)[a-zA-Z][.)]\s+(.+)$/;
  const OL_ROMAN_ITEM_RE = /^(\s*)((?:x{1,3})?(?:ix|iv|v?i{1,3}|v))[.)]\s+(.+)$/i;

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

  // Classify a raw (untrimmed) line as a list item, disambiguating
  // alpha vs. roman markers using the currently open list type as a hint
  // (e.g. "i." continues a roman list if one is already open, else
  // defaults to alpha — this ambiguity is inherent to plain-text markers
  // and can't be fully resolved without more context).
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

  // Look ahead past blank lines to find the next non-blank line + its index.
  function peekNextNonBlank(idx: number): { line: string; index: number } | null {
    let j = idx;
    while (j < lines.length && lines[j].trim() === "") j++;
    return j < lines.length ? { line: lines[j], index: j } : null;
  }

  const TAG_FOR: Record<ListKind, "ul" | "ol"> = { ul: "ul", ol: "ol", alpha: "ol", roman: "ol" };
  const TYPE_ATTR_FOR: Record<ListKind, string> = { ul: "", ol: "", alpha: ' type="a"', roman: ' type="i"' };

  // Parses a run of list items starting at `start`, all at indent >= baseIndent,
  // including nested sub-lists (deeper indent) and blank lines between items
  // (as long as another item follows). Returns the built HTML plus the index
  // just past everything consumed, so the caller can resume from there.
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
          i = next.index; // skip blank line(s), list continues
          continue;
        }
        break; // blank line followed by non-list content ends the list
      }

      if (isOtherBlock(raw)) break;

      const item = classifyListItem(raw, currentType);
      if (!item) break;
      if (item.indent < baseIndent) break; // belongs to an ancestor list
      if (currentType === null) currentType = item.kind;
      if (item.indent === baseIndent && item.kind !== currentType) break; // sibling list, different type

      if (item.indent > baseIndent) {
        if (items.length === 0) break;
        const nested = parseList(i, item.indent);
        items[items.length - 1] += nested.html;
        i = nested.next;
        continue;
      }

      let itemText = applyInline(item.text);
      i++;

      // Absorb blank-line-tolerated nested sub-lists belonging to this item.
      // We deliberately do NOT auto-merge trailing unmarked lines into the
      // item's text (see note below) — only genuinely nested list items.
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
          break; // sibling item — handled by outer loop
        }

        // Bare marker artifact mid-list (e.g. stray "1.") — skip it.
        if (BARE_MARKER_RE.test(trimmedNext)) {
          i++;
          continue;
        }

        // Any other plain line ends this list item (and the list, if it's
        // not another item at this level). We do NOT try to auto-merge
        // unmarked lines into the previous item's text: real content
        // commonly has a paragraph directly follow a list with no blank
        // line, and there is no reliable local signal to distinguish that
        // from a genuinely wrapped list-item line. Treating it as a new
        // paragraph (the safer default) avoids swallowing unrelated text
        // into a list item.
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

  // ── Blockquote collection ──────────────────────────────────────────────
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

  // ── Paragraph buffer (lines between blank lines) ─────────────────────────
  let paraBuffer: string[] = [];
  function flushPara() {
    if (!paraBuffer.length) return;
    const joined = paraBuffer.join("<br />");
    output.push(`<p>${applyInline(joined)}</p>`);
    paraBuffer = [];
  }

  // ── Main block-level loop ────────────────────────────────────────────────
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    // ── Blank line → flush everything pending ────────────────────────────
    if (!trimmed) {
      flushBlockquote();
      flushPara();
      continue;
    }

    // ── Horizontal rule ───────────────────────────────────────────────────
    if (HR_RE.test(trimmed)) {
      flushBlockquote();
      flushPara();
      output.push("<hr />");
      continue;
    }

    // ── Heading (explicit markdown "#") ───────────────────────────────────
    const hMatch = trimmed.match(HEADING_RE);
    if (hMatch) {
      flushBlockquote();
      flushPara();
      const level = Math.min(hMatch[1].length, 4); // cap at h4
      const tag = level <= 2 ? "h2" : level === 3 ? "h3" : "h4";
      output.push(`<${tag}>${applyInline(hMatch[2])}</${tag}>`);
      continue;
    }

    // ── Blockquote ────────────────────────────────────────────────────────
    const bqMatch = trimmed.match(BQ_RE);
    if (bqMatch) {
      flushPara();
      bqBuffer.push(bqMatch[1]);
      continue;
    } else if (bqBuffer.length) {
      flushBlockquote();
    }

    // ── List (ul / ol / alpha / roman, with nesting + blank-line tolerance) ─
    const listItem = classifyListItem(raw, null);
    if (listItem) {
      flushPara();
      const result = parseList(i, listItem.indent);
      output.push(result.html.trimEnd());
      i = result.next - 1; // -1 because the for-loop will increment
      continue;
    }

    // ── Bare marker artifact ("1." with nothing after it) → drop silently ──
    if (BARE_MARKER_RE.test(trimmed)) {
      continue;
    }

    // ── Standalone parenthetical line → bold sub-line, own paragraph ──────
    if (PAREN_LINE_RE.test(trimmed)) {
      flushPara();
      output.push(`<p><strong>${applyInline(trimmed)}</strong></p>`);
      continue;
    }

    // ── Heuristic heading (no "#" marker, but looks like a section title) ─
    if (looksLikeHeading(trimmed)) {
      flushPara();
      output.push(`<h2>${applyInline(trimmed)}</h2>`);
      continue;
    }

    // ── Plain text → paragraph buffer ────────────────────────────────────
    paraBuffer.push(trimmed);
  }

  // Flush any remaining buffers
  flushBlockquote();
  flushPara();

  return output.join("\n");
}

export function mapApiArticleToNewsArticle(a: ApiNewsArticle): NewsArticle {
  // Pre-clean content and excerpt of non-breaking spaces
  const rawContent = a.content || "";
  const cleanedContent = rawContent
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ");

  const rawExcerpt = a.excerpt || "";
  const cleanedExcerpt = rawExcerpt
    .replace(/&nbsp;/g, " ")
    .replace(/\u00a0/g, " ");

  // Resolve image URL (checking featured_image first, then falling back to image_url)
  const imageUrl = resolveImageUrl(a.featured_image || a.image_url);

  return {
    id: a.id,
    slug: a.slug || a.article_slug || `article-${a.id}`,
    title: a.title,
    description: cleanedExcerpt,
    category: a.category || "General",
    date: formatDate(a.updated_at || a.created_at),
    image: imageUrl,
    detailImage: imageUrl,
    contentHtml: convertContentToHtml(cleanedContent),
    author: {
      name: a.author_name || "Research Team",
      role: a.author_title || "Staff Writer",
      avatar: resolveImageUrl(a.author_avatar) || "",
    },
  };
}
