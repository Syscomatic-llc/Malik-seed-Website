import { useState, useEffect, useCallback } from "react";

interface UseAutoSlideOptions {
  count: number;
  interval?: number;
}

interface UseAutoSlideReturn {
  currentIndex: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

/**
 * Hook that manages an auto-advancing slide index.
 * Pauses automatically when the user manually navigates (optional).
 */
export function useAutoSlide({
  count,
  interval = 7500,
}: UseAutoSlideOptions): UseAutoSlideReturn {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(
    () => setCurrentIndex((i) => (i + 1) % count),
    [count]
  );

  const prev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + count) % count),
    [count]
  );

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, count]);

  return { currentIndex, goTo, next, prev };
}
