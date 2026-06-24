import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { newsArticles } from "@/data/news-data";
import JoinTeamSection from "@/components/sections/JoinTeamSection";
import ShareButton from "@/components/ShareButton";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

// Statically generate parameters for all articles at build time
export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

// Generate dynamic SEO metadata based on the article
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  const article = newsArticles.find((a) => a.id === articleId);

  if (!article) {
    return {
      title: "Article Not Found — Malik Seeds",
    };
  }

  return {
    title: `${article.title} — Malik Seeds`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  const article = newsArticles.find((a) => a.id === articleId);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Article Detail Container */}
      <article className="w-full px-4 pt-[100px] pb-10 md:px-[100px] md:pt-[180px] md:pb-[100px]">
        <div className="mx-auto max-w-[1030px]">
          
          {/* Header Actions & Meta */}
          <div className="flex flex-col gap-8">
            {/* Back Button */}
            <Link
              href="/news"
              className="inline-flex items-center gap-[8px] text-[#195236] text-[16px] font-medium leading-[24px] group focus-visible:outline-none"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to News</span>
            </Link>

            {/* Title & Metadata Block */}
            <div className="flex flex-col gap-6">
              {/* Category & Date */}
              <div className="flex items-center gap-4">
                {/* Category Pill */}
                <div 
                  className="inline-flex h-[41px] items-center justify-center rounded-[10px] border border-[#F2F4F7] bg-white px-6 text-[14px] font-medium leading-[21px] text-[#195236] md:h-[48px] md:text-[16px] md:leading-[24px]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {article.category}
                </div>
                {/* Dot Separator */}
                <span className="h-[4px] w-[4px] rounded-full bg-[#0D1A14]" />
                {/* Date Text */}
                <span 
                  className="text-[14px] font-medium leading-[21px] text-[#0D1A14] md:text-[16px] md:leading-[24px]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {article.date}
                </span>
              </div>

              {/* Heading Title */}
              <h1 
                className="text-[32px] font-medium leading-[40px] text-[#0D1A14] md:text-[48px] md:leading-[58px]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                {article.title}
              </h1>

              {/* Share Trigger */}
              <ShareButton />
            </div>
          </div>

          {/* Large Main Banner Image */}
          <div className="relative mt-8 h-[240px] w-full overflow-hidden rounded-[20px] bg-white md:mt-12 md:h-[598px] md:rounded-[32px] border border-[#E4E7EC]/30">
            <Image
              src={article.detailImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1030px"
              className="object-cover"
            />
          </div>

          {/* Main Article Body Layout */}
          <div className="mt-8 grid grid-cols-1 gap-12 md:mt-12 lg:grid-cols-3">
            {/* Left Content column */}
            <div className="lg:col-span-2">
              <div 
                className="max-w-none text-[#141C24]/90 [&_h3]:text-[24px] [&_h3]:font-medium [&_h3]:leading-[32px] [&_h3]:text-[#0D1A14] [&_h3]:mt-8 [&_h3]:mb-4 [&_p]:text-[16px] [&_p]:leading-[28px] [&_p]:text-[#0D1A14]/80 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-[16px] [&_ul]:leading-[28px] [&_ul]:text-[#0D1A14]/80 [&_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#195236] [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-[#195236] [&_blockquote]:font-medium [&_blockquote]:text-[18px] [&_cite]:block [&_cite]:text-[14px] [&_cite]:text-[#0D1A14]/60 [&_cite]:mt-2 [&_cite]:font-normal [&_cite]:not-italic"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "16px",
                  lineHeight: "28px"
                }}
              />
            </div>

            {/* Right Sidebar column */}
            <div className="flex flex-col gap-8 rounded-[20px] border border-[#E4E7EC]/50 bg-white p-6 h-fit">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#141C24]/50">
                  Published In
                </span>
                <span 
                  className="text-[16px] font-medium text-[#195236]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {article.category}
                </span>
              </div>

              <div className="border-t border-[#F2F4F7] w-full" />

              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#141C24]/50">
                  Release Date
                </span>
                <span 
                  className="text-[16px] font-medium text-[#0D1A14]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  {article.date}
                </span>
              </div>

              <div className="border-t border-[#F2F4F7] w-full" />

              <ShareButton
                label="Share Article"
                iconSize={18}
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#195236] text-[16px] font-medium text-white transition-colors hover:bg-[#15432c] focus-visible:outline-none"
              />
            </div>
          </div>

        </div>
      </article>

      {/* Careers Section career CTA */}
      <JoinTeamSection />
    </div>
  );
}
