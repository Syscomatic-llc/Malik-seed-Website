import { SectionBadge } from "@/components/ui/SectionBadge";

export default function ArticleDetailsLoading() {
  return (
    <div className="bg-brand-bg min-h-screen">
      {/* ── Article Wrapper Skeleton ─────────────────────────────────── */}
      <article className="w-full px-4 pt-[100px] pb-10 md:px-12 md:pt-[130px] md:pb-20 lg:px-16 lg:pt-[180px] lg:pb-[100px] xl:px-[100px]">
        <div className="mx-auto max-w-[1030px]">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-8">
            {/* Back Button Skeleton */}
            <div className="h-6 w-[120px] animate-pulse rounded bg-[#E4E7EC]" />

            {/* Meta Block Skeleton */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-[110px] animate-pulse rounded-[10px] bg-[#E4E7EC]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4E7EC]" />
                <div className="h-5 w-[100px] animate-pulse rounded bg-[#E4E7EC]" />
              </div>

              {/* Title lines */}
              <div className="flex flex-col gap-3">
                <div className="h-[34px] w-full animate-pulse rounded bg-[#E4E7EC] md:h-[58px]" />
                <div className="h-[34px] w-4/5 animate-pulse rounded bg-[#E4E7EC] md:h-[58px]" />
              </div>

              {/* Share bar skeleton */}
              <div className="flex items-center gap-4">
                <div className="h-[41px] w-[90px] animate-pulse rounded-full bg-[#E4E7EC]" />
                <div className="h-[41px] w-[180px] animate-pulse rounded-full bg-[#E4E7EC]/70" />
              </div>
            </div>
          </div>

          {/* Hero Image Skeleton */}
          <div className="relative mt-8 h-[230px] w-full animate-pulse overflow-hidden rounded-[20px] bg-[#E4E7EC] md:mt-12 md:h-[598px] md:rounded-[32px]" />

          {/* Two-Column Body Skeleton */}
          <div className="mt-12 flex flex-col lg:flex-row lg:justify-between lg:gap-10 xl:gap-[130px]">
            {/* Left: Article Body Prose Skeletons */}
            <div className="order-2 w-full space-y-6 lg:order-1 lg:max-w-[608px] lg:flex-1">
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-[#F2F4F7]" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-[#F2F4F7]" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-6 w-1/3 animate-pulse rounded bg-[#E4E7EC]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#F2F4F7]" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F2F4F7]" />
              </div>
            </div>

            {/* Right: Sticky TOC + Author Skeletons */}
            <div className="order-1 mb-8 w-full shrink-0 space-y-6 lg:order-2 lg:mb-0 lg:w-[292px] lg:self-start">
              {/* Table of contents skeleton */}
              <div className="rounded-[24px] border border-[#E4E7EC]/50 bg-white p-6 space-y-4">
                <div className="h-5 w-1/2 animate-pulse rounded bg-[#E4E7EC]" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-[#F2F4F7]" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-[#F2F4F7]" />
                </div>
                <div className="my-4 border-t border-[#CED2DA]/50" />
                {/* Author skeleton */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-[#E4E7EC]" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#E4E7EC]" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-[#F2F4F7]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── Related Articles Section Skeleton ───────────────────────── */}
      <section className="bg-brand-bg w-full py-10 md:py-[100px]">
        <div className="mx-auto max-w-[1240px] px-4">
          <div className="mb-12 flex flex-col items-center gap-4">
            <SectionBadge variant="outline" showDot className="animate-pulse opacity-60">
              Loading Related News...
            </SectionBadge>
            <div className="h-[38px] w-[320px] animate-pulse rounded-lg bg-[#E4E7EC] md:h-[58px] md:w-[480px]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </div>
  );
}
