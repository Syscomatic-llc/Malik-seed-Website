"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getInitialExamRoute } from "@/data/questions-data";

export default function WrittenAssessmentPage() {
  const router = useRouter();
  const { id } = useParams();

  const positionId = parseInt(id as string);

  useEffect(() => {
    const nextRoute = getInitialExamRoute(positionId);
    router.replace(`/careers/${id}/apply${nextRoute}`);
  }, [id, positionId, router]);

  return (
    <div className="py-10 text-center text-[#0D1A14]/70">
      Redirecting to the configured assessment stage...
    </div>
  );
}
