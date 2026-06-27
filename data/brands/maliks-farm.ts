export const maliksFarmData = {
  meta: {
    title: "Malik's Farm — Malik Seeds",
    description: "Research & Development Farm in northern Bangladesh. The scientific hub evaluating seed varieties and providing Global GAP certified agricultural training.",
  },
  hero: {
    title: "MALIK’S\nFARM",
    bgImage: "/images/brand/maliks_farm_rd_1_9.png",
  },
  intro: {
    layout: "text-stats" as const,
    title: ["reaching the field.\n", "Where every seed variety proves itself before"],
    description: "Our research and development farm in northern Bangladesh is the scientific backbone behind every seed Malik Seeds recommends. If a variety doesn't perform here, it never reaches a farmer.",
    stats: [
      { value: "40+", label: "acres total farm area" },
      { value: "21", label: "acres dedicated trial area" },
      { value: "8+", label: "r&D personnel on site" },
      { value: "3x", label: "Product Evaluation/year" },
    ],
  },
  split1: {
    badge: "THE FARM",
    title: "Innovation Hub of our Organization",
    description: "Malik's Farm is positioned in a prime agro-climatic zone of northern Bangladesh, well-suited to year-round variety evaluation. We have the privilege of working with a select group of world-class seed principals like Sakata Seed Corporation, BASF | Nunhems, Agrico Netherlands, etc.",
    image: "/images/brand/maliks_farm_new_6_1.png",
    bgTheme: "light" as const,
  },
  process: {
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
  split2: {
    badge: "COMMERCIAL FARMING",
    title: "Malik’s Farm is Bangladesh's first Global GAP Certified Farm",
    description: "Good Agricultural Practices (GAP) is a globally recognized certification that ensures vegetables are grown using responsible, science-backed farming methods reducing harmful chemical use and guaranteeing food safety from the farm all the way to your plate.\n\nMalik's Farm holds Global GAP certification across our full commercial farming operation.",
    image: "/images/brand/dscf8753_1.png",
    bullets: [
      "What we grow:",
      "Vegetables: Broccoli, Capsicum, Tomato, Cauliflower, Cabbage, Melon, Okra, Papaya, Eggplant, Yard Long Bean, Potato, Cucumber, Pumpkin, Beet Root, Carrot, and more...",
      "Fruits: Avocado, Mango",
    ],
    bgTheme: "light" as const,
  },
};
