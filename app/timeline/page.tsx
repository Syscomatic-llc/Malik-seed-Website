import TimelineStory from "@/components/TimelineStory";
import { timelineItems } from "@/data/sections-data";

export const metadata = {
  title: "Timeline — Malik Seeds",
  description:
    "Discover the historical journey of A.R. Malik and Malik Seeds from 1962 to today.",
};

export default function TimelinePage() {
  return (
    <div className="bg-brand-dark min-h-screen pt-[120px]">
      <TimelineStory items={timelineItems} />
    </div>
  );
}
