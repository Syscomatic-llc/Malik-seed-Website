# Malik Seeds: Page Paths & CMS SEO Reference

This document provides a complete, authoritative reference of all **Page Paths** used by the website for CMS SEO metadata (`/api/v1/page-seo/...`), as well as the **Brand Content Detail Endpoints**.

---

## 1. Brand Pages Reference

For brand pages, metadata is retrieved using the **Page Path** from the CMS `page-seo` table, while the brand content is fetched dynamically from the brand detail endpoint:

| Brand Name | Page Path (for CMS SEO) | Dynamic Brand Detail Content Endpoint |
| :--- | :--- | :--- |
| **Vegetable Seeds** | `/our-brands/vegetable-seeds` | `/api/v1/our-brands/brands/vegetable-seeds/detail` |
| **Potato Seeds** | `/our-brands/potato-seeds` | `/api/v1/our-brands/brands/potato-seeds/detail` |
| **Malik's Farm** | `/our-brands/maliks-farm` | `/api/v1/our-brands/brands/malik-farm/detail` |
| **Origene by Malik** | `/our-brands/origene` | `/api/v1/our-brands/brands/origene/detail` |
| **Malik's Flower** | `/our-brands/maliks-flower` | `/api/v1/our-brands/brands/malik-flower/detail` |
| **Innovation & Development** | `/our-brands/innovation-development` | `/api/v1/our-brands/brands/${slug}/detail`<br/>*(Auto-resolved: `innovation` on Dev, `innovation-development` on Prod)* |

---

## 2. All Website Page Paths (CMS SEO Configuration)

When configuring SEO metadata records in the CMS (`/api/v1/page-seo`), set the `page_path` column to the following exact values:

| # | Page / Feature | Exact `page_path` in CMS | Next.js Source File |
| :---: | :--- | :--- | :--- |
| 1 | **Home Page** | `/` | `app/page.tsx` |
| 2 | **Our Brands (Overview)** | `/our-brands` | `app/our-brands/page.tsx` |
| 3 | **Our Brands: Vegetable Seeds** | `/our-brands/vegetable-seeds` | `app/our-brands/vegetable-seeds/page.tsx` |
| 4 | **Our Brands: Potato Seeds** | `/our-brands/potato-seeds` | `app/our-brands/potato-seeds/page.tsx` |
| 5 | **Our Brands: Malik's Farm** | `/our-brands/maliks-farm` | `app/our-brands/maliks-farm/page.tsx` |
| 6 | **Our Brands: Origene by Malik** | `/our-brands/origene` | `app/our-brands/origene/page.tsx` |
| 7 | **Our Brands: Malik's Flower** | `/our-brands/maliks-flower` | `app/our-brands/maliks-flower/page.tsx` |
| 8 | **Our Brands: Innovation & Development** | `/our-brands/innovation-development` | `app/our-brands/innovation-development/page.tsx` |
| 9 | **Our Products** | `/our-products` | `app/our-products/page.tsx` |
| 10 | **Our Gallery** | `/our-gallery` | `app/our-gallery/page.tsx` |
| 11 | **About Us** | `/about` | `app/about/page.tsx` |
| 12 | **News & Updates** | `/news` | `app/news/page.tsx` |
| 13 | **News Article Detail** | `/news/${slug}` | `app/news/[slug]/page.tsx` |
| 14 | **Contact Us** | `/contact` | `app/contact/page.tsx` |
| 15 | **Careers (Overview)** | `/careers` | `app/careers/page.tsx` |
| 16 | **Careers: Open Positions** | `/careers/open-positions` | `app/careers/open-positions/page.tsx` |
| 17 | **Careers: Job Position Detail** | `/careers/${id}` | `app/careers/[id]/page.tsx` |

---

## 3. SEO API Architecture

- **Endpoint**: `/api/v1/page-seo/${encodeURIComponent(page_path)}`
- **Method**: `GET`
- **Database Table**: `page_seo`
- **Fields Returned**:
  - `title` / `meta_title`
  - `meta_description`
  - `meta_keywords`
  - `og_title`
  - `og_description`
  - `og_image`
