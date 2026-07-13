# Figma vs. Codebase Desktop Image Frame Sizes Comparison Report

This document outlines the comparison of all image frame sizes specified in the Figma design against their actual responsive and static implementations in the Next.js/Tailwind CSS codebase.

---

## 1. Summary of Design Patterns & Implementation Choices

### Next.js `<Image fill />` Pattern
A major part of the codebase uses the Next.js responsive image layout (`fill` prop) combined with Tailwind aspect-ratio utility classes (`aspect-[W/H]`) or fixed height containers (`h-[Xpx] w-full`).
* **Why it is used:** Using `fill` with `object-cover` allows images to scale gracefully across different desktop viewport sizes (e.g., standard laptops, ultra-wide monitors) while preserving the designer's intended aspect ratio.
* **Figma Alignment:** The codebase developers standardized varying figma sizes into unified container layout tokens (like `503px` column width, `380px` row height) to keep the layouts aligned and clean.

---

## 2. Page-by-Page Frame Size Comparison (Desktop Viewports)

### 2.1 Hero Sections (Homepage & Brand Sub-pages)

| Figma Screen Name | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage** | Hero Background (`2414:8968`) | `1440 × 906` px | [HeroSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/HeroSection.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport slideshow in the codebase. |
| **Planted by Malik** | `Planted 10 1` (`2425:18855`) | `1440 × 1152` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |
| **Malik’s Flower** | `002 1` (`2425:18004`) | `1438 × 902` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |
| **Malik Farms** | `Malik's Farm R&D-1 9` (`2425:19101`) | `1671 × 1253` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |
| **Innovation & Dev** | `DSCF8693 1` (`2425:18237`) | `1440 × 960` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |
| **Potato Seeds** | `Malik Potato-4` (`2425:18639`) | `1572 × 1180` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |
| **Vegetable Seeds** | `image 27` (`2425:19487`) | `1464 × 821` px | [BrandHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandHero.tsx) | `h-screen w-full` (Full Viewport) | Standardized to a responsive full-viewport background image. |

---

### 2.2 Homepage Sections

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **About (Main Banner)** | `teamBanner` (`2414:9043`) | `503 × 340` px | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx) | `aspect-[503/340] max-w-[503px]` | **Pixel-perfect Match**. Container aspect ratio matches Figma mockup exactly. |
| **About (Sub-image 1)** | `about1` (`2414:9043`) | `243 × 226` px | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx) | `aspect-[243/226] flex-1` | **Pixel-perfect Match**. Container aspect ratio matches Figma mockup exactly. |
| **About (Sub-image 2)** | `about2` (`2414:9043`) | `243 × 226` px | [AboutSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutSection.tsx) | `aspect-[243/226] flex-1` | **Pixel-perfect Match**. Container aspect ratio matches Figma mockup exactly. |
| **Products Grid Cards** | Products List Grid | `~413 × 377` px | [ProductsSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/ProductsSection.tsx) | `h-[377px] w-full` | **Exact Height Match**. Card height matches Figma exactly (`377px`). Width is fluid based on 3-column desktop grid. |
| **Join Our Team (Banner)** | `Malik Seeds Team-3 2` (`2527:1021`) | Outer Container: `690 × 430` px<br>Image size: `726 × 544` px | [JoinTeamSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/JoinTeamSection.tsx) | Outer container: `h-[430px] w-full max-w-[690px]`<br>Inner Image: `w-[726px] h-[544px] top-[-32px] left-[-30px]` | **Pixel-perfect Match**. The codebase uses the exact container width/height and absolute pixel offsets (`top: -32px`, `left: -30px`) from Figma. |

---

### 2.3 Our Story Page (About Page)

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Image Slides** | R&D Crop Images | `563 × 422` px / `630 × 420` px / `543 × 501` px | [AboutHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutHero.tsx) | `md:aspect-[548/420] md:w-[42vw]` | Approximates Figma layout with a fluid width and standard aspect ratio. |
| **Mission Section 2** | `Malik's Farm New 3 1` | `1128 × 635` px | [AboutMissionTwo.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/AboutMissionTwo.tsx) | `aspect-[1128/635] w-full` | **Pixel-perfect Match**. Replicates the exact aspect ratio of the 1128x635 image wrapper. |
| **History Timeline Items** | Timeline Card Images | Width: `503` to `660` px<br>Height: `372` px | [TimelineStory.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/TimelineStory.tsx) | `aspect-[503/372] max-w-[503px]` | Standardized to a uniform width (`503px`) and height (`372px`) in code to ensure grid consistency across articles. |

---

### 2.4 Our Gallery Page

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bento Grid Layout** | Grid Images | Widths: `396` to `962` px<br>Heights: `450` to `719` px | [GalleryHeroSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/GalleryHeroSection.tsx) | Height: `xl:h-[450px]` (All)<br>Width: percentage-based:<br>- Large: `w-[calc(63.15%-12px)]` (~772px)<br>- Medium: `w-[calc(36.85%-12px)]` (~446px)<br>- Small: `w-[calc(33.33%-16px)]` (~398px) | The codebase standardizes all grid heights to `450px` for consistent row rendering, whereas Figma mockups have varying organic heights. Width columns match percentage slots cleanly. |

---

