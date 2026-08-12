// ─── Career Page Data ───────────────────────────────────────────────────────
// Extracted from Figma node 2424:13740 "Hiring" frame

// ── Section 1: Hero ─────────────────────────────────────────────────────────
export const careerHeroData = {
  badge: "Join Our Mission",
  titleLine1: "Come build ",
  titleLine2: [
    "the future of agriculture",
    "systems for safe food",
    "confidence for farmers",
  ],
  titleLine3: "with us",
  ctaPrimary: {
    label: "View Open Positions",
    href: "/careers/open-positions",
  },
  ctaSecondary: {
    label: "Life at Malik Seeds",
    href: "https://www.facebook.com/LifeAtMalikSeeds/",
  },
  teamImage: "/images/careers/Malik Seeds Team.png",
};

// ── Section 2: Talent Standards ─────────────────────────────────────────────
export interface TalentStandard {
  number: number;
  title: string;
  description: string;
  dark?: boolean;
}

export const talentStandardsData = {
  badge: "The Standards We Work by",
  title: "Talent Standards",
  standards: [
    {
      number: 1,
      title: "Growth Mindset",
      description: "Always learning, always improving.",
      dark: false,
    },
    {
      number: 2,
      title: "Honesty & Integrity",
      description: "Clear, honest, and consistent everyday",
      dark: true,
    },
    {
      number: 3,
      title: "Take Ownership",
      description: "Own your work, own your environment",
      dark: false,
    },
    {
      number: 4,
      title: "Team Collaboration",
      description: "We win together or we don't win.",
      dark: false,
    },
    {
      number: 5,
      title: "Deliver Results",
      description: "Focus on the signal, not the noise.",
      dark: false,
    },
  ] as TalentStandard[],
};

// ── Section 3: It's Your Turn (Manifesto) ───────────────────────────────────
export const careerManifestoData = {
  badge: "CAREERS",
  subtitle: "It's Your Turn",
  paragraphs: [
    `At Malik Seeds, we are assembling a team of builders, people with "High Agency". If you don't know what a High-Agency person is, Google it.`,
    `High Agency people don't wait for a map, they build the road. They don't accept default processes - they create smarter systems, and take on every challenge with Ownership.`,
    `We are recruiting self-motivated individuals who view their work not as a job description, but as a vehicle for Delivering Results and Collaborate in High-Performance Teams.`,
    `If you are the type of person who has a Growth Mindset, and has the Honesty & Integrity to lead from the front, then we want you on this team.`,
    `People with these qualities have the freedom to shape how we operate. It's your turn.`,
  ],
  cta: {
    label: "View Open Positions",
    href: "/careers/open-positions",
  },
};

// ── Section 4: Open Positions ────────────────────────────────────────────────
export interface JobPosition {
  id: number;
  slug?: string;
  is_active?: boolean;
  title: string;
  description: string;
  tags: string[];
  salary?: string;
  salaryNote?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  deadline?: string;
  fullDescription?: string;
  whatYoullDo?: string[];
  whatWereLookingFor?: string[];
  skillsAndCompetencies?: string[];
  whyJoin?: string[];
  benefitsList?: { text: string; icon: string }[];
  detailsPdfUrl?: string;
  sort_order?: number;
}

