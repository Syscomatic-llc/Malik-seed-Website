// ─── Career Page Data ───────────────────────────────────────────────────────
// Extracted from Figma node 2424:13740 "Hiring" frame

// ── Section 1: Hero ─────────────────────────────────────────────────────────
export const careerHeroData = {
  badge: "Join Our Mission",
  titleLine1: "Come build ",
  titleLine2: ["the future of agriculture", "systems for safe food", "confidence for farmers"],
  titleLine3: "with us",
  ctaPrimary: {
    label: "View Open Positions",
    href: "/careers/open-positions",
  },
  ctaSecondary: {
    label: "Life at Malik Seeds",
    href: "#team-culture",
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
    `High Agency people don't wait for a map, they build the road. They don't accept default processes — they create smarter systems, and take on every challenge with Ownership.`,
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
  title: string;
  description: string;
  tags: string[];
}

export const openPositionsData = {
  badge: "Open Positions",
  title: "Career Opportunities at Malik Seeds",
  positions: [
    {
      id: 1,
      title: "Senior Agronomist",
      description: "Experienced Agronomist to lead crop performance trials.",
      tags: ["Onsite", "Full time", "Bogura"],
    },
    {
      id: 2,
      title: "Field Development Officer",
      description:
        "Ensure proper seed usage, field demonstrations, and crop performance monitoring.",
      tags: ["Onsite", "Full time", "Bogura"],
    },
    {
      id: 3,
      title: "Seed Production Manager",
      description:
        "Lead seed production programs ensuring quality, purity, and timely supply.",
      tags: ["Onsite", "Full time", "Rangpur"],
    },
    {
      id: 4,
      title: "Quality Control Officer",
      description: "Experienced Agronomist to lead crop performance trials.",
      tags: ["Onsite", "Full time", "Rajshahi"],
    },
    {
      id: 5,
      title: "Marketing Executive (Agri Sector)",
      description: "Experienced Agronomist to lead crop performance trials.",
      tags: ["Onsite", "Full time", "Dhaka"],
    },
    {
      id: 6,
      title: "Supply Chain & Distribution Coordinator",
      description: "Experienced Agronomist to lead crop performance trials.",
      tags: ["Onsite", "Full time", "Bogura"],
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
    "The Malik Seeds Future Leader Program is our commitment to the next generation. This graduate trainee program is designed to give young professionals a shot at building a career in the agriculture industry.",
    "We will hire not only in our core business areas like Sales, R&D and Product Development but also in Social Media Marketing, Tech Team, Agri Innovation & Development Projects, AI Projects and many more.",
    "If you are interested, drop your CV below!",
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
  role: string;
  quote: string;
  avatar?: string;
}

export const employeeTestimonialsData = {
  badge: "Team’s Stories",
  navLabel: "Our Team’s Stories",
  testimonials: [
    {
      id: 1,
      name: "Tahmina Hasan",
      role: "Manager, Business Affairs",
      quote:
        "I work closely with international partners and managing global communications. Malik Seeds fosters a culture of accountability, collaboration, and continuous improvement, empowering individuals to take ownership and deliver results. The supportive environment has consistently encouraged me to take initiative and keep learning.",
      avatar: "/images/testimonials/testimonial_1.png",
    },
    {
      id: 2,
      name: "Biswajit Bhowmik",
      role: "System Engineer",
      quote:
        "As a System Engineer, I’ve had the opportunity to contribute to software development projects, managing enterprise-wide IT operations and grow my technical skills in an innovative environment. I’m proud to be part of my team that drives the company’s success.",
      avatar: "/images/testimonials/testimonial_2.png",
    },
    {
      id: 3,
      name: "Nadia Islam",
      role: "Product Development Lead",
      quote:
        "The Future Leader Program gave me a real shot at building something meaningful. The mentorship and exposure you get here is unmatched in the industry.",
      avatar: "/images/testimonials/testimonial_3.png",
    },
  ] as EmployeeTestimonial[],
};
