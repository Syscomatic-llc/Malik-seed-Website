import Link from "next/link";
import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { newsArticles, type NewsArticle } from "@/data/news-data";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import ShareButton from "@/components/ShareButton";
import ShareBar from "@/components/ShareBar";
import NewsTOC from "@/components/NewsTOC";
import NewsCard from "@/components/NewsCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { newsApi } from "@/lib/api";
import { mapApiArticleToNewsArticle } from "@/lib/news-mapper";

// ---------------------------------------------------------------------------
// Route-level constants — single source of truth for every hardcoded value.
// Changing a colour or dimension here propagates to all usages automatically.
// ---------------------------------------------------------------------------
const SITE_NAME = "Malik Seeds";
const RELATED_ARTICLE_COUNT = 3;

/** Fallback author shown when an article has no explicit author field. */
const DEFAULT_AUTHOR: NonNullable<NewsArticle["author"]> = {
  name: "Md. Rafiqul Islam",
  role: "Supply Chain Manager",
  avatar: "/images/news/rafiqul-islam.png",
};

// ---------------------------------------------------------------------------
// Static asset paths — avoids duplicated string literals in JSX
// ---------------------------------------------------------------------------
const ASSETS = {
  backArrow: "/images/news/arrow-right_up.svg",
  shareIcons: "/images/news/share-icons.svg",
  prevArrow: "/images/news/prev-arrow.svg",
  nextArrow: "/images/news/next-arrow.svg",
} as const;

// ---------------------------------------------------------------------------
// Heading regex — compiled once at module load, not on every render/request
// ---------------------------------------------------------------------------
const HEADING_REGEX = /<(h2|h3)(\s+[^>]*?)?>([\s\S]*?)<\/\1>/gi;
const TAG_REGEX = /<[^>]*>/g;
const SLUG_STRIP_REGEX = /[^a-z0-9]+/g;
const SLUG_TRIM_REGEX = /(^-|-$)/g;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the article matching `slug`, or `undefined`. */
function findArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

/**
 * Parses all `<h3>` nodes from `html`, injects unique IDs for scroll-anchoring,
 * and returns a heading manifest consumed by `NewsTOC`.
 *
 * The heading regex is a module-level constant so it is never re-compiled.
 */
