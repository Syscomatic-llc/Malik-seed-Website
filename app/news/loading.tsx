import { SectionBadge } from "@/components/ui/SectionBadge";

export default function NewsLoading() {
  return (
    <div className="bg-brand-bg min-h-screen">
      <section className="w-full px-4 pt-[100px] pb-10 md:px-[50px] md:pt-[180px] md:pb-[100px]">
        <div className="mx-auto">
          {/* Badge & Title Skeletons */}
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionBadge
              variant="outline"
              showDot
              className="h-[30px] md:h-[33px] animate-pulse opacity-60"
            >
              Loading News...
            </SectionBadge>

            <div className="h-[46px] w-[250px] animate-pulse rounded-lg bg-[#E4E7EC] md:h-[77px] md:w-[450px]" />
          </div>

          {/* Category Tabs Skeletons */}
          <div className="mt-10 md:mt-20">
            <div className="flex w-full gap-2 overflow-x-auto pb-4 md:flex-wrap md:overflow-visible md:pb-0">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="h-[41px] w-[100px] shrink-0 animate-pulse rounded-[10px] bg-[#E4E7EC]/80 md:h-[46px] md:w-[120px]"
                />
              ))}
            </div>
          </div>

          {/* News Card Grid Skeletons */}
          <div className="mt-12 mb-[48px] md:mt-16">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[24px] xl:grid-cols-3 xl:gap-x-[24px] xl:gap-y-[40px]">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="flex h-[480px] w-full flex-col rounded-[24px] border border-[#E4E7EC]/50 bg-white p-[16px] pb-[24px]"
                >
                  {/* Image skeleton */}
                  <div className="relative h-[260px] w-full animate-pulse overflow-hidden rounded-[16px] bg-[#F2F4F7]" />

                  {/* Content skeleton */}
                  <div className="flex flex-1 flex-col pt-6">
                    {/* Title lines */}
                    <div className="h-5 w-5/6 animate-pulse rounded bg-[#E4E7EC]" />
                    <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-[#E4E7EC]" />

                    {/* Description lines */}
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#F2F4F7]" />
                    <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-[#F2F4F7]" />
                    <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-[#F2F4F7]" />

                    <div className="my-6 w-full border-t border-[#CED2DA]/50" />

                    {/* Bottom link skeleton */}
                    <div className="h-5 w-[100px] animate-pulse rounded bg-[#E4E7EC]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
