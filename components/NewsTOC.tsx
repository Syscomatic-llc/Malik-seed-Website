"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types — exported so the page can reuse them without duplicating declarations
// ---------------------------------------------------------------------------
export interface HeadingItem {
  text: string;
  id: string;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface NewsTOCProps {
  headings: HeadingItem[];
  author: Author;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Offset matches the scroll-mt-[120px] injected on each heading by parseHeadings. */
const SCROLL_OFFSET_PX = 120;

/**
 * IntersectionObserver options are stable across renders — defined at module
 * level to avoid a new object allocation per effect invocation.
 */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  // Trigger when a heading enters the top 120 px band and leaves the bottom 70 %
  rootMargin: `-${SCROLL_OFFSET_PX}px 0px -70% 0px`,
  threshold: 0.1,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsTOC({ headings, author }: NewsTOCProps) {
  const [activeId, setActiveId] = useState("");

  // ── Intersection observer ────────────────────────────────────────────────
  // We keep a ref to the observer so we can disconnect + re-create it when
  // headings change, rather than leaking multiple observers.
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length === 0) return;

      // Pick the topmost visible heading
      visible.sort(
        (a, b) =>
          a.target.getBoundingClientRect().top -
          b.target.getBoundingClientRect().top
      );
      setActiveId(visible[0].target.id);
    }, OBSERVER_OPTIONS);

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  // ── Click handler ────────────────────────────────────────────────────────
  // Memoised so child anchor elements never receive a fresh function reference
  // on re-renders triggered by activeId state changes.
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    },
    []
  );

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="border-brand-border/50 flex w-full flex-col gap-6 rounded-[16px] border bg-white px-0 py-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)] md:mx-auto md:max-w-[400px] lg:mx-0 lg:max-w-[292px] lg:gap-10">
      {/* TOC header */}
      <div className="flex flex-col gap-4 px-6 lg:gap-5">
        <div className="flex items-center gap-2">
          <Image
            src="/images/news/menu-02.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="font-heading text-brand-dark text-base leading-[18px] font-medium lg:text-lg">
            On this page
          </span>
        </div>
        <div className="h-px w-full bg-[#E4E7EC]" />
      </div>

      {/* TOC links */}
      {headings.length > 0 && (
        <div className="relative flex gap-6 py-1">
          {/* Vertical guide line (Track) */}
          <div className="absolute top-1 bottom-1 w-[2px] rounded-full bg-[#0B3124]/10" />

          <div className="flex min-w-0 flex-1 flex-col gap-2 pl-6 break-words lg:gap-4">
            {headings.map(({ id, text }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`font-heading hover:text-brand-active relative block text-sm leading-[21px] break-words transition-colors duration-200 lg:text-base lg:leading-6 ${
                    isActive
                      ? "font-medium text-[#0D1A14]"
                      : "text-[#0D1A14]/70"
                  }`}
                >
                  {/* Active indicator pill, positioned exactly over the vertical guide line track */}
                  {isActive && (
                    <span className="bg-brand-accent absolute top-[2px] bottom-[2px] -left-[23px] w-[2px] rounded-[2px]" />
                  )}
                  {text}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Author */}
      <div className="flex flex-col gap-4 px-6">
        <span className="font-heading text-sm leading-[21px] text-[#0D1A14]/70">
          Written by:
        </span>
        <div className="flex items-center gap-3">
          <div className="border-brand-border bg-brand-neutral-light relative h-12 w-12 shrink-0 overflow-hidden rounded-full border">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-base leading-6 font-medium text-[#0D1A14]">
              {author.name}
            </span>
            <span className="font-heading text-sm leading-[21px] text-[#0D1A14]/70">
              {author.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
