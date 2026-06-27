import { BrandPageData } from "@/data/brands-data";
import BrandHero from "@/components/sections/brand/BrandHero";
import BrandIntro from "@/components/sections/brand/BrandIntro";
import BrandGrid from "@/components/sections/brand/BrandGrid";
import BrandProcess from "@/components/sections/brand/BrandProcess";
import BrandCards from "@/components/sections/brand/BrandCards";
import BrandSplit from "@/components/sections/brand/BrandSplit";
import BrandYouTube from "@/components/sections/brand/BrandYouTube";
import BrandProjectsTable from "@/components/sections/brand/BrandProjectsTable";
import BrandTraining from "@/components/sections/brand/BrandTraining";
import BrandFlowerPortfolio from "@/components/sections/brand/BrandFlowerPortfolio";
import BrandCropPortfolio from "@/components/sections/brand/BrandCropPortfolio";

interface BrandDetailTemplateProps {
  brand: BrandPageData;
}

export default function BrandDetailTemplate({ brand }: BrandDetailTemplateProps) {
  return (
    <div className="bg-[#F2F7F1] min-h-screen">
      {/* Brand Hero */}
      <BrandHero title={brand.hero.title} bgImage={brand.hero.bgImage} />

      {/* Brand Intro */}
      <BrandIntro
        layout={brand.intro.layout}
        title={brand.intro.title}
        description={brand.intro.description}
        highlights={brand.intro.highlights}
        stats={brand.intro.stats}
      />

      {/* Dynamic Sections */}
      {brand.sections.map((section, idx) => {
        switch (section.type) {
          case "grid":
            return (
              <BrandGrid
                key={idx}
                badge={section.badge}
                title={section.title}
                description={section.description}
                images={section.images}
              />
            );
          case "process":
            return (
              <BrandProcess
                key={idx}
                badge={section.badge}
                title={section.title}
                description={section.description}
                steps={section.steps}
                images={section.images}
                bottomQuote={section.bottomQuote}
              />
            );
          case "cards":
            return (
              <BrandCards
                key={idx}
                badge={section.badge}
                title={section.title}
                description={section.description}
                cards={section.cards}
              />
            );
          case "split":
            return (
              <BrandSplit
                key={idx}
                badge={section.badge}
                title={section.title}
                description={section.description}
                bullets={section.bullets}
                statCard={section.statCard}
                bottomHighlight={section.bottomHighlight}
                image={section.image}
                bgTheme={section.bgTheme}
              />
            );
          case "youtube":
            return (
              <BrandYouTube
                key={idx}
                title={section.title}
                youtubeUrl={section.youtubeUrl}
                images={section.images}
              />
            );
          case "projects-table":
            return <BrandProjectsTable key={idx} />;
          case "training-centre":
            return <BrandTraining key={idx} />;
          case "flower-portfolio":
            return <BrandFlowerPortfolio key={idx} />;
          case "crop-portfolio":
            return <BrandCropPortfolio key={idx} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
