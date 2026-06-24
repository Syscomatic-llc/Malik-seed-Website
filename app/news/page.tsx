import { Suspense } from "react";
import NewsPage from "./NewsPage";

export const metadata = {
  title: "News & Updates | Malik Seed",
  description:
    "Stay up to date with the latest research, farmer stories, partnerships, and innovations from Malik Seed.",
};

/**
 * Route segment — Server Component.
 * Wraps the client NewsPage in <Suspense> so useSearchParams()
 * (used for URL-based "Load more" count persistence) works correctly
 * without blocking the initial HTML stream.
 */
export default function NewsRoute() {
  return (
    <Suspense fallback={null}>
      <NewsPage />
    </Suspense>
  );
}
