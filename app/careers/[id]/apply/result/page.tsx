"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { shouldAutoGradeAssessment } from "@/data/questions-data";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function AssessmentResultPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isCompleted, isPassed, reset } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const positionId = parseInt(id as string);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
      } else if (!shouldAutoGradeAssessment(positionId)) {
        router.replace(`/careers/${id}/apply/submitted`);
      } else if (isPassed) {
        router.replace(`/careers/${id}/apply/confirmation`);
      }
    }
  }, [isOtpVerified, isCompleted, isPassed, hydrated, id, router, positionId]);

  if (!hydrated || !isCompleted) {
    return <div className="text-center py-10 font-inter text-[#0D1A14]/70">Loading results...</div>;
  }

  // If passed, we redirect. If they haven't redirected yet, show loading
  if (isPassed) {
    return <div className="text-center py-10 font-inter text-[#0D1A14]/70">Loading confirmation...</div>;
  }

  const handleBackToCareers = () => {
    reset(); // Clear store state on exit
    router.push("/careers");
  };

  return (
    <div className="w-full max-w-[816px] mx-auto bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm">
      <div className="flex flex-col gap-[48px] w-full items-start">
        {/* Top Content Frame */}
        <div className="w-full flex flex-col gap-[32px] items-start">
          {/* Header Block (Red cross Circle & Texts) */}
          <div className="w-full flex flex-col gap-[32px] items-start">
            {/* Red Circle with white Cross SVG */}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M21.511 9.95276L7.5377 34.1534C7.2853 34.5904 7.15239 35.0862 7.15234 35.5909C7.1523 36.0955 7.28511 36.5913 7.53744 37.0284C7.78976 37.4655 8.15271 37.8284 8.58978 38.0808C9.02685 38.3331 9.52265 38.4659 10.0273 38.4659H37.9716C38.4763 38.4659 38.9721 38.3331 39.4091 38.0808C39.8462 37.8284 40.2091 37.4655 40.4615 37.0284C40.7138 36.5913 40.8466 36.0955 40.8466 35.5909C40.8465 35.0862 40.7136 34.5904 40.4612 34.1534L26.4895 9.95276C26.2372 9.51581 25.8743 9.15297 25.4374 8.9007C25.0004 8.64843 24.5048 8.51562 24.0002 8.51562C23.4957 8.51562 23 8.64843 22.563 8.9007C22.1261 9.15297 21.7632 9.51581 21.511 9.95276Z" fill="#FFB400" />
                <path d="M24.1808 17.4141H23.8163C22.9189 17.4141 22.1914 18.1415 22.1914 19.0389V26.8056C22.1914 27.703 22.9189 28.4304 23.8163 28.4304H24.1808C25.0782 28.4304 25.8057 27.703 25.8057 26.8056V19.0389C25.8057 18.1415 25.0782 17.4141 24.1808 17.4141Z" fill="#FCF4D9" />
                <path d="M23.9985 34.5908C24.9966 34.5908 25.8057 33.7817 25.8057 32.7837C25.8057 31.7856 24.9966 30.9766 23.9985 30.9766C23.0005 30.9766 22.1914 31.7856 22.1914 32.7837C22.1914 33.7817 23.0005 34.5908 23.9985 34.5908Z" fill="#FCF4D9" />
              </svg>
            </div>

            {/* Headline and Description Paragraphs */}
            <div className="w-full flex flex-col gap-[16px] items-start">
              <h1 
                className="w-full text-[#0D1A14] font-medium text-[24px] leading-[29px] tracking-tight"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Assessment Not Passed
              </h1>
              <p 
                className="w-full text-[#0D1A14]/70 text-[16px] leading-[24px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Thank you for completing the Malik Seeds technical assessment.
              </p>
              <p 
                className="w-full text-[#0D1A14]/70 text-[16px] leading-[24px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                After reviewing your responses, your results did not meet the required criteria for this position at this time. We appreciate the effort you put into the assessment.
              </p>
              <p 
                className="w-full text-[#0D1A14]/70 text-[16px] leading-[24px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                You are welcome to explore other opportunities with Malik Seeds in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Divider Line 7 */}
        <div className="w-full h-[1px] bg-[#E4E7EC]" />

        {/* Action Row */}
        <div className="w-full flex justify-start items-center">
          <button
            onClick={handleBackToCareers}
            className="w-full sm:w-auto flex justify-center items-center cursor-pointer gap-[10px] rounded-[60px] h-[46px] px-6 font-medium text-[16px] leading-[19px] bg-[#195236] text-[#F2F7F1] transition-all hover:bg-[#153e28] hover:shadow-sm"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <ArrowIcon direction="left" size={20} />
            <span>Return to Careers</span>
          </button>
        </div>
      </div>
    </div>
  );
}