export const openPositionsData = {
  badge: "Open Positions",
  title: "Career Opportunities at Malik Seeds",
  positions: [
    {
      id: 1,
      slug: "senior-agronomist",
      title: "Senior Agronomist",
      description: "Experienced Agronomist to lead crop performance trials.",
      tags: ["Onsite", "Full time", "Bogura"],
      salary: "90,000TK – 150,000TK",
      salaryNote: "(On-target earnings; base + commission)",
      location: "Bogura",
      jobType: "Full-time",
      experience: "Senior Level",
      deadline: "31 Aug 2026",
      fullDescription:
        "A R Malik Seeds is seeking a Senior Agronomist to lead multi-location crop performance trials and support the development of high-yield, climate-resilient varieties. This role plays a critical part in ensuring our seed products meet the highest standards of quality, adaptability, and farmer satisfaction.",
      whatYoullDo: [
        "Design and supervise multi-location crop trials",
        "Analyze agronomic performance data including yield, disease resistance, and adaptability",
        "Develop crop management guidelines for new varieties",
        "Train field development officers and dealer partners",
        "Monitor seasonal crop performance and provide improvement recommendations",
        "Support new product launches with technical expertise",
        "Prepare research reports and technical documentation",
      ],
      whatWereLookingFor: [
        "BSc / MSc in Agriculture, Agronomy, or related field",
        "Minimum 5 years of hands-on field experience",
        "Strong understanding of vegetable crop production systems",
        "Experience in hybrid trials and performance evaluation",
        "Data analysis and reporting skills",
        "Willingness to travel to field locations regularly",
      ],
      skillsAndCompetencies: [
        "Strong problem-solving and analytical mindset",
        "Leadership and team coordination skills",
        "Effective communication with farmers and technical teams",
        "Ability to work in dynamic field conditions",
        "Detail-oriented and quality-focused",
      ],
      whyJoin: [
        "Work in a research-driven agricultural environment",
        "Contribute directly to farmer productivity and food security",
        "Opportunities for leadership and professional growth",
        "Collaborative and mission-focused team culture",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
    {
      id: 2,
      title: "Field Development Officer",
      description:
        "Ensure proper seed usage, field demonstrations, and crop performance monitoring.",
      tags: ["Onsite", "Full time", "Bogura"],
      salary: "45,000TK – 75,000TK",
      salaryNote: "(Base salary + performance-based incentives)",
      location: "Bogura",
      jobType: "Full-time",
      experience: "Mid Level (2-3 years)",
      deadline: "15 Sep 2026",
      fullDescription:
        "We are looking for a dedicated Field Development Officer to conduct field demonstrations, provide agronomic support to farmers, and establish strong relationships with key stakeholders in Bogura region. You will act as the direct link between our research team and the farming community, driving seed adoption and crop success.",
      whatYoullDo: [
        "Organize and conduct farmer training sessions and crop demonstrations",
        "Provide direct on-field technical support and seed usage guidelines to local farmers",
        "Collect and report field performance data of various seed varieties",
        "Build and maintain strong networks with dealers, retailers, and local communities",
        "Identify crop diseases or field challenges and recommend timely solutions",
        "Organize local promotional activities and field days to showcase crop yields",
      ],
      whatWereLookingFor: [
        "Diploma or Bachelor's degree in Agriculture or related field",
        "2 to 4 years of field experience in seed or fertilizer distribution",
        "Good knowledge of local crops, soil types, and seasonal cycles in Bangladesh",
        "Outstanding communication and interpersonal skills in local dialects",
        "Ability to ride a motorcycle and possession of a valid driving license",
      ],
      skillsAndCompetencies: [
        "Practical problem-solving on the field",
        "High empathy and patience when working with smallholder farmers",
        "Strong presentation and public speaking skills",
        "Proactive work ethic and self-discipline",
      ],
      whyJoin: [
        "Make a tangible difference in the lives of farming families",
        "Travel extensively and gain rich on-ground agricultural insights",
        "Clear career progression paths into sales management or research coordination",
        "Performance-driven rewarding culture",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
    {
      id: 3,
      title: "Seed Production Manager",
      description:
        "Lead seed production programs ensuring quality, purity, and timely supply.",
      tags: ["Onsite", "Full time", "Rangpur"],
      salary: "100,000TK – 160,000TK",
      salaryNote: "(Commensurate with experience)",
      location: "Rangpur",
      jobType: "Full-time",
      experience: "Managerial Level (6+ years)",
      deadline: "30 Sep 2026",
      fullDescription:
        "The Seed Production Manager will oversee our seed multiplication program, managing contracted farmers and production facilities in Rangpur. You will ensure seed production meets strict genetic purity, physical quality, and volume targets, securing our supply chain.",
      whatYoullDo: [
        "Plan and execute seasonal seed production and multiplication schedules",
        "Recruit, contract, and manage grower networks in key agricultural zones",
        "Monitor field isolation, rouging, and crop health to prevent contamination",
        "Oversee post-harvest seed extraction, drying, processing, and packaging",
        "Manage budgets, inventory, and supply forecast for production cycles",
        "Implement and enforce standard operating procedures for quality assurance",
      ],
      whatWereLookingFor: [
        "BSc / MSc in Agronomy, Seed Science, or related agricultural discipline",
        "6+ years of direct experience in seed production, preferably with vegetable crops",
        "In-depth understanding of seed certification standards and crop biology",
        "Proven experience managing grower groups or contract farming networks",
        "Strong analytical and negotiation capabilities",
      ],
      skillsAndCompetencies: [
        "Operations and logistics management",
        "Team leadership and negotiation skills",
        "High attention to genetic and physical quality details",
        "Resilience under peak seasonal pressure",
      ],
      whyJoin: [
        "Play a pivotal role in ensuring seed security for the nation",
        "Direct influence over production quality and volume scale",
        "Access to modern seed processing and packaging facilities",
        "High degree of autonomy and leadership responsibility",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
    {
      id: 4,
      title: "Quality Control Officer",
      description:
        "Ensure seed testing, physical purity check, and germination evaluation meet standard protocols.",
      tags: ["Onsite", "Full time", "Rajshahi"],
      salary: "50,000TK – 80,000TK",
      salaryNote: "(Base salary + benefits)",
      location: "Rajshahi",
      jobType: "Full-time",
      experience: "Mid Level (3+ years)",
      deadline: "15 Oct 2026",
      fullDescription:
        "A R Malik Seeds is seeking a detail-oriented Quality Control Officer to oversee seed testing, purity checks, and germination assays at our Rajshahi laboratory. You will ensure that every bag of seed reaching farmers complies with highest national and international standards.",
      whatYoullDo: [
        "Conduct standard seed quality tests including germination, physical purity, and moisture content",
        "Run grow-out tests (GOT) to evaluate genetic purity of commercial lots",
        "Inspect processing and packaging units to verify compliance with hygiene and tagging standards",
        "Maintain precise records of laboratory analysis and issue quality certificates",
        "Investigate customer quality complaints and suggest corrective measures",
        "Calibrate and maintain lab testing equipment in top operating condition",
      ],
      whatWereLookingFor: [
        "BSc in Agriculture, Botany, or Seed Science",
        "3+ years of working experience in a seed testing laboratory or QC department",
        "Familiarity with ISTA (International Seed Testing Association) rules and protocols",
        "High proficiency in data recording and reporting tools",
        "Exceptional eye for detail and analytical patience",
      ],
      skillsAndCompetencies: [
        "Methodical and structured thinking",
        "Laboratory safety and equipment operations",
        "High standard of honesty and ethical compliance",
        "Excellent reporting and documentation skills",
      ],
      whyJoin: [
        "Safeguard the brand reputation of a trusted agriculture leader",
        "Work in a well-equipped, modern seed testing facility",
        "Ongoing technical training and career development opportunities",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
    {
      id: 5,
      title: "Marketing Executive (Agri Sector)",
      description:
        "Plan and coordinate product launch campaigns, dealer conferences, and brand promotions.",
      tags: ["Onsite", "Full time", "Dhaka"],
      salary: "55,000TK – 85,000TK",
      salaryNote: "(Includes mobile and internet allowances)",
      location: "Dhaka",
      jobType: "Full-time",
      experience: "Mid Level (2+ years)",
      deadline: "31 Oct 2026",
      fullDescription:
        "We are looking for a creative and result-oriented Marketing Executive to join our team in Dhaka. You will design, coordinate, and execute marketing campaigns, brand activities, and digital content specifically tailored to the agricultural sector, dealers, and farmers of Bangladesh.",
      whatYoullDo: [
        "Create and coordinate promotional materials (posters, banners, leaflets) for agricultural campaigns",
        "Manage Malik Seeds' digital presence (Facebook Page, YouTube, local newsletters)",
        "Plan and execute dealer conventions, agri-fairs, and product launch events",
        "Gather market insights, farmer feedback, and monitor competitor activities",
        "Write engaging stories, video scripts, and field case studies of successful crop harvests",
        "Collaborate with sales teams to align regional promotions with business goals",
      ],
      whatWereLookingFor: [
        "Bachelor's degree in Marketing, Business Administration, or Agri-Business",
        "2+ years of marketing experience, ideally within the agriculture, FMCG, or rural sectors",
        "Fluent in Bangla and English with strong copywriting and storytelling skills",
        "Familiarity with digital marketing tools, social media analytics, and basic design concepts",
        "Willingness to occasionally travel to rural markets for field insights",
      ],
      skillsAndCompetencies: [
        "Creative thinking and campaign design",
        "Rural marketing strategies and consumer understanding",
        "Multi-tasking and project coordination",
        "Team collaboration and relationship management",
      ],
      whyJoin: [
        "Shape the brand voice of a company modernizing Bangladesh agriculture",
        "Work on creative projects blending tradition with modern technology",
        "Direct exposure to corporate strategy and high-impact marketing budgets",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
    {
      id: 6,
      title: "Supply Chain & Distribution Coordinator",
      description:
        "Manage warehousing, seasonal dispatch scheduling, and dealer network logistics.",
      tags: ["Onsite", "Full time", "Bogura"],
      salary: "60,000TK – 90,000TK",
      salaryNote: "(On-target earnings; base + incentives)",
      location: "Bogura",
      jobType: "Full-time",
      experience: "Mid Level (3+ years)",
      deadline: "15 Nov 2026",
      fullDescription:
        "We are seeking a Supply Chain & Distribution Coordinator to oversee inventory, warehousing, and transportation of seeds from processing plants to our dealer network. Based in Bogura, you will ensure timely, cost-effective, and safe distribution of seeds to support seasonal planting schedules.",
      whatYoullDo: [
        "Coordinate transport logistics and schedule seed shipments to dealerships across regions",
        "Monitor warehouse inventory levels, ensuring optimal storage conditions (temperature, humidity)",
        "Resolve shipping delays, damage issues, or distributor delivery inquiries promptly",
        "Manage relationships and contracts with external transport providers and logistics agencies",
        "Use inventory management software to track stock movements and forecast logistics requirements",
        "Audit shipping records and invoices for accuracy and process payments",
      ],
      whatWereLookingFor: [
        "Bachelor's degree in Supply Chain Management, Logistics, Business, or related discipline",
        "3+ years of experience in supply chain operations, warehousing, or distribution",
        "Familiarity with inventory tracking systems and transport logistics in Bangladesh",
        "High proficiency in Excel and data-entry accuracy",
        "Strong communication and negotiation skills with transport vendors and warehouse staff",
      ],
      skillsAndCompetencies: [
        "Outstanding coordination and planning ability",
        "Problem-solving under tight delivery deadlines",
        "Focus on efficiency and cost optimization",
        "High reliability and accuracy in record keeping",
      ],
      whyJoin: [
        "Work in a critical role keeping the agricultural supply chain moving smoothly",
        "Collaborate with dynamic operations and sales teams",
        "Practical exposure to logistics management at scale",
      ],
      benefitsList: [
        { text: "Competitive salary package", icon: "briefcase-01.svg" },
        { text: "Performance-based incentives", icon: "target-01.svg" },
        { text: "Field travel allowance", icon: "location-03.svg" },
        {
          text: "Professional development opportunities",
          icon: "rocket-01.svg",
        },
        {
          text: "Supportive and growth-oriented workplace",
          icon: "plant-03.svg",
        },
      ],
    },
  ] as JobPosition[],
};

// ── Section 5: Team Culture Photo Grid ──────────────────────────────────────
export const teamCultureData = {
  badge: "Team Building",
  title: "Building a Team of A-Players",
  images: [
    {
      src: "/images/team/malik_seeds_team-7.png",
      alt: "Malik Seeds team working together",
      colSpan: "wide" as const,
    },
    {
      src: "/images/team/malik_seeds_team-1_2.png",
      alt: "Malik Seeds team collaboration",
      colSpan: "narrow" as const,
    },
    {
      src: "/images/team/malik_seeds_team-4.png",
      alt: "Malik Seeds field team",
      colSpan: "third" as const,
    },
    {
      src: "/images/team/malik_seeds_team-10.png",
      alt: "Malik Seeds team meeting",
      colSpan: "third" as const,
    },
    {
      src: "/images/team/malik_seeds_team-2_2.png",
      alt: "Malik Seeds agronomist",
      colSpan: "third" as const,
    },
  ],
};

// ── Section 6: Future Leader Program ─────────────────────────────────────────
export const futureProgramData = {
  badge: "Malik Seeds Initiative",
  title: "Future Leader Program",
  paragraphs: [
    "We believe the future of agriculture in Bangladesh will be built by the people we invest in today.",
    "The Malik Seeds Future Leader Program is a multi-week intensive sales bootcamp for young professionals who are ready to work - not watch. You will be in the field, meeting farmers, visiting dealers and learning about the products that fuel our country's agriculture economy.",
    "You will see how Bangladesh's most trusted seed company is changing what modern agriculture looks like through using software, data, and innovation - and be a part of us leading that change.",
    "This program takes place in Malik's Farm located in North Bengal. Top performers will walk away with a full-time career."
  ],
  cta: {
    label: "Drop your CV",
    href: "mailto:careers@armalikseeds.com",
  },
  image: "/images/team/future_leader_program.png",
};

// ── Section 7: Employee Testimonials ─────────────────────────────────────────
export interface EmployeeTestimonial {
  id: number;
  name: string;
  designation: string;
  quote: string;
  avatar?: string;
  department: string;

}

export const employeeTestimonialsData = {
  badge: "Team’s Stories",
  navLabel: "Our Team’s Stories",
  testimonials: [
    {
      id: 1,
      name: "Tahmina Hasan",
      designation: "Manager",
      department: "Business Affairs",
      quote:
        "I work closely with international partners and managing global communications. Malik Seeds fosters a culture of accountability, collaboration, and continuous improvement, empowering individuals to take ownership and deliver results. The supportive environment has consistently encouraged me to take initiative and keep learning.",
      avatar: "/images/testimonials/testimonial_1.png",
    },
    {
      id: 2,
      name: "Biswajit Bhowmik",
      designation: "System Engineer",
      department: "IT",
      quote:
        "As a System Engineer, I’ve had the opportunity to contribute to software development projects, managing enterprise-wide IT operations and grow my technical skills in an innovative environment. I’m proud to be part of my team that drives the company’s success.",
      avatar: "/images/testimonials/testimonial_2.png",
    },
    {
      id: 3,
      name: "Nadia Islam",
      designation: "Product Development Lead",
      department: "Product Development",
      quote:
        "The Future Leader Program gave me a real shot at building something meaningful. The mentorship and exposure you get here is unmatched in the industry.",
      avatar: "/images/testimonials/testimonial_3.png",
    },
  ] as EmployeeTestimonial[],
};
