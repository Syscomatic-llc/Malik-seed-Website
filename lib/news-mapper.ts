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

// Simple converter to parse Markdown (or plain text with newlines) to HTML if it isn't already HTML.
export function convertContentToHtml(content: string): string {
  if (!content) return "";

  // If the content already contains common HTML block tags, return it as-is.
  if (/<(p|h3|ul|li|blockquote|div|span|strong|em|br)\b/i.test(content)) {
    return content;
  }

  // Convert headings (e.g. ### Heading or ## Heading to h3)
  let html = content
    .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#\s+(.+)$/gm, "<h3>$1</h3>");

  // Convert bold: **text** to <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert blockquotes: > text to <blockquote>text</blockquote>
  html = html.replace(/(?:^>\s+.*\n?)+/gm, (match) => {
    const cleanLines = match
      .split("\n")
      .map((line) => line.replace(/^>\s*/, "").trim())
      .filter(Boolean);

    // Check if the last line is a citation (starts with -)
    const citationIndex = cleanLines.findIndex((line) => line.startsWith("-"));
    if (citationIndex !== -1) {
      const quote = cleanLines.slice(0, citationIndex).join("<br />");
      const cite = cleanLines.slice(citationIndex).join(" ");
      return `<blockquote>\n  ${quote}\n  <cite>${cite}</cite>\n</blockquote>`;
    }

    return `<blockquote>\n  ${cleanLines.join("<br />")}\n</blockquote>`;
  });

  // Convert lists: lines starting with * or -
  html = html.replace(/(?:^[*-]\s+.*\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((item) => `  <li>${item.replace(/^[*-]\s+/, "").trim()}</li>`)
      .join("\n");
    return `<ul>\n${items}\n</ul>`;
  });

  // Group text into paragraphs by double newlines
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs
    .map((pStr) => {
      const trimmed = pStr.trim();
      if (!trimmed) return "";

      // If it already starts with a block tag, do not wrap in a paragraph
      if (/^<(h3|ul|blockquote|ol)/i.test(trimmed)) {
        return trimmed;
      }

      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n\n");

  return html;
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
    title: a.title,
    description: cleanedExcerpt,
    category: a.category || "General",
    date: formatDate(a.published_at || a.created_at),
    image: imageUrl,
    detailImage: imageUrl,
    contentHtml: convertContentToHtml(cleanedContent),
    author: {
      name: a.author_name || "Research Team",
      role: a.author_title || "Staff Writer",
      avatar: resolveImageUrl(a.author_avatar) || "/images/news/rafiqul-islam.png",
    },
  };
}
