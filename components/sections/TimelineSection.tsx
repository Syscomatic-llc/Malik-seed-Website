import { timelineItems, TimelineItem } from "@/data/sections-data";
import TimelineStory from "../TimelineStory";
import ActionButton from "../ActionButton";
import { ApiTimelineItem } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

export interface TimelineSectionProps {
  items?: TimelineItem[];
  apiData?: ApiTimelineItem[];
}

/** Glow images used for the timeline card backgrounds. */
const GLOWS = [
  "/images/timeline/frame_61.png",
  "/images/timeline/frame_58.png",
  "/images/timeline/frame_59.png",
];

/**
 * Convert API timeline items to the shape TimelineStory expects.
 * Uses only API data — no mixing with static fields.
 */
function buildTimelineItems(
  apiData?: ApiTimelineItem[]
): TimelineItem[] | undefined {
  if (!apiData || apiData.length === 0) return undefined;

  return apiData.map((item, index) => {
    const glow =
      item.gallery_images && item.gallery_images[0]
        ? resolveImageUrl(item.gallery_images[0])
        : GLOWS[index % GLOWS.length];

    return {
      year: item.year,
      title: item.title,
      description: item.description,
      image: resolveImageUrl(item.image_url),
      glow,
      side: (index % 2 === 0 ? "right" : "left") as "left" | "right",
    };
  });
}

export default function TimelineSection({
  items: propItems,
  apiData,
}: TimelineSectionProps) {
  const resolvedItems = buildTimelineItems(apiData);

  // Show first 3 on homepage; full list on /about#timeline
  const items = (resolvedItems ?? propItems ?? timelineItems).slice(0, 3);

  return (
    <section className="bg-brand-dark relative overflow-hidden text-white">
      <div className="relative z-10 container mx-auto">
        <TimelineStory items={items} />
      </div>
      {/* Action Button - Desktop & Tablet */}
      <div className="mb-16 flex justify-center">
        <ActionButton
          href="/about#timeline"
          label="See full timeline"
          variant="dark"
          className="h-[48px] gap-3 px-[23px] text-lg"
          showArrow={true}
          iconSize={20}
        />
      </div>
    </section>
  );
}
