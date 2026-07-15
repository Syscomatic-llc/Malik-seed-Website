import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { openPositionsData } from "@/data/career-data";
import ApplyHeader from "./ApplyHeader";
import DevNav from "./DevNav";
import { hiringApi, mapApiPositionToJobPosition } from "@/lib/api";

interface ApplyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let position = null;
  const isNumeric = /^\d+$/.test(id);
  try {
    if (isNumeric) {
      const res = await hiringApi.getPositionById(parseInt(id), { revalidate: 60 });
      if (res && res.position) {
        position = mapApiPositionToJobPosition(res.position);
      }
    } else {
      const res = await hiringApi.getPositionBySlug(id, { revalidate: 60 });
      if (res && res.position) {
        position = mapApiPositionToJobPosition(res.position);
      }
    }
  } catch (err) {
    console.error(`Failed to fetch metadata for apply layout job ${id}:`, err);
  }

  if (!position) {
    position = openPositionsData.positions.find(
      (pos) => pos.id.toString() === id || pos.slug === id
    );
  }

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
  let position = null;
  const isNumeric = /^\d+$/.test(id);
  try {
    if (isNumeric) {
      const res = await hiringApi.getPositionById(parseInt(id), { revalidate: 60 });
      if (res && res.position) {
        position = mapApiPositionToJobPosition(res.position);
      }
    } else {
      const res = await hiringApi.getPositionBySlug(id, { revalidate: 60 });
      if (res && res.position) {
        position = mapApiPositionToJobPosition(res.position);
      }
    }
  } catch (err) {
    console.error(`Failed to fetch job details for apply layout ${id}:`, err);
  }

  if (!position) {
    position = openPositionsData.positions.find(
      (pos) => pos.id.toString() === id || pos.slug === id
    );
  }

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
