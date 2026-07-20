import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { openPositionsData, type JobPosition } from "@/data/career-data";
import { hiringApi, mapApiPositionToJobPosition } from "@/lib/api";
import ApplyHeader from "./ApplyHeader";
import DevNav from "./DevNav";

interface ApplyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

async function getPosition(id: string): Promise<JobPosition | null> {
  // 1. Try to parse ID and fetch by ID
  const numId = parseInt(id);
  if (!isNaN(numId)) {
    try {
      const res = await hiringApi.getPositionById(numId, { revalidate: 60 });
      if (res && res.position) {
        return mapApiPositionToJobPosition(res.position);
      }
    } catch {}
  }

  // 2. Try to fetch by slug
  try {
    const res = await hiringApi.getPositionBySlug(id, { revalidate: 60 });
    if (res && res.position) {
      return mapApiPositionToJobPosition(res.position);
    }
  } catch {}

  // 3. Fallback to static mock data
  const staticPos = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  return staticPos ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const position = await getPosition(id);

  if (!position) return { title: "Apply - Malik Seeds" };
  return {
    title: `Apply for ${position.title} - Malik Seeds`,
    description: `Application form for ${position.title} position at A R Malik Seeds.`,
  };
}

export default async function ApplyLayout({
  children,
  params,
}: ApplyLayoutProps) {
  const { id } = await params;
  const position = await getPosition(id);
  if (!position) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F7F1] pt-[120px] pb-20 lg:pt-[160px]">
      <div className="mx-auto w-full max-w-[818px] px-4 lg:px-0">
        <div className="flex flex-col gap-8 lg:gap-10">
          <ApplyHeader id={id} position={position} />

          {/* Main Card Content */}
          {children}
        </div>
      </div>
      {/* Dev-only floating navigation panel */}
      <DevNav positionId={id} />
    </div>
  );
}
