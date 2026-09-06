# Malik Seed Official Web Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

The official enterprise web application for **Malik Seed**, built with Next.js 16 App Router, React 19, and Tailwind CSS v4. The web portal showcases seed products, brand portfolios, company news, media galleries, career opportunities with automated candidate assessment grading, and real-time CMS-driven maintenance mode controls.

---

## 🚀 Key Features & Architecture

- **Custom Serverless Image Optimization Proxy (`/api/image-proxy`)**  
  High-performance image proxy utilizing `sharp` to convert heavy upstream CMS imagery into optimized WebP formats on-the-fly, backed by a persistent `/tmp` serverless disk cache with fallback passthrough support.
- **On-Demand ISR Cache Revalidation (`/api/revalidate`)**  
  Webhook API protected via secret token (`REVALIDATE_SECRET`), allowing external CMS triggers to instantly revalidate cached pages (`revalidatePath`) or data tags (`revalidateTag`).
- **Dynamic Maintenance Mode Proxy Middleware (`proxy.ts`)**  
  Intercepts incoming routing requests to query live CMS system settings and seamlessly rewrites visitor traffic to `/maintenance` when enabled.
- **Career Applicant Portal & Assessment Engine**  
  Interactive multi-step job application system located under `/careers`, complete with dynamic quiz evaluation and automated scoring logic (`lib/assessment-grading.ts`).
- **Dynamic SEO & Sitemap Generation**  
  Programmatic open-graph metadata fetching (`lib/api/seo.ts`), automated dynamic sitemap XML generation (`app/sitemap.ts`), and crawler directives (`app/robots.ts`).
- **Modern Responsive Design System**  
  Custom brand tokens, Lenis smooth scrolling, Motion (Framer Motion) micro-animations, and Radix/Base UI components tailored to the Malik Seed visual identity.

---

## 🔑 Environment Variables & Secret Keys

Copy `.env.example` to `.env.local` before running the project locally:

```bash
cp .env.example .env.local
```

### Environment Configuration Reference

| Environment Variable | Secret / Public | Required | Default Value / Example | Description |
| :--- | :---: | :---: | :--- | :--- |
| `API_BACKEND_URL` | Server Only | **Yes** | `https://apimalikseed.syscomatic.cloud/api/v1` | Backend REST API endpoint origin used for server-side fetches and Next.js path rewrites. |
| `NEXT_PUBLIC_SITE_URL` | Public | Optional | `https://malikseeds.com` | Canonical public site URL for SEO metadata, dynamic open-graph images, and `sitemap.xml`. (Falls back to `VERCEL_URL` or `http://localhost:3000`). |
| `REVALIDATE_SECRET` | **Secret Token** | **Yes** | `malik-seed-revalidate-secret` | **Authentication secret** required to authorize calls to the `/api/revalidate` webhook endpoint. |
| `DEFAULT_REVALIDATE_SECONDS` | Server Only | Optional | `15` | Default Time-To-Live (TTL) cache revalidation interval in seconds. |
| `NEXT_PUBLIC_API_BASE_URL` | Public | Optional | `""` | Optional direct public API base URL if client-side requests bypass the proxy. |
| `VERCEL_OIDC_TOKEN` | **Secret Token** | Optional | `""` | Vercel deployment OIDC authentication token used for CI/CD and deployment tooling. |

---

## 🛠️ Revalidation API Webhook Setup

External systems (such as headless CMS webhooks) can trigger instant cache purges using the `/api/revalidate` endpoint.

### Header Authentication (Recommended)

```http
POST /api/revalidate HTTP/1.1
Host: malik-seed-website.vercel.app
x-revalidate-secret: YOUR_REVALIDATE_SECRET
Content-Type: application/json

{
  "paths": ["/our-products", "/news"],
  "tags": ["products", "homepage"]
}
```

### Body Authentication Alternative

```json
{
  "secret": "YOUR_REVALIDATE_SECRET",
  "path": "/about"
}
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (v10+) or `yarn` / `pnpm` / `bun`

### Installation & Setup

1. **Clone repository and install dependencies:**
   ```bash
   git clone https://github.com/Syscomatic-llc/Malik-seed-Website.git
   cd Malik-seed-Website
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts the Next.js development server with hot module reloading. |
| `build` | `npm run build` | Compiles and builds the production-ready Next.js application. |
| `start` | `npm run start` | Launches the built Next.js production server. |
| `lint` | `npm run lint` | Runs ESLint to check for syntax and quality issues. |
| `format` | `npm run format` | Formats codebase using Prettier. |

