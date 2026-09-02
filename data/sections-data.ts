export interface HeroSlide {
  src: string;
  alt: string;
}

export interface HeroData {
  slides: HeroSlide[];
  intervalMs: number;
  titleDesktop: string;
  titleMobile: string;
  subtitle: string;
  ctaProducts: {
    label: string;
    href: string;
  };
  ctaAbout: {
    label: string;
    href: string;
  };
  scrollText: string;
}

export interface StatItem {
  prefix: string;
  toValue: number;
  suffix: string;
  label: string;
}

export interface AboutData {
  badge: string;
  introDesktop: {
    highlight: string;
    muted: string;
  };
  introMobile: string;
  cta: {
    label: string;
    href: string;
  };
  stats: StatItem[];
  images: {
    teamBanner: string;
    about1: string;
    about2: string;
    about1Mobile: string;
    about2Mobile: string;
  };
}

export interface ProductItem {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface ProductsData {
  items: ProductItem[];
}

export interface PartnerItem {
  id: number;
  name: string;
  logo_url: string;
}

export interface PartnersData {
  title: string;
  items: PartnerItem[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  quote: string;
  image: string;
}

export interface TestimonialsData {
  badge: string;
  title: string;
  items: TestimonialItem[];
}

export interface NewsArticle {
  id: number;
  slug: string;
  category: string;
  date: string;
  title: string;
  image: string;
}

export interface NewsData {
  badge: string;
  title: string;
  items: NewsArticle[];
}

export interface JoinTeamData {
  badge: string;
  title: string;
  cta: {
    label: string;
    href: string;
  };
  images: {
    desktop: string;
    mobile: string;
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  path: string;
  href: string;
}

export interface FooterData {
  logo: string;
  wordmark: string;
  mission: string;
  followUsText: string;
  links: {
    company: FooterLink[];
    brands: FooterLink[];
  };
  socials: SocialLink[];
  contact: {
    phone: { label: string; href: string };
    email: { label: string; href: string };
  };
}

export const heroData: HeroData = {
  slides: [
    {
      src: "/images/hero/hero-bg.png",
      alt: "hero image 1",
    },
    {
      src: "/images/hero/hero-slide-1.jpg",
      alt: "hero image 2",
    },
    {
      src: "/images/hero/hero-slide-2.jpg",
      alt: "hero image 4",
    },
    {
      src: "/images/hero/hero-slide-3.jpg",
      alt: "hero image 3",
    },
  ],
  intervalMs: 3000,
  titleDesktop: "Helping Farmers Grow\nwith Confidence",
  titleMobile: "Helping Farmers Grow with Confidence",
  subtitle: "Since 1969",
  ctaProducts: {
    label: "Our Products",
    href: "/our-products",
  },
  ctaAbout: {
    label: "Learn More",
    href: "/about",
  },
  scrollText: "Scroll to explore",
};

export const aboutData: AboutData = {
  badge: "About Malik Seeds",
  introDesktop: {
    highlight:
      'Malik Seeds is the pioneer of hybrid vegetable seeds in Bangladesh. We introduce international seed varieties to Bangladeshi farmers. Our history goes back to 1969 when our founder, A. R. Malik launched "Atlas-70" Cabbage from Sakata Seed Corporation, based ',
    muted:
      "in Japan. Today, we are among the most trusted brands in the agriculture industry.",
  },
  introMobile:
    "Malik Seeds is the pioneer of hybrid vegetable seeds in Bangladesh. We introduce international seed varieties to Bangladeshi farmers. Our history...",
  cta: {
    label: "Learn More",
    href: "/about",
  },
  stats: [
    { prefix: "", toValue: 10, suffix: "k+", label: "Seed Varieties Trialed" },
    { prefix: "", toValue: 200, suffix: "", label: "Ton Seeds Distributed" },
    { prefix: "", toValue: 100, suffix: "+", label: "Distributor Network" },
    { prefix: "", toValue: 13, suffix: "+", label: "Agri-Innovation Projects" },
    { prefix: "", toValue: 5, suffix: "+", label: "decades Farming Legacy" },
  ],
  images: {
    teamBanner: "/images/team/team-banner.png",
    about1: "/images/about/about-1.png",
    about2: "/images/about/about-2.png",
    about1Mobile: "/images/about/about-1-mobile.png",
    about2Mobile: "/images/about/about-2-mobile.png",
  },
};

export const productsData: ProductsData = {
  items: [
    {
      id: 1,
      category: "Vegetable Seeds",
      name: "Vegetable Seeds",
      description: "Research-Backed Vegetable Seeds Farmers rely on",
      image: "/images/products/product-1.png",
      href: "/our-brands/vegetable-seeds",
    },
    {
      id: 2,
      category: "Potato Seed",
      name: "Potato Seed",
      description: "Bringing Next-Generation Potato Seeds to Farmers",
      image: "/images/products/product-2.png",
      href: "/our-brands/potato-seeds",
    },
    {
      id: 3,
      category: "Malik’s Farm",
      name: "Malik’s Farm",
      description: "Research and Innovation Hub Behind Malik Seeds",
      image: "/images/products/product-3.png",
      href: "/our-brands/maliks-farm",
    },
    {
      id: 4,
      category: "Origene by Malik",
      name: "Origene by Malik",
      description:
        "Safe Fruits and Vegetables for Health Conscious Urban Consumers",
      image: "/images/products/product-4.png",
      href: "/our-brands/origene",
    },
    {
      id: 5,
      category: "Malik’s Flower",
      name: "Malik’s Flower",
      description:
        "Premium Flower Varieties Bringing Global Genetics to Local Growers",
      image: "/images/products/product-5.png",
      href: "/our-brands/maliks-flower",
    },
    {
      id: 6,
      category: "Innovation & Development",
      name: "Innovation & Development",
      description:
        "Empowering Farmers Through Knowledge, Technology, and Market Access",
      image: "/images/products/product-6.png",
      href: "/our-brands/innovation-development",
    },
  ],
};

export const partnersData: PartnersData = {
  title: "Our Development Partners",
  items: [
    { id: 1, name: "CIMMYT", logo_url: "/images/partners/partner-1.png" },
    { id: 2, name: "IRRI", logo_url: "/images/partners/partner-2.png" },
    { id: 3, name: "PARC", logo_url: "/images/partners/partner-3.png" },
    {
      id: 4,
      name: "Punjab Seed Council",
      logo_url: "/images/partners/partner-4.png",
    },
    {
      id: 5,
      name: "Agri. Univ. Faisalabad",
      logo_url: "/images/partners/partner-5.png",
    },
    { id: 6, name: "NARC", logo_url: "/images/partners/partner-6.png" },
    { id: 7, name: "FAO", logo_url: "/images/partners/partner-7.png" },
    {
      id: 8,
      name: "USAID Agri Program",
      logo_url: "/images/partners/partner-8.png",
    },
    { id: 9, name: "Partner 9", logo_url: "/images/partners/partner-9.png" },
    { id: 10, name: "Partner 10", logo_url: "/images/partners/partner-10.png" },
    { id: 11, name: "Partner 11", logo_url: "/images/partners/partner-11.png" },
    { id: 12, name: "Partner 12", logo_url: "/images/partners/partner-12.png" },
    { id: 13, name: "Partner 13", logo_url: "/images/partners/partner-13.png" },
  ],
};

export const testimonialsData: TestimonialsData = {
  badge: "Success stories",
  title: "Voice of Impact",
  items: [
    {
      id: 1,
      name: "Md. Kobbat Hossain Ovi",
      location: "Maitka, Hemayetpur, Savar",
      quote:
        "After losing his father in 2003, he carried my family through farming and Malik Seeds has been with him all the way. Green Crown variety has a special place in his broccoli project.",
      image: "/images/testimonials/ovi.png",
    },
    {
      id: 2,
      name: "Md. Rafiqul Islam Rafiq",
      location: "Nabagram, Baldhara, Singair",
      quote:
        "22 years abroad, then back to the soil. He learned about companion cropping from our FB page and now farms multiple varieties successfully.",
      image: "/images/testimonials/rafiq-alt.png",
    },
    {
      id: 3,
      name: "Md. Rafiqul Islam Rafiq",
      location: "Nabagram, Baldhara, Singair",
      quote:
        "22 years abroad, then back to the soil. He learned about companion cropping from our FB page and now farms multiple varieties successfully.",
      image: "/images/testimonials/rafiq.png",
    },
    {
      id: 4,
      name: "Md. Jangir Alam",
      location: "Brahmankanda",
      quote:
        "Became talk of the town after harvesting PurpleBeauty in only 60 days, and within 120 days, total production reached 4.5 tons.",
      image: "/images/testimonials/jangir.png",
    },
    {
      id: 5,
      name: "Md. Saiful Islam",
      location: "Sakrail, Garpara, Sadar, Manikganj",
      quote:
        "Ex-electrician turned farmer. In 2021, I bet 1.3 lakh on Malik Seeds' Ice Green cucumber and walked away with 3.0 lakh revenue.",
      image: "/images/testimonials/saiful-1.png",
    },
  ],
};

export const newsData: NewsData = {
  badge: "News & Stories",
  title: "Insights from agricultural research & field experts",
  items: [
    {
      id: 1,
      slug: "achieving-global-gap-certification",
      category: "Climate",
      date: "SEP 12, 2024",
      title:
        "Strengthening Climate-Resilient Farming Through Hybrid Innovation",
      image: "/images/news/news-1.png",
    },
    {
      id: 2,
      slug: "new-hybrid-cabbage-variety-shows-strong-performance",
      category: "Commercial Growers",
      date: "JUN 18, 2024",
      title: "Introducing High-Yield Pumpkin Variety for Commercial Growers",
      image: "/images/news/news-2.png",
    },
    {
      id: 3,
      slug: "strengthening-seed-research-through-global-collaboration",
      category: "",
      date: "AUG 03, 2024",
      title: "Expanding Farmer Training Programs Across Northern Regions",
      image: "/images/news/news-3.png",
    },
    {
      id: 4,
      slug: "from-trial-plot-to-market-success",
      category: "Climate",
      date: "SEP 12, 2024",
      title:
        "Strengthening Climate-Resilient Farming Through Hybrid Innovation",
      image: "/images/news/news-1.png",
    },
    {
      id: 5,
      slug: "using-data-and-field-insights-to-improve-seed-selection",
      category: "Commercial Growers",
      date: "JUN 18, 2024",
      title: "Introducing High-Yield Pumpkin Variety for Commercial Growers",
      image: "/images/news/news-2.png",
    },
    {
      id: 6,
      slug: "supporting-local-farming-communities",
      category: "",
      date: "AUG 03, 2024",
      title: "Expanding Farmer Training Programs Across Northern Regions",
      image: "/images/news/news-3.png",
    },
  ],
};

export const joinTeamData: JoinTeamData = {
  badge: "Join our Team",
  title: "Shape the Future\nof Agriculture\nwith Malik Seeds",
  cta: {
    label: "Join Today",
    href: "/careers",
  },
  images: {
    desktop: "/images/about/join-team.png",
    mobile: "/images/about/join-team.png",
  },
};

export const footerData: FooterData = {
  logo: "/images/brand/logo.svg",
  wordmark: "/images/brand/logo-footer.svg",
  mission:
    "We are committed to deliver high-performance hybrid seed varieties that empower farmers with better yield, climate resilience, disease resistance, and profitability.",
  followUsText: "Follow us on",
  links: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Products", href: "/our-products" },
      { label: "News & Stories", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
    brands: [
      { label: "Vegetable Seeds", href: "/our-brands/vegetable-seeds" },
      { label: "Potato Seeds", href: "/our-brands/potato-seeds" },
      { label: "Malik's Farm", href: "/our-brands/maliks-farm" },
      { label: "Origene by Malik", href: "/our-brands/origene" },
      { label: "Malik's Flower", href: "/our-brands/maliks-flower" },
      {
        label: "Innovation & Development",
        href: "/our-brands/innovation-development",
      },
    ],
  },
  socials: [
    {
      label: "Facebook",
      path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      href: "https://facebook.com",
    },
    {
      label: "YouTube",
      path: "M22.54 6.42a2.78 2.78 0 0 0-1.96-1.96C18.88 4 12 4 12 4s-6.88 0-8.58.46a2.78 2.78 0 0 0-1.96 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 0 0 1.96 1.96C5.12 20 12 20 12 20s6.88 0 8.58-.46a2.78 2.78 0 0 0 1.96-1.96C23 15.88 23 12 23 12s0-3.88-.46-5.58ZM10 15.5v-7l6 3.5-6 3.5Z",
      href: "https://youtube.com",
    },
    {
      label: "LinkedIn",
      path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
      href: "https://linkedin.com",
    },
  ],
  contact: {
    phone: { label: "+44 01929 739037", href: "tel:+4401929739037" },
    email: {
      label: "support@armalikseeds.com",
      href: "mailto:support@armalikseeds.com",
    },
  },
};

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
