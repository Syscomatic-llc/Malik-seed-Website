import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import TimelineStory from "@/components/TimelineStory";
import { timelineItems } from "@/lib";

export const metadata = {
  title: "Timeline — Malik Seeds",
  description: "Discover the historical journey of A.R. Malik and Malik Seeds from 1962 to today.",
};

export default function TimelinePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[120px] bg-brand-dark">
        <TimelineStory items={timelineItems} />
      </main>
      <Footer />
    </>
  );
}
