# Desktop Image Frame Sizes Report

This document lists all image frame sizes for desktop viewports (1024px, 1280px, and above) across all pages and sections in the codebase. 

Icon-only images (chevrons, arrows, upload icons, indicators) have been skipped. Sizing measurements represent the **precise image frame (container) size** showing both width and height in pixel (`W × H px`) format.

---

## 1. Homepage & Global Layout Components

| Page / Section | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Section** | Hero Background Slideshow | `1440 × 900 px` | [HeroSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/HeroSection.tsx#L32) | Uses `fill` layout with `object-cover` within a full-screen `h-screen w-full` section container. |
| **About Section** | Malik Seeds Team Banner | `503 × 340 px` | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx#L228) | Uses container aspect ratio `aspect-[503/340]` with a fixed width constraint `xl:w-[503px]`. |
| **About Section** | Years of Experience Sub-image 1 | `243 × 226 px` | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx#L243) | Uses container aspect ratio `aspect-[243/226] flex-1` inside a `503px` width parent. |
| **About Section** | Farmer Partners Sub-image 2 | `243 × 226 px` | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx#L254) | Uses container aspect ratio `aspect-[243/226] flex-1` inside a `503px` width parent. |
| **Products Grid** | Product Category Cards | `480 × 377 px` | [ProductsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/ProductsSection.tsx#L127) | Card height is fixed at `377px`. Width is computed based on a 3-column grid under max `1240px` width. |
| **Timeline Section** | Historical Story Main Photo | `503 × 372 px` | [TimelineStory.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/TimelineStory.tsx#L337) | Rendered via `ImagePanel` with aspect ratio `aspect-[503/372]` and max-width `max-w-[503px]`. |
| **Timeline Section** | Card Backing Glow Background | `252 × 186 px` | [TimelineStory.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/TimelineStory.tsx#L416) | Blurred image backing overlay of fixed dimensions `h-[186px] w-[252px]`. |
| **Testimonials Section** | Active Testimonial Photo | `398 × 560 px` | [TestimonialsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/TestimonialsSection.tsx#L49) | Card size is fixed at `398px` width. Active card height expands to `560px` with the image filling it. |
| **Testimonials Section** | Inactive Testimonial Photo | `398 × 480 px` | [TestimonialsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/TestimonialsSection.tsx#L50) | Inactive card height shrinks to `480px` with the image filling it. |
| **Partners Section** | Development Partner Logos | `161 × 60 px` | [PartnersSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/PartnersSection.tsx#L87) | Uses fixed dimensions `width={161} height={60}` and class `shrink-0 object-contain` for loop scrolling. |
| **News Section** | News Article Thumbnail (Home Grid) | `359 × 264 px` | [NewsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/NewsSection.tsx#L37) | Standardizes thumbnail container height to `264px` with fixed card widths of `359px` on large viewports (`xl` and above). |
| **Join Our Team Section** | Overlapping Team Image | `726 × 544 px` | [JoinTeamSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/JoinTeamSection.tsx#L80) | Absolute positioned container size `w-[726px] h-[544px] top-[-32px] left-[-30px]` overflowing a parent `690x430` crop mask. |
| **Global Footer** | Malik Seeds Brand Logo | `270 × 35 px` | [Footer.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/Footer.tsx#L164) | Renders with fixed dimensions `width={270} height={35}` and responsive width class `md:w-67.5` (`270px`). |
| **Global Footer** | Bottom Brand Wordmark | `1225 × 151 px` | [Footer.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/Footer.tsx#L231) | Renders with fixed dimensions `width={1225} height={151}` and class `md:max-w-306.25` (`1225px`). |

---

## 2. Our Story Page (About Page)

| Section / Element | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **About Hero** | Crop/Field Inspection Slides | `605 × 464 px` | [AboutHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutHero.tsx#L62) | Width is 42vw (approx `605px` at standard 1440px viewport) constrained by aspect ratio `aspect-[548/420]`. |
| **Brand Values** | Principle Thumbnail Images | `365 × 264 px` | [AboutValues.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutValues.tsx#L71) | Uses container aspect ratio `aspect-[365/264]` inside a 2-column grid capped at `820px` total width. |
| **Mission Section 2** | Malik's Farm Crop Banner | `1128 × 532 px` | [AboutMissionTwo.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutMissionTwo.tsx#L97) | Spans full-width of the inner content block using aspect ratio `aspect-[1128/532]` (max-width `1128px` on desktop). |
| **Journey Gallery** | Bento Small Item Image | `398 × 398 px` | [GalleryHeroSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/GalleryHeroSection.tsx#L197) | Standardized height `xl:h-[398px]` combined with formula width `xl:w-[calc(33.33%-16px)]` inside `1242px` parent. |

---

## 3. Careers Page

| Section / Element | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Career Hero** | Right Column Team Image (Large) | `503 × 520 px` | [CareerHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/CareerHero.tsx#L153) | Uses fixed dimensions `xl:w-[503px] xl:h-[520px]` on large viewports (>= 1280px). |
| **Career Hero** | Right Column Team Image (Standard) | `400 × 420 px` | [CareerHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/CareerHero.tsx#L153) | Sized to `lg:w-[400px] lg:h-[420px]` on standard desktop (1024px to 1279px). |
| **Career Manifesto** | Scrolling Manifesto Cards | `616 × 360 px` | [CareerManifestoSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/CareerManifestoSection.tsx#L121) | Cards display at `lg:h-[360px] lg:w-[616px]` using aspect-ratio `aspectRatio: "12/7"`. |
| **Team Culture** | Row 1 Wide Image (62%) | `768 × 380 px` | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx#L38) | height is fixed at `380px`. Width spans `flex-[62%]` of the `1240px` container (approx `768px`). |
| **Team Culture** | Row 1 Narrow Image (36%) | `448 × 380 px` | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx#L51) | height is fixed at `380px`. Width spans `flex-[36%]` of the `1240px` container (approx `448px`). |
| **Team Culture** | Row 2 3-Up Grid Images | `398 × 380 px` | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx#L68) | height is fixed at `380px`. Width spans equal columns in a 3-column desktop layout (`398px`). |
| **Future Leader Program**| Right Column Block Image | `503 × 435 px` | [FutureProgramSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/FutureProgramSection.tsx#L122) | Uses fixed dimensions `lg:w-[503px] lg:h-[435px]` on desktop. |
| **Employee Testimonials**| Profile Avatar Frame | `180 × 180 px` | [EmployeeTestimonialsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/EmployeeTestimonialsSection.tsx#L55) | Uses fixed dimensions `lg:w-[180px] lg:h-[180px]` with rounded corners `lg:rounded-[24px]`. |

---

## 4. Our Brands & Brand Sub-pages (Shared Components)

| Section / Component | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Hero** | Brand Main Header Backdrop | `1440 × 900 px` | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx#L34) | Uses Next.js `fill` layout within standard full screen dimensions. |
| **Brand Split (centered)** | Full Width Center Banner | `1240 × 630 px` | [BrandSplit.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandSplit.tsx#L84) | Horizontal center-aligned banner showing fields/processes. Fixed height `md:h-[630px]` on a max `1240px` row. |
| **Brand Split (split)** | Left/Right Image Block | `503 × 530 px` | [BrandSplit.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandSplit.tsx#L218) | Uses fixed container dimensions `lg:max-w-[503px] lg:h-[530px]` on desktop. |
| **Brand Grid (2-Up)** | Process/Field Grid (2 Items) | `608 × 377 px` | [BrandGrid.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandGrid.tsx#L240) | Uses aspect-ratio `aspect-[608/377]` and takes full width of column (`608px` in a `1240px` row with a `24px` gap). |
| **Brand Grid (3-Up)** | Process/Field Grid (3 Items) | `397 × 377 px` | [BrandGrid.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandGrid.tsx#L240) | Uses aspect-ratio `aspect-[397/377]` and takes full width of column (`397.3px` in `1240px` row with `48px` total gaps). |
| **Brand Process** | Process Step Grid Image | `608 × 377 px` | [BrandProcess.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandProcess.tsx#L170) | Two-column grid layout on desktop. Image container uses fixed dimensions `md:h-[377px] md:w-full` (`608px` width max). |
| **Brand Flower Portfolio**| Flower Segment Tab Display | `790 × 475 px` | [BrandFlowerPortfolio.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandFlowerPortfolio.tsx#L104) | Fixed container dimensions `lg:w-[790px] lg:h-[475px]` in the center of the tab presentation. |
| **Brand YouTube** | Activity Previews Grid Image | `604 × 440 px` | [BrandYouTube.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandYouTube.tsx#L85) | Two-column grid on desktop. Image container uses fixed height `height: "440px"` inside column (`604px` max width). |
| **Brand YouTube** | Absolute Partner Logo | `336 × 160 px` | [BrandYouTube.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandYouTube.tsx#L121) | Absolute container of fixed dimensions `width: "336px", height: "160px"` on the bottom-right of the section. |

### 4.1 Brand Custom Pages Specific Layouts

| Page / Section | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Brands Landings** | Ecosystem Hero Banner | `1030 × 520 px` | [page.tsx (our-brands)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/page.tsx#L25) | Sized to `md:h-[520px] w-full` inside a `max-w-[1030px]` parent row. |
| **Origene Page** | Split Column Intro Photo | `608 × 714 px` | [page.tsx (origene)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/origene/page.tsx#L71) | Right column photo block sized to `lg:max-w-[608px] lg:h-[714px]`. |
| **Malik’s Farm** | Custom Split 1 Image | `1240 × 698 px` | [page.tsx (maliks-farm)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/maliks-farm/page.tsx#L68) | Spans full-width of the `1240px` row with aspect ratio `aspect-[16/9]`. |
| **Malik’s Farm** | R&D Steps Photo Card | `608 × 377 px` | [page.tsx (maliks-farm)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/maliks-farm/page.tsx#L122) | Card size of `md:w-[608px] md:h-[377px]` next to other step cards. |
| **Malik’s Farm** | GAP Small Images | `292 × 320 px` | [page.tsx (maliks-farm)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/maliks-farm/page.tsx#L188) | 4-column item on desktop, width resolves to `292px` with flex stretch height (min `320px`). |
| **Malik’s Farm** | Commercial Farm Gallery Card | `397 × 377 px` | [page.tsx (maliks-farm)](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/our-brands/maliks-farm/page.tsx#L225) | Card size of `md:w-full md:h-[377px]` inside a 3-column row (`397px` width). |
| **Brand Training** | Facility Detail Thumbnail | `372 × 240 px` | [BrandTraining.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandTraining.tsx#L56) | Left column of facility row. Sized to `lg:w-[372px] lg:h-[240px]`. |
| **Brand Training** | Active Program Backdrop | `1030 × 475 px` | [BrandTraining.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandTraining.tsx#L239) | Sized with aspect ratio `md:aspect-[1030/475]` inside `1030px` max parent width. |
| **Brand Training** | Guest Review Scan Image Card | `398 × 598 px` | [BrandTraining.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandTraining.tsx#L331) | Fixed dimensions `w-[398px] h-[598px]` in guest reviews carousel. |

---

## 5. Newsroom & Detail Article Pages

| Page / Section | Image Description | Desktop Frame Size (W × H) | Codebase Component / File | Sizing Mechanism / Styling Notes |
| :--- | :--- | :--- | :--- | :--- |
| **News Feed** | Shared Article Card Thumbnail | `365 × 260 px` | [NewsCard.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/NewsCard.tsx#L15) | Image wrapper has fixed height `h-[260px] w-full`. Spans 3-columns on desktop with 16px card padding (`365px` width). |
| **Article Detail** | Article Header Cover Banner | `1030 × 598 px` | [page.tsx (news/[slug])](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/news/%5Bslug%5D/page.tsx#L252) | Header banner photo constrained to `md:h-[598px] w-full` inside `1030px` max parent layout. |
| **Article Detail** | Article TOC Author Avatar | `48 × 48 px` | [NewsTOC.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/NewsTOC.tsx#L167) | Sized via circular fixed wrapper `h-12 w-12 shrink-0 rounded-full`. |
| **Article Detail** | Shared Article Share Icons | `184 × 40 px` | [ShareBar.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/ShareBar.tsx#L46) | Renders composite `share-icons.svg` inside a fixed wrapper `h-10 w-[184px]`. |

---

> [!NOTE]
> All sizes computed here are based on the standard `1440px` desktop layout width defined in the Tailwind configuration and parent container limits (`max-w-[1440px]`, `max-w-[1240px]`, and `max-w-[1030px]`). 
> 
> Responsive widths scale dynamically to adapt to smaller viewports (down to 1024px for desktop mode boundaries) while retaining the specified aspect ratios or static height parameters.
