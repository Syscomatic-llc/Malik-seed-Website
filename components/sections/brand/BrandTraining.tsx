import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import ActionButton from "@/components/ActionButton";

interface Program {
  title: string;
}

interface Room {
  title: string;
  description: string;
  image: string;
}

const PROGRAMS: Program[] = [
  { title: "Global GAP Training" },
  { title: "Post Harvest Technology" },
  { title: "Agri Entrepreneur Training" },
  { title: "Corporate Training" },
];

const ROOMS: Room[] = [
  {
    title: "Conference Room",
    description: "Capacity of 24 participants hosting executive level meetings",
    image: "/images/brand/dscf7440_1.png",
  },
  {
    title: "Training Room",
    description: "Capacity of 60 participants hosting multi-disciplinary trainings",
    image: "/images/brand/2g7a0508_1.png",
  },
  {
    title: "Practical Field Space",
    description: "Conducting field activities on our 20 acres of research plot",
    image: "/images/brand/dscf7455_1.png",
  },
];

const GUEST_SCANS = [
  { image: "/images/brand/camscanner_1.png", title: "Visitor Log Entry 1" },
  { image: "/images/brand/camscanner_3.png", title: "Visitor Log Entry 2" },
  { image: "/images/brand/camscanner_4.png", title: "Visitor Log Entry 3" },
  { image: "/images/brand/camscanner_5.png", title: "Visitor Log Entry 4" },
  { image: "/images/brand/camscanner_6.png", title: "Visitor Log Entry 5" },
];

export default function BrandTraining() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12 md:gap-20">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <SectionBadge>Training Centre</SectionBadge>
            <h2 className="font-sans text-[28px] md:text-[40px] font-medium leading-[34px] md:leading-[48px] text-[#0D1A14]">
              Malik's Farm is also a live training ground
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="font-inter text-[15px] md:text-[16px] leading-[24px] text-neutral-600 mb-8">
              We leverage our Global GAP certified facilities to train farmers, agri-entrepreneurs, and corporate teams on modern sustainable agricultural practices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROGRAMS.map((prog, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#F2F7F1] border border-[#0D1A14]/5">
                  <div className="h-2 w-2 rounded-full bg-[#195236]" />
                  <span className="font-sans font-semibold text-[14px] md:text-[15px] text-[#0D1A14]">
                    {prog.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider text-[#195236]">
              OUR FACILITIES
            </span>
            <h3 className="font-sans text-[22px] md:text-[32px] font-medium text-[#0D1A14]">
              Our Top-Tier Facility
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ROOMS.map((room, i) => (
              <div key={i} className="flex flex-col gap-4 group">
                <div className="relative aspect-video md:aspect-[387/260] overflow-hidden rounded-[20px] bg-neutral-200">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 387px"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-sans text-[18px] md:text-[20px] font-semibold text-[#0D1A14]">
                    {room.title}
                  </h4>
                  <p className="font-inter text-[14px] leading-[22px] text-neutral-500">
                    {room.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Logbook Carousel */}
        <div className="flex flex-col gap-8 pt-8 border-t border-neutral-100">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider text-[#195236]">
              visitor notes
            </span>
            <h3 className="font-sans text-[22px] md:text-[32px] font-medium text-[#0D1A14]">
              Testimonials from Malik’s Farm guests
            </h3>
          </div>

          {/* Scrolling Row of Visitor Book Scans */}
          <div className="flex gap-6 overflow-x-auto py-4 scroll-smooth scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent snap-x snap-mandatory">
            {GUEST_SCANS.map((scan, i) => (
              <div
                key={i}
                className="relative shrink-0 w-[260px] sm:w-[320px] aspect-[3/4] overflow-hidden rounded-[24px] bg-neutral-50 border border-neutral-200 shadow-xs snap-center hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={scan.image}
                  alt={scan.title}
                  fill
                  className="object-contain p-4 bg-white"
                  sizes="(max-width: 640px) 260px, 320px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Call to Action */}
        <div className="rounded-[24px] bg-[#0D1A14] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 max-w-[700px]">
            <h3 className="font-sans text-[22px] md:text-[32px] font-medium leading-snug">
              Host your next program at Malik's Farm
            </h3>
            <p className="font-inter text-[14px] md:text-[16px] text-white/70 leading-relaxed">
              If you are interested in hosting a program at our facility or purchasing GAP certified fruits and vegetables, contact us or call our hotline.
            </p>
          </div>
          <ActionButton
            href="mailto:support@armalikseeds.com"
            label="Inquire Today"
            variant="secondary"
            className="h-[52px] px-8 text-semibold uppercase shrink-0 font-sans"
          />
        </div>

      </div>
    </section>
  );
}
