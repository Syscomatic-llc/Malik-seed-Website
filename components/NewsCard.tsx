import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { NewsArticle } from "@/data/news-data";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {

  return (
    <div className="group flex w-full flex-col rounded-[24px] bg-white p-[16px] transition-all duration-300 hover:shadow-md border border-[#E4E7EC]/50">
      {/* Image Container */}
      <div className="relative h-[260px] w-full overflow-hidden rounded-[16px] bg-[#F9FAFB]">

        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col pt-6">
        <h3
          className="line-clamp-2 text-[20px] font-medium leading-[30px] text-[#0D1A14]"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          {article.title}
        </h3>

        <p className="mt-2 flex-1 line-clamp-3 text-[16px] leading-[24px] text-[#0D1A14]/70 font-sans">
          {article.description}
        </p>

        {/* Separator Line */}
        <div className="my-6 border-t border-[#CED2DA] w-full" />

        {/* Read More link */}
        <Link
          href={`/news/${article.id}`}
          className="inline-flex items-center gap-[10px] text-[#195236] text-[16px] font-medium leading-[19px] group/btn focus-visible:outline-none"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          <span>Read More</span>
          <ArrowIcon
            size={24}
            className="text-[#195236] transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