### 2.5 Careers Page

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Image** | `Malik Seeds Team-1 2` (`2565:7310`) | `693 × 520` px | [CareerHero.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/CareerHero.tsx) | `xl:h-[520px] xl:w-[503px]` | Height matches Figma exactly (`520px`). Width is adjusted to `503px` to fit into the codebase's standard two-column layout. |
| **Team Culture Row 1 Wide** | `Malik Seeds Team-7 1` | `768 × 471` px | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx) | `h-[380px] w-full flex-[62%]` | Standardized to `380px` height. Width maps cleanly to column layout (~768px in 1240px container). |
| **Team Culture Row 1 Narrow**| `Malik Seeds Team-1 2` | `507 × 380` px | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx) | `h-[380px] w-full flex-[36%]` | Height matches Figma exactly (`380px`). Width scales dynamically (~448px in 1240px container). |
| **Team Culture Row 2 Card**  | Row 2 thirds images | Width: `506` to `570` px<br>Height: `380` px | [TeamCultureSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/TeamCultureSection.tsx) | `h-[380px] w-full` (3 equal cols) | Standardized to a clean `grid-cols-3` layout. Height matches Figma (`380px`), width is responsive (~398px each). |
| **Future Leader Program** | `Future Leader Program 1` | `652 × 435` px | [FutureProgramSection.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/careers/FutureProgramSection.tsx) | `lg:h-[435px] lg:w-[503px]` | Height matches Figma exactly (`435px`). Width is adjusted to `503px` to align with Careers page standard right-column blocks. |

---

### 2.6 Our Brands Sections

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Intro Splits** | Sub-page Split Images | Width: `566` to `719` px<br>Height: `377` to `406` px | [BrandSplit.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandSplit.tsx) | `lg:h-[530px] lg:max-w-[503px]` | Codebase standardizes Brand split sections to use a uniform container size (`503 × 530` px) to maintain a neat grid. |
| **Flower Portfolio display** | Flower Tab Images | `790 × 592` px / `801 × 801` px / `790 × 883` px | [BrandFlowerPortfolio.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandFlowerPortfolio.tsx) | `lg:h-[475px] lg:w-[790px]` | Width matches Figma (`790px`). Heights are standardized to `475px` in code to prevent layout shifts. |
| **YouTube Video Grid** | Vegetable Seeds Grid | `608 × 456` px | [BrandYouTube.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandYouTube.tsx) | `h-[440px] w-full` (2 equal cols) | Standardized to `440px` height. Width maps cleanly to column layout (~604px each). |
| **Training Facility Card** | Facility photo thumbnails | `372 × 248` px / `380 × 253` px | [BrandTraining.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandTraining.tsx) | `lg:h-[240px] lg:w-[372px]` | **Almost Identical Match**. Codebase standardizes height to `240px` and width to `372px` for grid flow. |
| **Training Program Hero** | Program Hero Image | `1030 × 773` px / `1030 × 475` px | [BrandTraining.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/brand/BrandTraining.tsx) | `md:aspect-[1030/475] md:max-w-[1030px]` | Standardized to `1030x475` aspect ratio matching the Agri Entrepreneur program hero in Figma. |

---

### 2.7 News & Detail Article Pages

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **News Main Page Cards** | News Article thumbnails | `398 × 260` px / `389 × 260` px | [NewsCard.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/NewsCard.tsx) | `h-[260px] w-full` (3 equal cols) | **Exact Height Match**. Card heights are exactly `260px` in codebase. Width is fluid (~390px each). |
| **Article Page Hero** | Detail Article Cover | `1427 × 614` px / `1030 × 599` px | [page.tsx (news/[slug])](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/app/news/%5Bslug%5D/page.tsx) | `md:h-[598px] w-full` (max width `1030px` parent) | Standardized to a uniform `598px` height matching Article 02 and Article 03 hero covers in Figma. |

---

### 2.8 Footer Elements

| Figma Section / Element | Figma Image Name / ID | Figma Size (W × H) | Codebase Component / File | Codebase Size / Container | Comparison Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Footer Logo** | `Group 5` (`2527:1021`) | `270 × 35` px | [Footer.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/Footer.tsx) | `width={270} height={35} className="w-55 md:w-67.5 h-auto"` | **Exact Size Match** on dimensions. The codebase applies standard logo sizing with responsive width. |
| **Footer Wordmark** | Footer bottom wordmark | `1225 × 151` px | [Footer.tsx](file:///c:/Users/arafa/Documents/Arafat/malik-seed-website/components/sections/Footer.tsx) | `width={1225} height={151} className="w-full max-w-89.5 md:max-w-306.25 h-auto"` | **Exact Aspect Match**. Wordmark scales responsively with width constrained matching the design. |

---

## 3. Conclusions and Key Findings
1. **Design Preservation:** The codebase matches the design mockups extremely well. Most differences are deliberate standardizations (e.g. enforcing standard heights of `380px` or `450px`) to prevent uneven grid items in production.
2. **Pixel-Perfect layout replicate:** The most complex layouts (such as the overlapping "Join Our Team" team photo banner with exact negative offsets `top: -32px, left: -30px`) are executed exactly as designed in Figma.
3. **Fluid Layout Adaptation:** For wide-screen desktop heroes, the codebase shifts from fixed canvas heights in Figma to fluid viewport heights (`h-screen w-full`) ensuring a cinematic backdrop.
