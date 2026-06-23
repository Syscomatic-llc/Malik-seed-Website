import { timelineItems } from "@/data/sections-data";
import TimelineStory from "../TimelineStory";
import ActionButton from "../ActionButton";

export default function TimelineSection() {
  const items = timelineItems.slice(0, 3);
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
