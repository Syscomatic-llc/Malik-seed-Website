/**
 * app/loading.tsx — Next.js root Suspense fallback.
 *
 * WHY THIS RETURNS NULL:
 * InitialLoader (rendered in layout.tsx at z-[9999]) already provides a
 * full-screen signature animation on first visit. This file was previously
 * showing a secondary loader BEFORE InitialLoader could mount, because
 * Next.js fires the Suspense fallback immediately (before React hydration),
 * so InitialLoader's useEffect had no chance to suppress it.
 *
 * Returning null is safe because:
 *  - First visit  → InitialLoader (z-9999) covers the full screen.
 *  - Return visits → InitialLoader skips itself (sessionStorage flag);
 *                    the page content arrives quickly via streaming.
 *  - SPA navigation → root loading.tsx never re-fires on client routing.
 */
export default function RootLoading() {
  return null;
}