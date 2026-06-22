import { timelineItems } from "@/data/sections-data";
import TimelineStory from "../TimelineStory";
import ActionButton from "../ActionButton";

export default function TimelineSection() {
    const items = timelineItems.slice(0, 3)
    return (
        <section className="relative bg-brand-dark text-white overflow-hidden">
            <div className="container mx-auto relative z-10">
                <TimelineStory items={items} />
            </div>
            {/* Action Button - Desktop & Tablet */}
            <div className="flex justify-center mb-16">
                <ActionButton
                    href="/timeline"
                    label="See full timeline"
                    variant="dark"
                    className="h-[48px] px-[23px] text-lg gap-3"
                    showArrow={true}
                    iconSize={20}
                />
            </div>
        </section>
    )
}