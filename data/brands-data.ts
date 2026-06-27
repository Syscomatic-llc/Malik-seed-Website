export type BrandIntroLayout = "text-only" | "text-tags" | "text-stats" | "text-tags-stats";

export interface BrandPageData {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    bgImage: string;
  };
  intro: {
    layout: BrandIntroLayout;
    title: string[];
    description: string;
    highlights?: string[];
    stats?: { value: string; label: string }[];
  };
  sections: Array<
    | {
        type: "grid";
        badge: string;
        title: string;
        description: string;
        images: string[];
      }
    | {
        type: "process";
        badge: string;
        title: string;
        description: string;
        steps: { number: string; title: string; description: string }[];
        images?: string[];
        bottomQuote?: string;
      }
    | {
        type: "cards";
        badge: string;
        title: string;
        description?: string;
        cards: { title: string; description: string }[];
      }
    | {
        type: "split";
        badge: string;
        title: string;
        description: string;
        bullets?: string[];
        statCard?: { value: string; label: string };
        bottomHighlight?: string;
        image: string;
        bgTheme?: "dark" | "light";
      }
    | {
        type: "youtube";
        title: string;
        youtubeUrl: string;
        images: string[];
      }
    | {
        type: "projects-table";
      }
    | {
        type: "training-centre";
      }
    | {
        type: "flower-portfolio";
      }
    | {
        type: "crop-portfolio";
      }
  >;
}

