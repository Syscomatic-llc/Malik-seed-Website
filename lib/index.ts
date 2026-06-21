export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  glow: string;
  /** "left" = text‑left / image‑right, "right" = text‑right / image‑left */
  side: "left" | "right";
  /** Custom top offset for the content card (Figma override) */
  cardTop?: string;
  /** Custom height for the content card (Figma override) */
  cardHeight?: string;
}

export const timelineItems: TimelineItem[] = [
  {
    year: "1962",
    title: "A Vision Begins",
    description:
      "A.R. Malik joined the East Pakistan Agriculture Development Corporation (EPADC), in charge of 5 out of 17 districts.",
    image: "/images/timeline/070.png",
    glow: "/images/timeline/frame_61.png",
    side: "right",
  },
  {
    year: "Mid-1960s",
    title: "The Realization",
    description:
      "During field tours across the 5 districts, \nhe witnesses the struggles of farmers with the lack of access to quality seeds.",
    image: "/images/timeline/image_29.png",
    glow: "/images/timeline/frame_58.png",
    side: "left",
  },
  {
    year: "Late 1960s",
    title: "Introduction to \nWorld-Class Breeders",
    description:
      "Through his work, he connects with the Japanese seed company, Sakata, learning about international quality hybrid seeds.",
    image: "/images/timeline/image_31.png",
    glow: "/images/timeline/frame_61.png",
    side: "right",
  },
  {
    year: "1969",
    title: "Malik Seeds is Founded",
    description:
      "A.R. Malik left his prestigious job to start \na risky business. Malik Seeds is born, the first private seed company in Bangladesh.",
    image: "/images/timeline/image_30.png",
    glow: "/images/timeline/frame_59.png",
    side: "left",
  },
  {
    year: "1970s–1980s",
    title: "Building Trust",
    description:
      "A.R. Malik travels extensively, introducing superior hybrid seed varieties like Atlas-70 Cabbage, and Diamant Potato.",
    image: "/images/timeline/006_1.png",
    glow: "/images/timeline/frame_61.png",
    side: "right",
  },
  {
    year: "1993",
    title: "National Seed Policy",
    description:
      "In 1993, The government approved this policy, allowing private companies to:\n1. Import seeds directly\n2. Register their own varieties\n3. Conduct independent research",
    image: "/images/timeline/001_(1)_1.png",
    glow: "/images/timeline/frame_58.png",
    side: "left",
    cardTop: "top-[45px]",
    cardHeight: "h-[283px]",
  },
  {
    year: "1994",
    title: "Industry Takes Shape",
    description:
      "With the new policy in place, the seed industry matures and A.R. Malik fully transitions to his own independent venture.",
    image: "/images/timeline/005_1.png",
    glow: "/images/timeline/frame_59.png",
    side: "right",
  },
  {
    year: "1997",
    title: "Next-Generation\nLeadership",
    description:
      "Ataus Sopan Malik joins Malik Seeds to look after Sales and Marketing across the entire country.",
    image: "/images/timeline/md_sir_img_1.png",
    glow: "/images/timeline/frame_58.png",
    side: "left",
  },
  {
    year: "Late 1990s–Early 2000s",
    title: "Industry\nInnovation",
    description:
      "Malik Seeds introduces innovations, like:\nUsing aluminum foil packaging to preserve germination rates\nUsing a distributorship model for delivering our seeds to farmers",
    image: "/images/timeline/distributor_picture_1_1.png",
    glow: "/images/timeline/frame_59.png",
    side: "right",
    cardTop: "top-[19px]",
    cardHeight: "h-[336px]",
  },
  {
    year: "2010",
    title: "Establishment of Malik's Farm",
    description:
      "We established an international-standard R&D Farm. The focus is to do research & introduce next generation seed varieties.",
    image: "/images/timeline/malik's_farm_r&d-18_1.png",
    glow: "/images/timeline/frame_58.png",
    side: "left",
  },
  {
    year: "2019",
    title: "50 Years of \nFeeding Bangladesh",
    description:
      "Malik Seeds reflects on five decades of: \nFarmer Empowerment\nHonest Business Practices\nSeed Technology Innovation",
    image: "/images/timeline/field_activities-49_1.png",
    glow: "/images/timeline/frame_59.png",
    side: "right",
  },
  {
    year: "Today",
    title: "Stronger Than Ever",
    description:
      "Today, A.R. Malik's mission lives on through the 200+ talented team members, innovating in the agriculture industry with people and technology.",
    image: "/images/timeline/malik_seeds_team-4_1.png",
    glow: "/images/timeline/frame_58.png",
    side: "left",
  },
];