"use client";

const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;
const COUNT_PARAM = "count";
const ALL_CATEGORY = "All News";

import { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  type NewsArticle,
} from "@/data/news-data";
import NewsCard from "@/components/NewsCard";
import LoadmoreButton from "@/components/LoadmoreButton";
import { mapApiArticleToNewsArticle } from "@/lib/news-mapper";
import { ApiNewsPageData } from "@/lib/api/types";
import { newsApi } from "@/lib/api";

interface NewsPageProps {
  apiData?: ApiNewsPageData | null;
}

export default function NewsPage({ apiData }: NewsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [isPending, startTransition] = useTransition();

  const categoriesList = useMemo(() => {
    if (!apiData?.categories) return [ALL_CATEGORY];
    return [ALL_CATEGORY, ...apiData.categories.map((c) => c.name)];
  }, [apiData]);

  const getInitialCount = useCallback(() => {
    const raw = Number(searchParams.get(COUNT_PARAM));
    if (!Number.isFinite(raw) || raw <= INITIAL_VISIBLE) return INITIAL_VISIBLE;
    return raw;
  }, [searchParams]);

  const [visibleCount, setVisibleCount] = useState(getInitialCount);

  const [loadedArticles, setLoadedArticles] = useState<NewsArticle[]>(() => {
    if (apiData?.articles && apiData.articles.length > 0) {
      return apiData.articles.map(mapApiArticleToNewsArticle);
    }
    return [];
  });

  // Handle client-side mount loading when URL specifies a higher count
  useEffect(() => {
    const initialCount = getInitialCount();
    if (initialCount > INITIAL_VISIBLE) {
      setIsSimulatingLoad(true);
      newsApi
        .getArticles({
          category: activeCategory === ALL_CATEGORY ? undefined : activeCategory,
          limit: initialCount,
        })
        .then((apiArticles) => {
          if (apiArticles && apiArticles.length > 0) {
            setLoadedArticles(apiArticles.map(mapApiArticleToNewsArticle));
          }
        })
        .catch((err) => {
          console.error("Failed to fetch initial articles:", err);
        })
        .finally(() => {
          setIsSimulatingLoad(false);
        });
    }
  }, []);

  const displayedArticles = useMemo<NewsArticle[]>(
    () => loadedArticles.slice(0, visibleCount),
    [loadedArticles, visibleCount]
  );

  const hasMore = useMemo(() => {
    return loadedArticles.length >= visibleCount;
  }, [loadedArticles, visibleCount]);

  const isLoading = isPending || isSimulatingLoad;

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setActiveCategory(category);
      const fetchLimit = INITIAL_VISIBLE;
      setIsSimulatingLoad(true);

      newsApi
        .getArticles({
          category: category === ALL_CATEGORY ? undefined : category,
          limit: fetchLimit,
        })
        .then((apiArticles) => {
          if (apiArticles && apiArticles.length > 0) {
            setLoadedArticles(apiArticles.map(mapApiArticleToNewsArticle));
          } else {
            setLoadedArticles([]);
          }
          setVisibleCount(fetchLimit);
        })
        .catch((err) => {
          console.error("Failed to fetch articles by category:", err);
          setLoadedArticles([]);
          setVisibleCount(fetchLimit);
        })
        .finally(() => {
          setIsSimulatingLoad(false);
        });

      const params = new URLSearchParams(searchParams.toString());
      params.delete(COUNT_PARAM);
      router.replace(
        params.size > 0 ? `${pathname}?${params.toString()}` : pathname,
        { scroll: false }
      );
    });
  };

  const handleLoadMore = () => {
    setIsSimulatingLoad(true);
    const nextLimit = visibleCount + LOAD_MORE_STEP;

    newsApi
      .getArticles({
        category: activeCategory === ALL_CATEGORY ? undefined : activeCategory,
        limit: nextLimit,
      })
      .then((apiArticles) => {
        if (apiArticles && apiArticles.length > 0) {
          setLoadedArticles(apiArticles.map(mapApiArticleToNewsArticle));
        }
        setVisibleCount(nextLimit);
      })
      .catch((err) => {
        console.error("Failed to load more articles:", err);
        setVisibleCount(nextLimit);
      })
      .finally(() => {
        setIsSimulatingLoad(false);
      });

    const params = new URLSearchParams(searchParams.toString());
    params.set(COUNT_PARAM, String(nextLimit));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
              data-lenis-prevent
            >
              {categoriesList.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(category)}
                    className={`h-[41px] shrink-0 cursor-pointer rounded-[10px] px-6 text-[14px] leading-[21px] font-medium transition-all duration-200 md:h-[46px] md:text-[16px] md:leading-[24px] ${
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

          <div className="mt-12 mb-[48px] min-h-[400px] md:mt-16">
            {isLoading && displayedArticles.length === 0 ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px]">
                {[1, 2, 3].map((idx) => (
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
                      <div className="my-6 w-full border-t border-[#CED2DA]/50" />
                      <div className="h-5 w-[100px] animate-pulse rounded bg-[#E4E7EC]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedArticles.length > 0 ? (
              <div
                className={`grid grid-cols-1 gap-[20px] transition-opacity duration-300 md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px] ${
                  isLoading ? "opacity-50" : "opacity-100"
                }`}
              >
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

          {hasMore && (
            <LoadmoreButton
              handleLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </div>
  );
}
