import Image from "next/image";

interface BrandYouTubeProps {
  title: string;
  youtubeUrl: string;
  images: string[];
}

export default function BrandYouTube({
  title,
  youtubeUrl,
  images,
}: BrandYouTubeProps) {
  const gridCols =
    images.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-2";

  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8 lg:px-[100px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10 md:gap-12">
        {/* Section title */}
        <h2 className="font-sans text-[24px] md:text-[36px] font-medium leading-[30px] md:leading-[44px] text-[#0D1A14] max-w-[700px]">
          {title}
        </h2>

        {/* Video Frame */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full rounded-[24px] overflow-hidden shadow-lg bg-neutral-900"
          aria-label="Watch on YouTube"
        >
          {/* Grid of images */}
          <div className={`grid grid-cols-1 ${gridCols}`}>
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-[220px] sm:h-[300px] md:h-[380px] lg:h-[430px]"
              >
                <Image
                  src={img}
                  alt={`Video preview ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 413px"
                />
              </div>
            ))}
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />

          {/* Play Button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center">
                {/* Outer glowing ring */}
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-transform duration-500 group-hover:scale-110" />
                {/* Red YouTube circle */}
                <div className="relative flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#FF0000] shadow-xl transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(255,0,0,0.45)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-5 h-5 md:w-7 md:h-7 ml-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <span className="font-sans text-[13px] md:text-[15px] font-semibold text-white uppercase tracking-wider bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-xs border border-white/10 select-none">
                Watch on YouTube
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
