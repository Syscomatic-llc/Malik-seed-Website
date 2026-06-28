"use client";

// ---------------------------------------------------------------------------
// Production-grade constants — single source of truth, never duplicate magic
// numbers across the file. Change here and it propagates everywhere.
// ---------------------------------------------------------------------------
const INITIAL_VISIBLE = 6; // cards shown on first load / after category reset
const LOAD_MORE_STEP = 6; // cards appended per "Load More" click
const COUNT_PARAM = "count"; // URL query param persisting "load more" progress
const ALL_CATEGORY = "All News"; // sentinel for the "show everything" tab
const LOAD_DELAY_MS = 600; // simulated async delay (keeps UX feel, matches gallery)

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
import { useState, useTransition, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { newsArticles } from "@/data/news-data";
import NewsCard from "@/components/NewsCard";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import LoadmoreButton from "@/components/LoadmoreButton";

// ---------------------------------------------------------------------------
// Static data — outside the component so the reference is stable and the
// array is never re-created on every render.
// ---------------------------------------------------------------------------
const CATEGORIES = [
  ALL_CATEGORY,
  "Research & Trials",
  "Farmer Stories",
  "Partnerships",
  "Innovation",
  "Community Programs",
] as const;

type Category = (typeof CATEGORIES)[number];

// ---------------------------------------------------------------------------
// NewsPage (Client Component)
// ---------------------------------------------------------------------------
export default function NewsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<Category>(ALL_CATEGORY);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [isPending, startTransition] = useTransition();

  // -------------------------------------------------------------------------
  // Read the initial visible count from the URL (?count=12).
  // This is what makes "Load more" progress survive a reload —
  // on remount we restore where the user left off rather than always starting
  // at INITIAL_VISIBLE. useCallback with stable searchParams dep so useState's
  // lazy-init function runs exactly once (not on every render).
  // -------------------------------------------------------------------------
  const getInitialCount = useCallback(() => {
    const raw = Number(searchParams.get(COUNT_PARAM));
    if (!Number.isFinite(raw) || raw <= INITIAL_VISIBLE) return INITIAL_VISIBLE;
    return raw; // upper-clamp happens per-category inside handleLoadMore
  }, [searchParams]);

  const [visibleCount, setVisibleCount] = useState(getInitialCount);

  // -------------------------------------------------------------------------
  // Derived values — no extra state, so they can never be out of sync.
  // -------------------------------------------------------------------------
  const filteredArticles = useMemo(
    () =>
      activeCategory === ALL_CATEGORY
        ? newsArticles
        : newsArticles.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  const displayedArticles = useMemo(
    () => filteredArticles.slice(0, visibleCount),
    [filteredArticles, visibleCount]
  );

  const hasMore = visibleCount < filteredArticles.length;
  const isLoading = isPending || isSimulatingLoad;

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  /**
   * Switch category: resets visible count to INITIAL_VISIBLE and removes the
   * ?count param so the URL is clean for the new category.
   * Wrapped in startTransition so the category highlight updates immediately
   * while the article list re-renders in the background (no blocking).
   */
  const handleCategoryChange = (category: Category) => {
    startTransition(() => {
      setActiveCategory(category);
      setVisibleCount(INITIAL_VISIBLE);

      const params = new URLSearchParams(searchParams.toString());
      params.delete(COUNT_PARAM);
      router.replace(
        params.size > 0 ? `${pathname}?${params.toString()}` : pathname,
        { scroll: false }
      );
    });
  };

  /**
   * Load more: appends the next batch, then syncs the new count into the URL
   * via router.replace (not push) so reloads restore the expanded state, but
   * the Back button is never polluted with load-more history entries.
   */
  const handleLoadMore = () => {
    setIsSimulatingLoad(true);
    setTimeout(() => {
      const next = Math.min(
        visibleCount + LOAD_MORE_STEP,
        filteredArticles.length
      );
      setVisibleCount(next);
      setIsSimulatingLoad(false);

      const params = new URLSearchParams(searchParams.toString());
      params.set(COUNT_PARAM, String(next));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, LOAD_DELAY_MS);
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="bg-brand-bg min-h-screen">

      {/* ── Hero / Header Section ── */}
      <section className="w-full px-4 pt-[100px] pb-10 md:px-[50px] md:pt-[180px] md:pb-[100px]">
        <div className="mx-auto  ">

          {/* Header Block */}
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionBadge variant="outline" showDot className="h-[30px] md:h-[33px]">
              News
            </SectionBadge>

            <h1
              className="text-[38px] font-medium leading-[46px] text-[#0D1A14] md:text-[64px] md:leading-[77px]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              News &amp; Updates
            </h1>
          </div>

          {/* ── Category Filter Tabs ── */}
          <div className="mt-10 md:mt-20">
            <div
              className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-4 md:flex-wrap md:overflow-visible md:pb-0"
              role="tablist"
              aria-label="News categories"
            >
              {CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(category)}
                    className={`h-[41px] shrink-0 cursor-pointer rounded-[10px] px-6 text-[14px] font-medium leading-[21px] transition-all duration-200 md:h-[46px] md:text-[16px] md:leading-[24px] ${
                      isSelected
                        ? "bg-[#0F3221] text-white"
                        : "border border-[#F2F4F7] bg-white text-[#195236] hover:bg-[#F9FAFB]"
                    }`}
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Article Grid ── */}
          <div className="mt-12 mb-[48px] md:mt-16 min-h-[400px]">
            {displayedArticles.length > 0 ? (
              <div
                className={`grid grid-cols-1 gap-[20px] transition-opacity duration-300 md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px] ${
                  isPending ? "opacity-50" : "opacity-100"
                }`}
              >
                {displayedArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] w-full items-center justify-center rounded-[24px] bg-white border border-[#E4E7EC]/50 p-8 text-center text-[#0D1A14]/60">
                <p className="text-[16px]">No articles found in this category.</p>
              </div>
            )}
          </div>

          {/* ── Load More Button ── hidden once all cards are visible */}
          {hasMore && (
            <LoadmoreButton handleLoadMore={handleLoadMore} isLoading={isLoading} />
          )}

        </div>
      </section>

      {/* ── Careers CTA ── */}
      <JoinTeamSection />
    </div>
  );
}
