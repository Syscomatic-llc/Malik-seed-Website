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

## 🗺️ Application Routes Reference

### 🌐 Public Static Routes (Included in Sitemap)
- `/` — Homepage
- `/about` — About Us page
- `/contact` — Contact form & office details
- `/our-products` — Seeds & Agricultural Products catalog
- `/our-gallery` — Media & event gallery
- `/news` — Company news & announcements
- `/careers` — Careers main portal
- `/careers/open-positions` — Open job vacancies listing

#### 🌾 Brand Portfolio Routes (`/our-brands/*`)
- `/our-brands` — Brands hub
- `/our-brands/vegetable-seeds` — Vegetable Seeds showcase
- `/our-brands/potato-seeds` — Potato Seeds showcase
- `/our-brands/origene` — Origene brand showcase
- `/our-brands/maliks-flower` — Malik's Flower brand showcase
- `/our-brands/maliks-farm` — Malik's Farm brand showcase
- `/our-brands/innovation-development` — R&D Innovation showcase

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
