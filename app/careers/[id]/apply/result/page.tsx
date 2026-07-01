"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { shouldAutoGradeAssessment } from "@/data/questions-data";
import { gradeMcqAssessment } from "@/lib/assessment-grading";
import type { McqGradingResult } from "@/lib/assessment-grading";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function AssessmentResultPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    isOtpVerified,
    isCompleted,
    isPassed,
    isGraded,
    mcqAnswers,
    setGradingResult,
    reset,
  } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [grading, setGrading] = useState<McqGradingResult | null>(null);
  const positionId = parseInt(id as string);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Grade MCQ assessments here (single place for result logic + dev debugging)
  useEffect(() => {
    if (!hydrated || !isCompleted || !shouldAutoGradeAssessment(positionId)) return;

    const result = gradeMcqAssessment(positionId, mcqAnswers);
    if (!result) return;

    setGrading(result);

    if (!isGraded) {
      setGradingResult(result.score, result.isPassed);
    }
  }, [hydrated, isCompleted, positionId, mcqAnswers, isGraded, setGradingResult]);

  useEffect(() => {
    if (hydrated && !isLeaving) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
      } else if (!shouldAutoGradeAssessment(positionId)) {
        router.replace(`/careers/${id}/apply/submitted`);
      }
    }
  }, [isOtpVerified, isCompleted, hydrated, id, router, positionId, isLeaving]);

  const showPass = isGraded ? isPassed : grading?.isPassed ?? false;

  if (!hydrated || (!isCompleted && !isLeaving)) {
    return <div className="text-center py-10 font-inter text-[#0D1A14]/70">Loading results...</div>;
  }

  if (shouldAutoGradeAssessment(positionId) && !isGraded && !grading) {
    return <div className="text-center py-10 font-inter text-[#0D1A14]/70">Evaluating your responses...</div>;
  }

  const handleBackToCareers = () => {
    setIsLeaving(true);
    reset();
    router.push("/careers");
  };


  if (showPass) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
          <div className="flex flex-col gap-6 md:gap-8 max-w-[700px] mx-auto py-4">
            <div className="flex flex-col items-center sm:items-start gap-4">
              <div>
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.6239 0C26.1278 0.0994592 31.3726 2.35568 35.2297 6.28311C39.0868 10.2106 41.2479 15.4953 41.2479 21C41.2479 26.5047 39.0868 31.7894 35.2297 35.7169C31.3726 39.6443 26.1278 41.9005 20.6239 42C15.1201 41.9005 9.8753 39.6443 6.01819 35.7169C2.16108 31.7894 0 26.5047 0 21C0 15.4953 2.16108 10.2106 6.01819 6.28311C9.8753 2.35568 15.1201 0.0994592 20.6239 0ZM16.2628 27.8217L11.1199 22.6743C10.699 22.2519 10.4626 21.6798 10.4626 21.0834C10.4626 20.4871 10.699 19.915 11.1199 19.4926C11.5431 19.072 12.1154 18.836 12.7119 18.836C13.3085 18.836 13.8808 19.072 14.3039 19.4926L17.9268 23.12L26.9439 14.1029C27.3664 13.6819 27.9384 13.4455 28.5348 13.4455C29.1312 13.4455 29.7032 13.6819 30.1257 14.1029C30.5461 14.5256 30.7821 15.0975 30.7821 15.6937C30.7821 16.2899 30.5461 16.8619 30.1257 17.2846L19.5154 27.8949C19.3 28.1091 19.0435 28.2777 18.7614 28.3905C18.4793 28.5032 18.1773 28.5578 17.8735 28.551C17.5698 28.5441 17.2705 28.476 16.9937 28.3507C16.717 28.2254 16.4683 28.0455 16.2628 27.8217Z" fill="#00BA00" />
                </svg>
              </div>

              <div className="flex flex-col gap-2 text-center sm:text-left">
                <h2 className="font-inter-tight text-[24px] font-medium text-[#0D1A14] leading-[30px]">
                  Congratulations! <br />
                  Your assessment responses meet the required evaluation criteria.
                </h2>
                <p className="font-inter text-[15px] text-[#0D1A14]/70 leading-[150%] mt-2">
                  You can now proceed to the next step of the application process by submitting your CV, cover letter, and supporting documents. Our recruitment team will review your complete application after submission.
                </p>
              </div>
            </div>

            <hr className="w-full border-t border-[#E4E7EC] my-2" />

            <div className="flex flex-col gap-4">
              <h3 className="font-inter-tight text-[18px] font-semibold text-[#0D1A14]">
                What Happens Next
              </h3>
              <ol className="flex flex-col gap-3 font-inter text-[16px] font-medium text-[#0D1A14]/80 pl-2">
                <li className="flex gap-1 items-center">
                  <span className="text-[#195236] text-[16px] font-medium shrink-0">1. </span>
                  <span>Upload your CV, cover letter, and other details.</span>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="text-[#195236] text-[16px] font-medium shrink-0">2. </span>
                  <span>Our recruitment team reviews your full profile, including assessment results.</span>
                </li>
                <li className="flex gap-1 items-center">
                  <span className="text-[#195236] text-[16px] font-medium shrink-0">3. </span>
                  <span>Shortlisted candidates will be contacted directly for the next interview stages.</span>
                </li>
              </ol>
            </div>
            <div className="w-full h-px bg-[#E4E7EC]" />

            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => router.push(`/careers/${id}/apply/review`)}
                className="w-full sm:w-auto flex justify-center items-center cursor-pointer gap-[10px] rounded-[60px] h-[46px] px-6 font-medium text-[16px] leading-[19px] border border-[#E4E7EC] bg-[#F2F4F7] text-[#414E62] transition-all hover:bg-[#e4e7ec]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                <ArrowIcon direction="left" size={20} />
                <span>Review Your Responses</span>
              </button>
              <button
                onClick={() => router.push(`/careers/${id}/apply/additional-info`)}
                className="w-full sm:w-auto flex justify-center items-center cursor-pointer gap-[10px] rounded-[60px] h-[46px] px-6 font-medium text-[16px] leading-[19px] bg-[#195236] text-[#F2F7F1] transition-all hover:bg-[#153e28] hover:shadow-sm"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                <span>Continue</span>
                <ArrowIcon direction="right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[816px] mx-auto bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col gap-[48px] w-full items-start">
          <div className="w-full flex flex-col gap-[32px] items-start">
            <div className="w-full flex flex-col gap-[32px] items-start">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M21.511 9.95276L7.5377 34.1534C7.2853 34.5904 7.15239 35.0862 7.15234 35.5909C7.1523 36.0955 7.28511 36.5913 7.53744 37.0284C7.78976 37.4655 8.15271 37.8284 8.58978 38.0808C9.02685 38.3331 9.52265 38.4659 10.0273 38.4659H37.9716C38.4763 38.4659 38.9721 38.3331 39.4091 38.0808C39.8462 37.8284 40.2091 37.4655 40.4615 37.0284C40.7138 36.5913 40.8466 36.0955 40.8466 35.5909C40.8465 35.0862 40.7136 34.5904 40.4612 34.1534L26.4895 9.95276C26.2372 9.51581 25.8743 9.15297 25.4374 8.9007C25.0004 8.64843 24.5048 8.51562 24.0002 8.51562C23.4957 8.51562 23 8.64843 22.563 8.9007C22.1261 9.15297 21.7632 9.51581 21.511 9.95276Z" fill="#FFB400" />
                  <path d="M24.1808 17.4141H23.8163C22.9189 17.4141 22.1914 18.1415 22.1914 19.0389V26.8056C22.1914 27.703 22.9189 28.4304 23.8163 28.4304H24.1808C25.0782 28.4304 25.8057 27.703 25.8057 26.8056V19.0389C25.8057 18.1415 25.0782 17.4141 24.1808 17.4141Z" fill="#FCF4D9" />
                  <path d="M23.9985 34.5908C24.9966 34.5908 25.8057 33.7817 25.8057 32.7837C25.8057 31.7856 24.9966 30.9766 23.9985 30.9766C23.0005 30.9766 22.1914 31.7856 22.1914 32.7837C22.1914 33.7817 23.0005 34.5908 23.9985 34.5908Z" fill="#FCF4D9" />
                </svg>
              </div>

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

          <div className="w-full h-px bg-[#E4E7EC]" />

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
    </div>
  );
}