---

## 📁 Repository Structure

```
├── app/                        # Next.js App Router pages & API routes
│   ├── api/                    # Serverless API routes (image-proxy, file-proxy, revalidate)
│   ├── about/                  # About page route
│   ├── careers/                # Career listing & job applicant portal
│   ├── coming-soon/            # Coming soon fallback page
│   ├── contact/                # Contact form page
│   ├── maintenance/            # System maintenance page
│   ├── news/                   # Company news & article details
│   ├── our-brands/             # Brand portfolio showcase
│   ├── our-gallery/            # Interactive media gallery
│   ├── our-products/           # Agricultural products catalog
│   ├── globals.css             # Tailwind CSS v4 & custom design tokens
│   ├── layout.tsx              # Root layout & providers
│   ├── robots.ts               # Dynamic robots.txt output
│   └── sitemap.ts              # Dynamic sitemap.xml generator
├── components/                 # Reusable UI & section components
├── lib/                        # API clients, utils, grading logic, SEO mappers
│   ├── api/                    # Backend API layer (client, products, news, settings)
│   ├── assessment-grading.ts   # Career assessment scoring algorithm
│   ├── rich-text-formatter.ts  # CMS rich text rendering engine
│   └── utils.ts                # General utilities & helper functions
├── store/                      # Zustand global state modules
├── proxy.ts                    # Edge middleware proxy for maintenance mode check
├── next.config.ts              # Next.config with API rewrites & Sharp optimization
└── .env.example                # Environment variables template
```

---

## 🗺️ Application Routes & CMS Configuration Reference

###  Brand Portfolio Pages & Required CMS Slugs Reference

Brand pages have **static frontend routes** in Next.js, while their content is dynamically fetched from backend CMS endpoints. When setting up or editing brands in the CMS database (`/api/v1/our-brands/brands`), use the exact required slugs below:

| Brand Name | Frontend Page Path (`page_path` for SEO) | Required CMS Backend `slug` | Dynamic Content API Endpoint | Next.js Source File |
| :--- | :--- | :--- | :--- | :--- |
| **Vegetable Seeds** | `/our-brands/vegetable-seeds` | `vegetable-seeds` | `/api/v1/our-brands/brands/vegetable-seeds/detail` | `app/our-brands/vegetable-seeds/page.tsx` |
| **Potato Seeds** | `/our-brands/potato-seeds` | `potato-seeds` | `/api/v1/our-brands/brands/potato-seeds/detail` | `app/our-brands/potato-seeds/page.tsx` |
| **Malik's Farm** | `/our-brands/maliks-farm` | **`malik-farms`** <br/>*(singular "malik", plural "farms")* | `/api/v1/our-brands/brands/malik-farms/detail` | `app/our-brands/maliks-farm/page.tsx` |
| **Origene by Malik** | `/our-brands/origene` | `Origene by Malik` *(or `origene`)* | `/api/v1/our-brands/brands/Origene%20by%20Malik/detail` | `app/our-brands/origene/page.tsx` |
| **Malik's Flower** | `/our-brands/maliks-flower` | `maliks-flower` | `/api/v1/our-brands/brands/maliks-flower/detail` | `app/our-brands/maliks-flower/page.tsx` |
| **Innovation & Development** | `/our-brands/innovation-development` | `innovation-development` *(or `innovation`)* | `/api/v1/our-brands/brands/innovation-development/detail` | `app/our-brands/innovation-development/page.tsx` |

> [!IMPORTANT]
> **CMS Brand Slug & Route Matching Notice (All Brands):**
> Brand page content is fetched dynamically from `/api/v1/our-brands/brands/${slug}/detail`. If the slug configured in the CMS database does not match the slug expected by the frontend resolver, the API returns `404 Not Found` and dynamic content fails to load.
> 
> **Key Slug Conventions Across All Brands:**
> 1. **Malik's Farm**: Frontend route is `/our-brands/maliks-farm`, but the CMS slug is **`malik-farms`** *(singular "malik", plural "farms")*.
> 2. **Origene by Malik**: Frontend route is `/our-brands/origene`, but the CMS slug is **`Origene by Malik`** *(or `origene`)*.
> 3. **Innovation & Development**: Frontend route is `/our-brands/innovation-development`, and CMS slug is **`innovation-development`** *(or `innovation` on staging)*.
> 4. **Vegetable Seeds**: Must be **`vegetable-seeds`** *(plural "seeds", not singular "seed")*.
> 5. **Potato Seeds**: Must be **`potato-seeds`** *(plural "seeds", not singular "seed")*.
> 6. **Malik's Flower**: Must be **`maliks-flower`** *(with "s" on "maliks")*.
> 
> *The frontend `brandsApi.resolveBrandSlug()` includes built-in tolerance and alias matching, but maintaining these exact slugs in the CMS database guarantees direct cache hits and prevents 404 errors.*

