"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { assessmentConfigs, type PositionAssessmentConfig } from "@/data/questions-data";
import { getInitialExamRoute } from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StartPage() {
  const router = useRouter();
  const { id } = useParams();
  const { name, email, isOtpVerified, startAssessment } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [backendConfig, setBackendConfig] = useState<PositionAssessmentConfig | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  const positionId = parseInt(id as string);

  useEffect(() => {
    setHydrated(true);
    if (hydrated) {
      if (!email) {
        router.replace(`/careers/${id}/apply/info`);
      } else if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      }
    }
  }, [email, isOtpVerified, hydrated, id, router]);

  useEffect(() => {
    if (positionId) {
      setLoadingConfig(true);
      fetch(`/api/assessment-config/${positionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setBackendConfig(data);
          }
          setLoadingConfig(false);
        })
        .catch(() => {
          setLoadingConfig(false);
        });
    }
  }, [positionId]);

  if (!hydrated || !isOtpVerified || loadingConfig) {
    return (
      <div className="animate-pulse space-y-4 py-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const position = openPositionsData.positions.find((pos) => pos.id === positionId);
  const config = backendConfig ?? assessmentConfigs[positionId];

  if (!position || !config) {
    return (
      <div className="text-center py-10 text-[#FF4242]">
        Error: Position assessment configuration not found.
      </div>
    );
  }

  const handleStart = () => {
    if (!agreed) return;

    // Start timer and configure state in Zustand
    startAssessment(positionId, position.title, config);

    // Redirect to the first configured stage for this position
    router.push(`/careers/${id}/apply${getInitialExamRoute(positionId)}`);
  };

  // Agronomy detail mapping or generic detail mapping to match Figma's wording style:
  const getJobDetailParagraph = () => {
    if (positionId === 1) {
      return `The next step in our hiring process is an initial screening assessment for the ${position.title} role. This helps us understand your agronomy expertise, trial planning ability, and problem-solving approach in real field conditions.`;
    }
    return `The next step in our hiring process is an initial screening assessment for the ${position.title} role. This helps us understand your industry expertise, practical reasoning, and problem-solving approach in real field conditions.`;
  };

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="w-full flex flex-col gap-12 py-2">
        {/* Instructions Content */}
        <div className="flex flex-col gap-6 w-full">
          {/* Title and Intro Paragraph */}
          <div className="flex flex-col gap-2 w-full">
            <h2
              className="font-medium text-[20px] text-[#0D1A14] leading-[20px]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Hi {name},
            </h2>
            <p className="font-inter text-[16px] text-[#0D1A14]/70 leading-[24px] mt-2">
              {getJobDetailParagraph()}
            </p>
          </div>

          {/* Assessment Rules & Config */}
          <div className="font-inter text-[16px] text-[#0D1A14] leading-[24px] whitespace-pre-line flex flex-col">
            <span>Total questions: {config.totalQuestions}</span>
            <span>Time limit: {config.timeLimitMinutes} minutes</span>
            <span>Passing score: {config.passingScorePercent}%</span>
          </div>

          {/* Important Note */}
          <div className="font-inter italic text-[16px] text-[#0D1A14]/70 leading-[24px]">
            Important note: Please complete the assessment in one sitting. Once started, the timer cannot be paused.
          </div>

          {/* Rules Agreement Checkbox */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="flex items-center gap-3 text-left cursor-pointer select-none group"
            >
              <div className={cn(
                "w-[18px] h-[18px] rounded border flex items-center justify-center transition-all",
                agreed
                  ? "bg-[#195236] border-[#195236] text-[#F2F7F1]"
                  : "border-[#D0D5DD] bg-white group-hover:border-[#195236]"
              )}>
                {agreed && (
                  <svg className="w-3 h-3 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-inter text-[16px] leading-[24px] text-[#0D1A14]">
                I understand and agree to the assessment rules.
              </span>
            </button>
          </div>
        </div>

        <hr className="w-full border-t border-[#E4E7EC]" />

        {/* Buttons Action Row */}
        <div className="flex items-center justify-between w-full pt-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push(`/careers/${id}/apply/otp`)}
            className="flex items-center justify-center gap-[10px] rounded-[60px] h-[46px] w-[113px] font-medium text-[16px] border border-[#E4E7EC] bg-[#F2F4F7] text-[#414E62] transition-all duration-200 select-none active:scale-95 cursor-pointer hover:bg-gray-100"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Start Screening Button */}
          <button
            type="button"
            disabled={!agreed}
            onClick={handleStart}
            className={cn(
              "flex items-center justify-center gap-[10px] rounded-[60px] h-[46px] w-[188px] font-medium text-[16px] border transition-all duration-200 select-none active:scale-95 cursor-pointer",
              !agreed
                ? "bg-[#F2F4F7] border-[#E4E7EC] text-[#97A1AF] cursor-not-allowed"
                : "bg-[#195236] border-transparent text-[#F2F7F1] hover:bg-[#153e28]"
            )}
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Start Screening</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