function parseHeadings(html: string): {
  headings: { text: string; id: string; level: number }[];
  parsedHtml: string;
} {
  const headings: { text: string; id: string; level: number }[] = [];
  let counter = 0;

  // Reset lastIndex because we reuse the module-level regex with the `g` flag
  HEADING_REGEX.lastIndex = 0;

  const parsedHtml = html.replace(HEADING_REGEX, (match, tag, attrs, innerHtml: string) => {
    const cleanText = innerHtml
      .replace(/&nbsp;/g, " ")
      .replace(/\u00a0/g, " ")
      .replace(TAG_REGEX, "")
      .trim();
    const id = `heading-${cleanText
      .toLowerCase()
      .replace(SLUG_STRIP_REGEX, "-")
      .replace(SLUG_TRIM_REGEX, "")}-${counter++}`;
    const level = tag.toLowerCase() === "h2" ? 2 : 3;
    headings.push({ text: cleanText, id, level });

    // Handle attributes (like class="ql-align-justify") gracefully
    const attributes = attrs || "";
    let headingAttrs = attributes;
    const classRegex = /class=(['"])(.*?)\1/i;
    if (classRegex.test(headingAttrs)) {
      headingAttrs = headingAttrs.replace(classRegex, (_: string, quote: string, classVal: string) => {
        return `class=${quote}scroll-mt-[120px] ${classVal}${quote}`;
      });
    } else {
      headingAttrs += ' class="scroll-mt-[120px]"';
    }

    return `<${tag} id="${id}"${headingAttrs}>${innerHtml}</${tag}>`;
  });

  return { headings, parsedHtml };
}

// ---------------------------------------------------------------------------
// Route exports
// ---------------------------------------------------------------------------

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Statically generates params for every article at build time. */
export async function generateStaticParams() {
  try {
    const apiData = await newsApi.getNews();
    if (apiData && apiData.articles) {
      return apiData.articles.map((article) => ({
        slug: article.slug || article.article_slug || `article-${article.id}`,
      }));
    }
  } catch (err) {
    console.error("Failed to generate static params from API:", err);
  }
  return newsArticles.map((article) => ({ slug: article.slug }));
}

/** Dynamic per-article SEO metadata. */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  let article = null;
  try {
    const apiData = await newsApi.getNews({ revalidate: 60 });
    if (apiData && apiData.articles) {
      const found = apiData.articles.find(
        (a) => (a.slug || a.article_slug || `article-${a.id}`) === slug
      );
      if (found) {
        article = {
          title: found.title,
          description: found.excerpt,
        };
      }
    }
  } catch (err) {
    console.error("Failed to fetch article metadata from API:", err);
  }

  if (!article) {
    const staticArticle = findArticle(slug);
    if (!staticArticle) {
      return { title: `Article Not Found - ${SITE_NAME}` };
    }
    article = {
      title: staticArticle.title,
      description: staticArticle.description,
    };
  }

  return {
    title: `${article.title} - ${SITE_NAME}`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: NewsArticle | null = null;
  let allArticles: NewsArticle[] = [];

  try {
    const apiData = await newsApi.getNews({ revalidate: 60 });
    if (apiData && apiData.articles) {
      allArticles = apiData.articles.map(mapApiArticleToNewsArticle);
      article = allArticles.find((a) => a.slug === slug) || null;
    }
  } catch (err) {
    console.error("Failed to fetch article details from API:", err);
  }

  if (!article) {
    const staticArticle = findArticle(slug);
    if (!staticArticle) notFound();
    article = staticArticle;
    allArticles = newsArticles;
  }

  const { headings, parsedHtml } = parseHeadings(article.contentHtml);
  const author = article.author ?? DEFAULT_AUTHOR;

  // Circular prev/next navigation
  const currentIndex = allArticles.findIndex((a) => a.slug === article!.slug);
  const lastIndex = allArticles.length - 1;
  const prevArticle = allArticles[currentIndex - 1] ?? allArticles[lastIndex];
  const nextArticle = allArticles[currentIndex + 1] ?? allArticles[0];

  // Related articles: exclude current, cap at constant
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article!.slug)
    .slice(0, RELATED_ARTICLE_COUNT);
  return (
    <div className="bg-brand-bg min-h-screen">
      {/* ── Article wrapper ─────────────────────────────────────────── */}
      <article className="w-full px-4 pt-[100px] pb-10 md:px-12 md:pt-[130px] md:pb-20 lg:px-16 lg:pt-[180px] lg:pb-[100px] xl:px-[100px]">
        <div className="mx-auto max-w-[1030px]">
          {/* ── Header: back link + meta + share ──────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Back button */}
            <Link
              href="/news"
              className="font-heading group inline-flex items-center gap-2 text-base leading-6 font-medium text-[#0B3124] focus-visible:outline-none"
            >
              <Image
                src={ASSETS.backArrow}
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>Back to News</span>
            </Link>

            {/* Meta block */}
            <div className="flex flex-col gap-6">
              {/* Category pill + date */}
              <div className="flex items-center gap-4">
                <div className="border-brand-border-light font-heading text-brand-active inline-flex h-12 items-center justify-center rounded-[10px] border bg-white px-6 text-base leading-6 font-medium">
                  {article.category}
                </div>
                <span
                  className="bg-brand-dark h-1 w-1 rounded-full"
                  aria-hidden="true"
                />
                <span className="font-heading text-brand-dark text-base leading-6 font-medium">
                  {article.date}
                </span>
              </div>

              {/* Article title */}
              <h1 className="font-heading text-[28px] leading-[34px] font-medium text-[#141C24] md:text-[48px] md:leading-[58px]">
                {article.title}
              </h1>

              {/* Share bar */}
              <div className="flex items-center gap-4">
                <ShareButton />
                <ShareBar title={article.title} />
              </div>
            </div>
          </div>

          {/* ── Hero image ──────────────────────────────────────────── */}
          <div className="border-brand-border/30 relative mt-8 h-[230px] w-full overflow-hidden rounded-[20px] border bg-white md:mt-12 md:h-[598px] md:rounded-[32px]">
            <OptimizedImage
              src={article.detailImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1030px"
              className="object-cover"
            />
          </div>

          {/* ── Two-column body: content + sidebar ──────────────────── */}
          <div className="mt-12 flex flex-col lg:flex-row lg:justify-between lg:gap-10 xl:gap-[130px]">
            {/* Left: article body — order-2 on mobile, order-1 on desktop */}
            <div className="order-2 w-full lg:order-1 lg:max-w-[608px] lg:flex-1">
              {/*
               * article-prose is a @utility defined in globals.css that captures
               * all prose element overrides. Keeping them in CSS prevents this
               * component from needing to know about prose internals.
               */}
              <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: parsedHtml }}
              />
            </div>

            {/* Right: sticky TOC + author — order-1 on mobile, order-2 on desktop */}
            <div className="order-1 mb-8 w-full shrink-0 lg:sticky lg:top-[120px] lg:order-2 lg:mb-0 lg:h-fit lg:w-[292px] lg:self-start">
              <NewsTOC headings={headings} author={author} />
            </div>
          </div>

          {/* ── Divider ─────────────────────────────────────────────── */}
          <div className="bg-brand-partners-border my-12 h-px w-full" />

          {/* ── Prev / Next navigation ───────────────────────────────── */}
          <div className="flex w-full items-center justify-between gap-4 py-6">
            {/* Previous */}
            <Link
              href={`/news/${prevArticle.slug}`}
              className="group flex items-center gap-3 text-right focus-visible:outline-none"
            >
              <NavArrow direction="prev" label="Previous article" />
              <div className="flex flex-col text-right">
                <span className="font-heading text-brand-dark text-base leading-6 font-medium">
                  Previous
                </span>
                <span className="font-heading text-brand-dark/70 group-hover:text-brand-active hidden text-sm transition-colors md:line-clamp-2 md:max-w-[240px]">
                  {prevArticle.title}
                </span>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/news/${nextArticle.slug}`}
              className="group flex items-center justify-end gap-3 text-right focus-visible:outline-none"
            >
              <div className="flex flex-col text-left">
                <span className="font-heading text-brand-dark text-base leading-6 font-medium">
                  Next
                </span>
                <span className="font-heading text-brand-dark/70 group-hover:text-brand-active hidden text-sm transition-colors md:line-clamp-2 md:max-w-[240px]">
                  {nextArticle.title}
                </span>
              </div>
              <NavArrow direction="next" label="Next article" />
            </Link>
          </div>
        </div>
      </article>

      {/* ── Related articles ─────────────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="bg-brand-bg w-full py-10 md:py-[100px]">
          <div className="mx-auto max-w-[1240px] px-4">
            <div className="mb-12 flex flex-col items-center gap-4">
              <SectionBadge variant="outline" showDot>
                FROM OUR NEWSROOM
              </SectionBadge>
              <h2 className="font-heading text-brand-dark text-center text-[32px] leading-[38px] font-medium md:text-[48px] md:leading-[58px]">
                Related News &amp; Updates
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((art) => (
                <NewsCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Careers CTA ─────────────────────────────────────────────── */}
      <JoinTeamSection />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Circular arrow button used in prev/next navigation. */
function NavArrow({
  direction,
  label,
}: {
  direction: "prev" | "next";
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className="bg-brand-active hover:bg-brand-primary-hover flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-300 active:scale-95 md:h-10 md:w-10"
    >
      <Image
        src="/arrow.svg"
        alt=""
        width={16}
        height={16}
        className={`md:h-5 md:w-5 ${direction === "prev" ? "rotate-180" : ""}`}
      />
    </div>
  );
}