export const BRANDS_DATA: Record<string, BrandPageData> = {
  "vegetable-seeds": {
    slug: "vegetable-seeds",
    meta: {
      title: "Vegetable Seeds — Malik Seeds",
      description: "Seeds built for Bangladesh's farmers. Over half a century of delivering high-yielding, disease-resistant hybrid vegetable varieties.",
    },
    hero: {
      title: "vegetable\nseeds",
      bgImage: "/images/brand/image_27.png",
    },
    intro: {
      layout: "text-tags",
      title: ["Bangladesh's farmers.\n", "Seeds built for"],
      description: "For over half a century, we've worked alongside farmers to bring better seeds to Bangladesh's fields—higher yields, stronger resistance, and varieties proven in local conditions.",
      highlights: ["Climate Resilient", "Disease Resistant", "High Yielding"],
    },
    sections: [
      {
        type: "grid",
        badge: "WITH OUR FARMERS",
        title: "Built for the farmers who grow them.",
        description: "Every variety we release is tested, proven, and trusted by the farmers who plant it.",
        images: [
          "/images/brand/06_2.png",
          "/images/brand/image.png",
          "/images/brand/farmers_3_1.png",
        ],
      },
      {
        type: "cards",
        badge: "WHAT WE BREED FOR",
        title: "Three qualities. Every variety.",
        description: "Our portfolio is selected for three qualities that matter most to Bangladesh's farmers.",
        cards: [
          {
            title: "Climate Resilient",
            description: "Our varieties are selected and tested across Bangladesh's diverse agro-climatic zones from summer heat to monsoon conditions.",
          },
          {
            title: "Disease Resistant",
            description: "Our seed portfolio prioritises varieties with strong natural resistance to the most common and damaging diseases in Bangladesh.",
          },
          {
            title: "High Yielding",
            description: "Our varieties produce more—more fruits per plant, more harvests per season. Every hybrid is trialled specifically for superior yield output.",
          },
        ],
      },
      {
        type: "crop-portfolio",
      },
      {
        type: "youtube",
        title: "OUR HERITAGE: Over half a century in the field",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        images: [
          "/images/brand/field_activities_9_1.png",
          "/images/brand/field_activities_5_1.png",
        ],
      },
    ],
  },
  "potato-seed": {
    slug: "potato-seed",
    meta: {
      title: "Potato Seeds — Malik Seeds",
      description: "Certified potato seed varieties selected for superior adaptability, disease resistance, and outstanding field performance.",
    },
    hero: {
      title: "Potato\nseeds",
      bgImage: "/images/brand/malik_potato_4.png",
    },
    intro: {
      layout: "text-tags",
      title: ["Potato seeds", "built for real field conditions"],
      description: "Next-generation potato varieties developed for resilience, strong yields, and dependable performance selected through global partnerships and rigorous local trials.",
      highlights: ["Disease-Resistant", "European Genetics", "Processing & Export Quality"],
    },
    sections: [
      {
        type: "grid",
        badge: "Varieties",
        title: "Carefully selected varieties developed through global partnerships",
        description: "For decades, Malik Seeds has collaborated closely with its long-term principal Agrico from the Netherlands, introducing high-quality potato varieties tailored to the needs of local farmers.",
        images: [
          "/images/brand/malik_potato_10_1.png",
          "/images/brand/malik_potato_9.png",
          "/images/brand/dscf7428.png",
        ],
      },
      {
        type: "split",
        badge: "POTATO PORTFOLIO",
        title: "Bangladesh's trusted potato seed portfolio",
        description: "For decades, Malik Seeds has collaborated closely with its long-term principal Agrico from the Netherlands, introducing high-quality potato varieties tailored to the needs of local farmers.\n\nOur carefully selected varieties are optimized for three key sectors: Table, Processing, and Export. From soil to shipment, we ensure excellence in every tuber.\n\nOur approach ensures farmers receive potato seeds that deliver consistent yields, strong disease resistance, and reliable market performance.",
        image: "/images/brand/malik_potato_7_2_1.png",
        bgTheme: "dark",
      },
      {
        type: "cards",
        badge: "WHY OUR POTATO SEEDS",
        title: "Three reasons farmers plant Malik Seeds potato",
        cards: [
          {
            title: "Disease-Resistant Varieties",
            description: "Our varieties prioritize resistance to major diseases particularly late blight, reducing crop loss and minimizing chemical treatments.",
          },
          {
            title: "Advanced European Genetics",
            description: "Through our multi-decade partnership with Agrico from the Netherlands, Malik Seeds introduces Next-Gen varieties.",
          },
          {
            title: "Field-Tested Performance",
            description: "Every potato variety undergoes rigorous local field trials across multiple regions to ensure stable yields and reliable performance.",
          },
        ],
      },
      {
        type: "youtube",
        title: "Serving 3 sectors: 1. Table, Processing, & 3. Export",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        images: [
          "/images/brand/dscf7469_1.png",
          "/images/brand/dscf7450_1.png",
          "/images/brand/agrico_potato_1.png",
        ],
      },
    ],
  },
  "maliks-farm": {
    slug: "maliks-farm",
    meta: {
      title: "Malik's Farm — Malik Seeds",
      description: "Research & Development Farm in northern Bangladesh. The scientific hub evaluating seed varieties and providing Global GAP certified agricultural training.",
    },
    hero: {
      title: "MALIK’S\nFARM",
      bgImage: "/images/brand/maliks_farm_rd_1_9.png",
    },
    intro: {
      layout: "text-stats",
      title: [ "reaching the field.\n", "Where every seed variety proves itself before"],
      description: "Our research and development farm in northern Bangladesh is the scientific backbone behind every seed Malik Seeds recommends. If a variety doesn't perform here, it never reaches a farmer.",
      stats: [
        { value: "40+", label: "acres total farm area" },
        { value: "21", label: "acres dedicated trial area" },
        { value: "8+", label: "r&D personnel on site" },
        { value: "3x", label: "Product Evaluation/year" },
      ],
    },
    sections: [
      {
        type: "split",
        badge: "THE FARM",
        title: "Innovation Hub of our Organization",
        description: "Malik's Farm is positioned in a prime agro-climatic zone of northern Bangladesh, well-suited to year-round variety evaluation. We have the privilege of working with a select group of world-class seed principals like Sakata Seed Corporation, BASF | Nunhems, Agrico Netherlands, etc.",
        image: "/images/brand/maliks_farm_new_6_1.png",
        bgTheme: "light",
      },
      {
        type: "process",
        badge: "Our research & trialling process",
        title: "A rigorous, multi-season evaluation before any variety reaches our farmers.",
        description: "A recommendation from Malik Seeds is backed by evidence. Every variety enters a defined evaluation pipeline that runs across multiple growing seasons under real Bangladeshi agro-climatic conditions.",
        steps: [
          {
            number: "1",
            title: "Year-round structured field trials",
            description: "Our R&D team evaluates each variety through the growing cycle tracking physiological features, fruit bearing, disease tolerance, yield output, and adaptability.",
          },
          {
            number: "2",
            title: "Product Evaluation",
            description: "During harvest season, performance data is studied against evaluation parameters like disease resistance, fruit bearing, uniformity, shape, etc.",
          },
          {
            number: "3",
            title: "Market evaluation with customers",
            description: "Shortlisted varieties are also evaluated alongside our marketing team and key customers assessing market viability, commercial appeal, and grower suitability.",
          },
          {
            number: "4",
            title: "Multi-location trial & portfolio release",
            description: "Varieties that pass joint evaluation are advanced to multi-location trials across different zones. Only consistent top performers are released into the Malik Seeds portfolio.",
          },
        ],
        images: [
          "/images/brand/maliks_farm_rd_12_1.png",
          "/images/brand/maliks_farm_rd_62_1.png",
        ],
      },
      {
        type: "split",
        badge: "COMMERCIAL FARMING",
        title: "Malik’s Farm is Bangladesh's first Global GAP Certified Farm",
        description: "Good Agricultural Practices (GAP) is a globally recognized certification that ensures vegetables are grown using responsible, science-backed farming methods reducing harmful chemical use and guaranteeing food safety from the farm all the way to your plate.\n\nMalik's Farm holds Global GAP certification across our full commercial farming operation.",
        image: "/images/brand/dscf8753_1.png",
        bullets: [
          "What we grow:",
          "Vegetables: Broccoli, Capsicum, Tomato, Cauliflower, Cabbage, Melon, Okra, Papaya, Eggplant, Yard Long Bean, Potato, Cucumber, Pumpkin, Beet Root, Carrot, and more...",
          "Fruits: Avocado, Mango",
        ],
        bgTheme: "light",
      },
      {
        type: "training-centre",
      },
    ],
  },
  origene: {
    slug: "origene",
    meta: {
      title: "Origene by Malik — Malik Seeds",
      description: "Safe, nutritious vegetables with full field-to-fork traceability and Global GAP certified farm sourcing.",
    },
    hero: {
      title: "Origene\nBy Malik",
      bgImage: "/images/brand/planted_10_1.png",
    },
    intro: {
      layout: "text-only",
      title: ["It should be the standard.\n", "Safe food isn't a luxury."],
      description: "Origene by Malik is the modern vegetable brand built on a simple belief: families deserve to know exactly where their food comes from and trust every step behind it. We're not just selling vegetables. We're proving traceability.",
    },
    sections: [
      {
        type: "grid",
        badge: "FROM OUR FIELDS",
        title: "Certified farms across Bangladesh",
        description: "A network of smallholder farmers each individually verified, each growing with no shortcuts.",
        images: [
          "/images/brand/r&d_activities_02_1.png",
          "/images/brand/dscf8733_1.png",
          "/images/brand/dscf8708_1.png",
        ],
      },
      {
        type: "split",
        badge: "THE PROBLEM WE'RE SOLVING",
        title: "Bangladesh has food safety laws. It doesn't have food safety in practice.",
        description: "Bangladesh has food safety laws. The Bangladesh Food Safety Authority has the mandate. But enforcement is limited, the supply chain lacks transparency, and the gap between what the law requires and what actually reaches your table is vast.\n\nPlanted by Malik exists to close that gap. Not with promises. With certification, lab testing, and a supply chain that has nothing to hide.",
        statCard: {
          value: "30 - 50%",
          label: "vegetables tested in Dhaka markets contain excess pesticide residue."
        },
        image: "/images/brand/karwan_bazar_1.png",
        bgTheme: "dark",
      },
      {
        type: "process",
        badge: "HOW WE'RE SOLVING IT",
        title: "A completely transparent supply chain missing in the market until now",
        description: "Planted by Malik establishes traceability from certified farms to the final consumer pack, ensuring laboratory validation and complete cold chain security.",
        steps: [
          {
            number: "1",
            title: "Sourced from certified farmers",
            description: "Every farmer is individually verified and audited. All inputs (seeds, fertilizer, pesticides) are digitally recorded at the farm.",
          },
          {
            number: "2",
            title: "Batched & traced at collection",
            description: "Harvests are batched and traced at collection. Every pack ties back to the exact farm it came from.",
          },
          {
            number: "3",
            title: "Processed & lab-tested",
            description: "At our Gobindaganj plant, vegetables are cleaned, graded, and packaged. Every batch is lab-tested for pesticide residue before shipping.",
          },
          {
            number: "4",
            title: "Distributed under full cold chain",
            description: "A managed cold chain holds quality from warehouse to table. Every pack carries a verifiable record of its journey.",
          },
        ],
        bottomQuote: "Farm to fork. Certified at every step. Nothing hidden.",
      },
      {
        type: "process",
        badge: "BEHIND THE PROCESS",
        title: "From certified sources to our processing plant",
        description: "A look inside the work that makes every claim verifiable.",
        steps: [],
        images: [
          "/images/brand/dscf8661_1.png",
          "/images/brand/planted_04_1.png",
        ],
      },
      {
        type: "split",
        badge: "OUR MISSION",
        title: "Safe, nutritious vegetables for families. Dignity for the farmers who grow them.",
        description: "We exist to make safe, nutritious vegetables accessible for families and to restore dignity to the farmers who grow them.\n\nAnyone can write the word “safe” on a label. Planted by Malik is the only brand that can take you to the farm, show you the certification, and let you see for yourself.",
        bottomHighlight: "\"Safe fruits and vegetables, verified from the field.\"",
        image: "/images/brand/planted_10_2.png",
        bgTheme: "dark",
      },
    ],
  },
  "maliks-flower": {
    slug: "maliks-flower",
    meta: {
      title: "Malik's Flower — Malik Seeds",
      description: "Premium global flower genetics selected for vibrant color, longevity, and adaptability to Bangladesh's climate.",
    },
    hero: {
      title: "MALIK’S\nFlowers",
      bgImage: "/images/brand/002_1.png",
    },
    intro: {
      layout: "text-tags",
      title: ["Premium global flower varieties","for Bangladesh's growing market"],
      description: "We source from the world’s leading flower seed breeders and bring trial-proven, high-performance varieties to growers across Bangladesh backed by hands-on technical support at every stage.",
      highlights: ["Cut Flower", "Bedding Flower", "Pot Flower"],
    },
    sections: [
      {
        type: "process",
        badge: "What We Do for Growers",
        title: "We go beyond flower seeds—we support the entire floriculture cycle",
        description: "Our mission is to help growers achieve premium market quality and optimize yield through complete support.",
        steps: [
          {
            number: "1",
            title: "Variety sourcing",
            description: "Global genetics, locally trialed. We source from the world’s leading breeders evaluating for germination rate, color, stem strength, and local climate adaptability.",
          },
          {
            number: "2",
            title: "Technical support",
            description: "On-site floriculture support. Our team offers practical field-level guidance to flower growers, including planting schedules and crop care.",
          },
          {
            number: "3",
            title: "Post-harvest",
            description: "Developing post-harvest technologies. We introduce advanced post-harvest solutions that reduce losses, extend flower freshness, and help grower prosperity.",
          },
        ],
      },
      {
        type: "grid",
        badge: "FROM TRIAL BEDS",
        title: "From our trial beds to your fields",
        description: "We test and prove every variety under local conditions before recommending it.",
        images: [
          "/images/brand/dscf7210.png",
          "/images/brand/dscf7401.png",
          "/images/brand/dscf7207_1.png",
        ],
      },
      {
        type: "flower-portfolio",
      },
      {
        type: "split",
        badge: "SEED INNOVATION",
        title: "Bangladesh's flower seed industry is blooming",
        description: "Urban demand is rising, export markets are opening up, and nursery culture is taking root across the country. Malik’s Flower exists to put the right seeds and the knowledge to grow them in the hands of every Bangladeshi grower ready to compete on a bigger stage.",
        image: "/images/brand/dscf7383.png",
        bgTheme: "light",
      },
    ],
  },
  "innovation-development": {
    slug: "innovation-development",
    meta: {
      title: "Innovation & Development — Malik Seeds",
      description: "Developing the horticulture sector and strengthening farmers' economic empowerment through climate-smart agriculture and value chain projects.",
    },
    hero: {
      title: "Innovation & Development",
      bgImage: "/images/brand/dscf8693_1.png",
    },
    intro: {
      layout: "text-tags-stats",
      title: ["Seeds are just the start.", "The systems around them decide the outcome."],
      description: "Farmers need more than seeds. They need skills, technology, efficient post-harvest handling, and fair market access to build a sustainable income. Malik Seeds’ Innovation and Development Division exists to deliver all of that.",
      stats: [
        { value: "13+", label: "Projects implemented & ongoing" },
        { value: "4", label: "Strategic Focus Area" },
        { value: "10+", label: "Donor & partner organizations" },
        { value: "9+", label: "Districts across bangladesh" },
      ],
      highlights: ["Climate-Smart", "Agricultural Value Chain", "Global GAP Safe Food", "Next-Gen Seeds"],
    },
    sections: [
      {
        type: "split",
        badge: "WHAT WE DO",
        title: "Designing, funding, and delivering the work that moves outcomes forward",
        description: "Innovation & Development department develops the horticulture sector and strengthens farmers' economic empowerment. We identify and scale innovative technologies, design and implement development projects, and address emerging agricultural challenges while leveraging future growth opportunities.\n\nThe team leads both donor-funded and internal initiatives. Through climate-smart practices, energy-efficient systems, and renewable solutions, we contribute to resource-efficient and environmentally responsible agriculture. Through capacity development, market infrastructure support, and community-centered work, we strengthen the resilience of farmers and the systems they depend on.",
        image: "/images/brand/dscf8705_1.png",
        bgTheme: "light",
      },
      {
        type: "grid",
        badge: "ON THE GROUND",
        title: "Where the work happens",
        description: "Direct field-level intervention in remote and climate-vulnerable regions.",
        images: [
          "/images/brand/0006_1.png",
          "/images/brand/dsc_4399.png",
        ],
      },
      {
        type: "cards",
        badge: "KEY STRATEGIC AREAS",
        title: "Four focus areas driving our work",
        cards: [
          {
            title: "Climate Change Adaptation & Green Growth",
            description: "We promote climate-smart agriculture, low-carbon solutions, and renewable energy adoption to enhance resilience and resource efficiency.",
          },
          {
            title: "Agricultural Value Chain Enhancement",
            description: "Strengthens market linkages and develops efficient storage, cold chain, and transportation systems to reduce losses and maintain product quality.",
          },
          {
            title: "Safe Food Production & Capacity Development",
            description: "Advances GAP-based safe food production, certification, and stakeholder training to ensure quality, compliance, and sustainability.",
          },
          {
            title: "Next-Generation Seed Promotion",
            description: "Introduces and demonstrates climate-resilient, high-yielding seed varieties to improve productivity and the adoption of new technologies.",
          },
        ],
      },
      {
        type: "projects-table",
      },
      {
        type: "split",
        badge: "PARTNERSHIPS",
        title: "Built on partnerships that go the distance",
        description: "We work with leading international development agencies, national research centers, and private sector leaders to scale agricultural innovation across Bangladesh.",
        image: "/images/brand/dscf8616_1.png",
        bgTheme: "dark",
      },
    ],
  },
};
