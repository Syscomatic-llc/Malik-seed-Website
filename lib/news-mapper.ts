import { ApiNewsArticle } from "./api";
import { NewsArticle } from "@/data/news-data";
import { resolveImageUrl } from "./utils";

import { formatRichText } from "./rich-text-formatter";

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

/**
 * Converts Markdown-like plain text (or already-HTML) to clean HTML using unified formatRichText.
 */
export function convertContentToHtml(content: string): string {
  return formatRichText(content, { mode: "news" });
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

  // Resolve image URL (checking featured_image first, then falling back to image_url) in HD
  const imageUrl = resolveImageUrl(a.featured_image || a.image_url, 1920, 95);

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
      avatar: resolveImageUrl(a.author_avatar, 400, 95) || "",
    },
  };
}