---

### 🌐 All Website Page Paths (CMS SEO `page_path` Configuration)

When configuring SEO metadata records in the CMS (`/api/v1/page-seo`), set the `page_path` column to the following exact paths:

| # | Page / Feature | Exact `page_path` in CMS | Next.js Source File |
| :---: | :--- | :--- | :--- |
| 1 | **Home Page** | `/` | `app/page.tsx` |
| 2 | **About Us** | `/about` | `app/about/page.tsx` |
| 3 | **Our Brands (Overview)** | `/our-brands` | `app/our-brands/page.tsx` |
| 4 | **Our Brands: Vegetable Seeds** | `/our-brands/vegetable-seeds` | `app/our-brands/vegetable-seeds/page.tsx` |
| 5 | **Our Brands: Potato Seeds** | `/our-brands/potato-seeds` | `app/our-brands/potato-seeds/page.tsx` |
| 6 | **Our Brands: Malik's Farm** | `/our-brands/maliks-farm` | `app/our-brands/maliks-farm/page.tsx` |
| 7 | **Our Brands: Origene by Malik** | `/our-brands/origene` | `app/our-brands/origene/page.tsx` |
| 8 | **Our Brands: Malik's Flower** | `/our-brands/maliks-flower` | `app/our-brands/maliks-flower/page.tsx` |
| 9 | **Our Brands: Innovation & Development** | `/our-brands/innovation-development` | `app/our-brands/innovation-development/page.tsx` |
| 10 | **Our Products (Catalog)** | `/our-products` | `app/our-products/page.tsx` |
| 11 | **News & Announcements (Index)** | `/news` | `app/news/page.tsx` |
| 12 | **Careers (Portal Overview)** | `/careers` | `app/careers/page.tsx` |
| 13 | **Careers: Open Positions** | `/careers/open-positions` | `app/careers/open-positions/page.tsx` |
| 14 | **Our Gallery (Media)** | `/our-gallery` | `app/our-gallery/page.tsx` |
| 15 | **Contact Us** | `/contact` | `app/contact/page.tsx` |

### ⚡ Dynamic Routes (Sitemap Auto-Populated)
- `/news/[slug]` — Individual news article page (dynamic slug)
- `/careers/[id]` — Job details & specification page (dynamic job ID)

### 📝 Multi-Step Career Job Application Flow
- `/careers/[id]/apply` — Application initial form page
- `/careers/[id]/apply/start` — Application process start screen
- `/careers/[id]/apply/info` — Personal & professional candidate details
- `/careers/[id]/apply/otp` — Verification OTP screen
- `/careers/[id]/apply/additional-info` — Candidate additional info
- `/careers/[id]/apply/exam/mcq` — Multiple Choice Questions exam section
- `/careers/[id]/apply/exam/short-answers` — Short answers exam section
- `/careers/[id]/apply/exam/long-answers` — Long answers exam section
- `/careers/[id]/apply/exam/written` — Written exam section
- `/careers/[id]/apply/review` — Application summary & review screen
- `/careers/[id]/apply/submitted` — Application submission confirmation
- `/careers/[id]/apply/result` — Candidate assessment score result screen
- `/careers/[id]/apply/loading` — Assessment processing screen

### 🛠️ Utility & System Pages
- `/maintenance` — Dynamic maintenance mode page (controlled via `proxy.ts`)
- `/coming-soon` — Feature preview coming soon page

### 🔌 API & System Endpoints
- `/api/revalidate` `[POST]` — On-demand ISR cache revalidation endpoint
- `/api/image-proxy` `[GET]` — Sharp WebP image caching proxy
- `/api/file-proxy` `[GET]` — Document & file delivery proxy
- `/api/v1/*` — Proxy rewrite to backend REST API origin
- `/sitemap.xml` — Dynamic XML sitemap
- `/robots.txt` — Dynamic search engine crawler instructions

---

## 🛡️ License & Ownership

Developed and maintained for **Malik Seed** by **Syscomatic LLC**. All rights reserved.
