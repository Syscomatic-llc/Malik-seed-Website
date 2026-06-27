import { SectionBadge } from "@/components/ui/SectionBadge";

interface Project {
  title: string;
  duration: string;
  focus: string;
  location: string;
  donor: string;
}

const PROJECTS: Project[] = [
  {
    title: "Agro-logistic Impact Cluster",
    duration: "(Jan 2026 – Dec 2029)",
    focus: "Reducing post-harvest loss · Capacity development on advanced post-harvest management · CA storage · MAP line · Traceability · Mini-labs for MRL testing",
    location: "Rajshahi & Rangpur Division",
    donor: "Netherlands Enterprise Agency (RVO)",
  },
  {
    title: "Climate-Adaptive Cold Storage Initiative",
    duration: "(May 2026 - Oct 2027)",
    focus: "Strengthening value chain of vegetables, onion & potato · Renewable energy · Cool chain management · Traceability",
    location: "Rajshahi & Rangpur Division",
    donor: "DFCD-SNV Netherlands",
  },
  {
    title: "Building an Inclusive & Sustainable Supply Chain for Responsibly Produced, High-Quality Vegetables (ISCHV)",
    duration: "(Jan 2023 – Dec 2026)",
    focus: "Capacity building of farmers & stakeholders on GAP · GAP certification · Vegetable processing plant · HACCP certification · Cool chain · Traceability · Sales & marketing",
    location: "Bogura & Gaibandha",
    donor: "KFW-DEG Impulse, Germany",
  },
  {
    title: "Technical Service for GAP Certification Framework (SD/Partner-DAE/06)",
    duration: "(Nov 2024 – Dec 2027)",
    focus: "Policy / regulatory framework & strategic action plan development · SOP for certification · BACB capacity building & auditor training · PFS piloting · Marketing & media message preparation",
    location: "National level",
    donor: "PARTNER – Department of Agriculture Extension (DAE)",
  },
  {
    title: "On-the-job training for youth & women entrepreneurs",
    duration: "(Jul 2024 – Jun 2028)",
    focus: "Training rural agro-entrepreneurs on post-harvest management · GAP handling · Business planning · Incubation support on agro-input business & vegetable production",
    location: "Rangpur Division",
    donor: "PARTNER Programme – Department of Marketing (DAM)",
  },
  {
    title: "Onion Impact Cluster Project",
    duration: "(Jan 2022 – Dec 2025)",
    focus: "Post-harvest management of onion · Grading, sorting & packaging · Cool storage system",
    location: "Pabna District",
    donor: "Netherlands Enterprise Agency (RVO)",
  },
  {
    title: "Smallholder Horticulture Empowerment Project (Bangla-SHEP)",
    duration: "(2019 – 2026)",
    focus: "Capacity building of farmers on market-oriented horticulture production",
    location: "Dinajpur, Rangpur, Bogura, Pabna & Rajshahi",
    donor: "JICA and DAE",
  },
  {
    title: "Raising Economic & Social Security for Child Labour Eradication (RESOURCE)",
    duration: "(Mar 2024 – May 2026)",
    focus: "Homestead food production & livelihoods improvement in saline-prone areas of Bagerhat district",
    location: "Bagerhat, Khulna Division",
    donor: "Cordaid – Netherlands",
  },
  {
    title: "Sustained Fresh Vegetable Supply Chain for Healthy & Prosperous Citizens (SVC4HPC)",
    duration: "(Jul 2023 – Jun 2024)",
    focus: "GAP cluster formation · Facilitation to obtain Global GAP certification",
    location: "Northern Bangladesh",
    donor: "BAEN (Bangladesh Agriculture Extension Network)",
  },
  {
    title: "Making Market Work for Char (M4C)",
    duration: "(Feb 2021 – Jun 2024)",
    focus: "Make next-generation seed available in remote Char areas of Teesta and Jamuna",
    location: "Northern Bangladesh",
    donor: "Swisscontact",
  },
  {
    title: "Agro-entrepreneurship creation with market linkage",
    duration: "(Mar 2020 – Feb 2022)",
    focus: "Make next-generation seed available to homestead farmers",
    location: "Gaibandha & Kurigram Districts",
    donor: "Cordaid under SONGO project",
  },
  {
    title: "Collective Responsibility, Action & Accountability for Improved Nutrition (CRAAIN)",
    duration: "(Aug 2021 – Jan 2023)",
    focus: "Technical support, training, and saline-tolerant vegetable seeds",
    location: "Bagerhat District",
    donor: "European Union – Concern Worldwide",
  },
  {
    title: "High-value quality vegetable seeds & technical support grant to marginal farmers of northern char areas",
    duration: "(Ongoing)",
    focus: "Next-generation seed as input grant with technical support",
    location: "Northern Bangladesh",
    donor: "SAKATA, BSA and ODSD",
  },
];

export default function BrandProjectsTable() {
  return (
    <section className="w-full bg-[#F2F7F1] py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-10 md:gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-[800px]">
          <SectionBadge>Projects</SectionBadge>
          <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
            Implemented and ongoing projects
          </h2>
        </div>

        {/* Desktop Table View (lg and above) */}
        <div className="hidden lg:block overflow-x-auto rounded-[24px] border border-[#0D1A14]/10 bg-white shadow-xs">
          <table className="w-full border-collapse text-left text-sm text-neutral-500">
            <thead className="bg-[#0D1A14] text-white font-sans text-[16px] font-semibold">
              <tr>
                <th scope="col" className="px-6 py-5 font-semibold">Projects</th>
                <th scope="col" className="px-6 py-5 font-semibold">Focus Areas</th>
                <th scope="col" className="px-6 py-5 font-semibold">Location</th>
                <th scope="col" className="px-6 py-5 font-semibold">Donor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1A14]/10 font-inter text-[14px]">
              {PROJECTS.map((project, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#F2F7F1]/50 transition-colors duration-200"
                >
                  <td className="px-6 py-5 align-top font-sans font-semibold text-[#0D1A14]">
                    <div className="flex flex-col gap-1">
                      <span>{project.title}</span>
                      <span className="text-[12px] font-medium text-neutral-400 font-inter">
                        {project.duration}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top text-neutral-600 leading-relaxed max-w-[400px]">
                    {project.focus}
                  </td>
                  <td className="px-6 py-5 align-top text-neutral-700 font-medium whitespace-nowrap">
                    {project.location}
                  </td>
                  <td className="px-6 py-5 align-top text-[#195236] font-semibold">
                    {project.donor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards View (below lg) */}
        <div className="lg:hidden flex flex-col gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 p-6 rounded-[24px] border border-[#0D1A14]/10 bg-white shadow-xs"
            >
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[18px] font-semibold text-[#0D1A14] leading-snug">
                  {project.title}
                </span>
                <span className="font-inter text-[13px] text-neutral-400 font-medium">
                  {project.duration}
                </span>
              </div>

              <div className="h-[1px] w-full bg-[#0D1A14]/10" />

              <div className="flex flex-col gap-3 text-[14px]">
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-semibold text-[12px] uppercase tracking-wider text-neutral-400">
                    Focus Areas
                  </span>
                  <p className="font-inter text-neutral-600 leading-relaxed">
                    {project.focus}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans font-semibold text-[12px] uppercase tracking-wider text-neutral-400">
                      Location
                    </span>
                    <span className="font-inter font-medium text-[#0D1A14]">
                      {project.location}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-sans font-semibold text-[12px] uppercase tracking-wider text-neutral-400">
                      Donor
                    </span>
                    <span className="font-inter font-bold text-[#195236]">
                      {project.donor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
