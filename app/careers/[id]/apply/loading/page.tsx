"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { assessmentConfigs, shouldAutoGradeAssessment } from "@/data/questions-data";

export default function AssessmentLoadingPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isCompleted, isPassed } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
        return;
      }
      if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
        return;
      }

      // Simulate grading evaluation time (3 seconds)
      const timer = setTimeout(() => {
        const positionId = parseInt(id as string);
        const autoGrade = shouldAutoGradeAssessment(positionId);

        if (autoGrade) {
          // MCQ: always go to result page first (result handles pass/fail branching)
          router.replace(`/careers/${id}/apply/result`);
        } else {
          // Written or mixed flow: skip pass/fail result stage.
          router.replace(`/careers/${id}/apply/submitted`);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOtpVerified, isCompleted, isPassed, hydrated, id, router]);

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center py-16 gap-6 text-center max-w-[600px] mx-auto">
        {/* Dynamic spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#195236]/10 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#195236] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-inter-tight text-[22px] font-semibold text-[#0D1A14]">
            Evaluating your responses...
          </h2>
          <p className="font-inter text-[15px] text-[#0D1A14]/70 leading-[24px]">
            Please wait while our system analyzes your screening assessment results. This should only take a few seconds. Do not close this tab or refresh the page.
          </p>
        </div>
      </div>
    </div>
  );
}
