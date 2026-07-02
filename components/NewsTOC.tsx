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
    <div className="flex w-full md:max-w-[400px] lg:max-w-[292px] md:mx-auto lg:mx-0 flex-col gap-6 lg:gap-10 rounded-[16px] border border-brand-border/50 bg-white py-6 px-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* TOC header */}
      <div className="flex flex-col gap-4 lg:gap-5 px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/images/news/menu-02.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="font-heading text-base lg:text-lg font-medium leading-[18px] text-brand-dark">
            On this page
          </span>
        </div>
        <div className="h-px w-full bg-[#E4E7EC]" />
      </div>

      {/* TOC links */}
      {headings.length > 0 && (
        <div className="relative flex gap-6 py-1">
          {/* Vertical guide line (Track) */}
          <div className="absolute bottom-1 top-1 w-[2px] rounded-full bg-[#0B3124]/10" />

          <div className="flex min-w-0 break-words flex-1 flex-col gap-2 lg:gap-4 pl-6">
            {headings.map(({ id, text }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={`relative block break-words font-heading text-sm lg:text-base leading-[21px] lg:leading-6 transition-colors duration-200 hover:text-brand-active ${isActive
                    ? "font-medium text-[#0D1A14]"
                    : "text-[#0D1A14]/70"
                    }`}
                >
                  {/* Active indicator pill, positioned exactly over the vertical guide line track */}
                  {isActive && (
                    <span className="absolute -left-[23px] top-[2px] bottom-[2px] w-[2px] rounded-[2px] bg-brand-accent" />
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
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-brand-border bg-brand-neutral-light">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-base font-medium leading-6 text-[#0D1A14]">
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