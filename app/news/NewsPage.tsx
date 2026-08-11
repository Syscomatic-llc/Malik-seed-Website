"use client";

const ARTICLES_PER_PAGE = 6;
const PAGE_PARAM = "page";
const ALL_CATEGORY = "All News";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  type NewsArticle,
} from "@/data/news-data";
import NewsCard from "@/components/NewsCard";
import PaginationControls from "@/components/PaginationControls";
import { mapApiArticleToNewsArticle } from "@/lib/news-mapper";
import { ApiNewsPageData } from "@/lib/api/types";
import { newsApi } from "@/lib/api";

interface NewsPageProps {
  apiData?: ApiNewsPageData | null;
}

const CATEGORY_PARAM = "category";

export default function NewsPage({ apiData }: NewsPageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const cat = searchParams.get(CATEGORY_PARAM);
    return cat || ALL_CATEGORY;
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const raw = Number(searchParams.get(PAGE_PARAM));
    if (!Number.isFinite(raw) || raw < 1) return 1;
    return raw;
  });

  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [loadedArticles, setLoadedArticles] = useState<NewsArticle[]>([]);

  // Client-side cache to make revisiting categories/pages instantaneous
  const cacheRef = useRef<Map<string, { items: NewsArticle[]; total: number }>>(new Map());
  const isFirstRender = useRef(true);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get(CATEGORY_PARAM) || ALL_CATEGORY;
      const raw = Number(params.get(PAGE_PARAM));
      const pg = Number.isFinite(raw) && raw >= 1 ? raw : 1;
      setActiveCategory(cat);
      setCurrentPage(pg);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const categoriesList = useMemo(() => {
    if (!apiData?.categories) return [ALL_CATEGORY];
    const sorted = [...apiData.categories].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );
    return [ALL_CATEGORY, ...sorted.map((c) => c.name)];
  }, [apiData]);

  const allInitialArticles = useMemo(() => {
    if (!apiData?.articles) return [];
    return apiData.articles.map(mapApiArticleToNewsArticle);
  }, [apiData]);

  const categoryFilteredArticles = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return allInitialArticles;
    return allInitialArticles.filter(
      (a) => a.category?.toLowerCase().trim() === activeCategory.toLowerCase().trim()
    );
  }, [allInitialArticles, activeCategory]);

  // Fetch or retrieve from cache on activeCategory / currentPage change
  useEffect(() => {
    const cacheKey = `${activeCategory}:${currentPage}`;

    if (cacheRef.current.has(cacheKey)) {
      const cached = cacheRef.current.get(cacheKey)!;
      setLoadedArticles(cached.items);
      setTotalArticles(cached.total);
      setIsCategoryLoading(false);
      return;
    }

    if (
      isFirstRender.current &&
      currentPage === 1 &&
      activeCategory === ALL_CATEGORY &&
      apiData?.articles &&
      apiData.articles.length > 0
    ) {
      isFirstRender.current = false;
      const initialMapped = apiData.articles.map(mapApiArticleToNewsArticle);
      const total = initialMapped.length;
      const initialPageSlice = initialMapped.slice(0, ARTICLES_PER_PAGE);
      cacheRef.current.set(cacheKey, {
        items: initialPageSlice,
        total: total,
      });
      setLoadedArticles(initialPageSlice);
      setTotalArticles(total);
      setIsCategoryLoading(false);
      return;
    }

    isFirstRender.current = false;
    let isCancelled = false;
    setIsCategoryLoading(true);

    newsApi
      .getArticlesPaginated({
        category: activeCategory === ALL_CATEGORY ? undefined : activeCategory,
        limit: ARTICLES_PER_PAGE,
        page: currentPage,
      })
      .then((res) => {
        if (!isCancelled) {
          const mapped = res.items.map(mapApiArticleToNewsArticle);
          cacheRef.current.set(cacheKey, { items: mapped, total: res.total });
          setLoadedArticles(mapped);
          setTotalArticles(res.total);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("Failed to fetch page articles:", err);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsCategoryLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [currentPage, activeCategory, apiData]);

  // Total count for current category (uses API total if fetched, otherwise local category count)
  const effectiveTotalArticles = useMemo(() => {
    if (totalArticles > 0) return totalArticles;
    return categoryFilteredArticles.length;
  }, [totalArticles, categoryFilteredArticles]);

  const totalPages = Math.max(1, Math.ceil(effectiveTotalArticles / ARTICLES_PER_PAGE));

  // Articles displayed for current page (uses API loadedArticles if available, otherwise local slice)
  const displayedArticles = useMemo(() => {
    if (loadedArticles.length > 0) return loadedArticles;
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return categoryFilteredArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [loadedArticles, categoryFilteredArticles, currentPage]);

  const updateUrl = (category: string, page: number) => {
    const params = new URLSearchParams();
    if (category !== ALL_CATEGORY) {
      params.set(CATEGORY_PARAM, category);
    }
    if (page > 1) {
      params.set(PAGE_PARAM, String(page));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    window.history.pushState(null, "", newUrl);
  };

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory && !isCategoryLoading) return;

    const cacheKey = `${category}:1`;
    const isCached = cacheRef.current.has(cacheKey);

    setActiveCategory(category);
    setCurrentPage(1);
    if (!isCached) {
      setIsCategoryLoading(true);
    }
    updateUrl(category, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || isCategoryLoading || newPage < 1 || newPage > totalPages) return;

    const cacheKey = `${activeCategory}:${newPage}`;
    const isCached = cacheRef.current.has(cacheKey);

    setCurrentPage(newPage);
    if (!isCached) {
      setIsCategoryLoading(true);
    }
    updateUrl(activeCategory, newPage);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-brand-bg min-h-screen">
      <section className="w-full px-4 pt-[100px] pb-10 md:px-[50px] md:pt-[180px] md:pb-[100px]">
        <div className="mx-auto">
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionBadge
              variant="outline"
              showDot
              className="h-[30px] md:h-[33px]"
            >
              News
            </SectionBadge>

            <h1
              className="text-[38px] leading-[46px] font-medium text-[#0D1A14] md:text-[64px] md:leading-[77px]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              News &amp; Updates
            </h1>
          </div>

          <div className="mt-10 md:mt-20">
            <div
              className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-4 md:flex-wrap md:overflow-visible md:pb-0"
              role="tablist"
              aria-label="News categories"
            >
              {categoriesList.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(category)}
                    className={`relative h-[41px] shrink-0 cursor-pointer rounded-[10px] px-6 text-[14px] leading-[21px] font-medium transition-colors duration-200 md:h-[46px] md:text-[16px] md:leading-[24px] ${
                      isSelected
                        ? "text-white"
                        : "border border-[#F2F4F7] bg-white text-[#195236] hover:bg-[#F9FAFB]"
                    }`}
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeNewsCategory"
                        className="absolute inset-0 rounded-[10px] bg-[#0F3221]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={gridRef} className="mt-12 mb-[48px] min-h-[400px] md:mt-16 scroll-mt-[100px]">
            {isCategoryLoading ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px]">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div
                    key={idx}
                    className="flex h-[480px] w-full flex-col rounded-[24px] border border-[#E4E7EC]/50 bg-white p-[16px] pb-[24px]"
                  >
                    <div className="relative h-[260px] w-full animate-pulse overflow-hidden rounded-[16px] bg-[#F2F4F7]" />
                    <div className="flex flex-1 flex-col pt-6">
                      <div className="h-5 w-5/6 animate-pulse rounded bg-[#E4E7EC]" />
                      <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-[#E4E7EC]" />
                      <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                      <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-[#F2F4F7]" />
                      <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#F2F4F7]" />
                      <div className="my-6 w-full border-t border-[#CED2DA]/50" />
                      <div className="h-5 w-[100px] animate-pulse rounded bg-[#E4E7EC]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px]">
                {displayedArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] w-full items-center justify-center rounded-[24px] border border-[#E4E7EC]/50 bg-white p-8 text-center text-[#0D1A14]/60">
                <p className="text-[16px]">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>

          {effectiveTotalArticles > ARTICLES_PER_PAGE && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={ARTICLES_PER_PAGE}
              totalItems={effectiveTotalArticles}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </div>
  );
}
