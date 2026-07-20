"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  assessmentConfigs,
  type PositionAssessmentConfig,
} from "@/data/questions-data";
import { getInitialExamRoute } from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StartPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    name,
    email,
    isOtpVerified,
    startAssessment,
    fetchAssessment,
    assessmentConfig,
    isLoadingAssessment,
    assessmentLoadError,
  } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  const positionId = position ? position.id : parseInt(id as string);

  useEffect(() => {
    setHydrated(true);
    if (hydrated) {
      if (!email) {
        router.replace(`/careers/${id}/apply/info`);
      } else if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (position) {
        fetchAssessment(positionId, position.title);
      }
    }
  }, [email, isOtpVerified, hydrated, id, router, position, positionId, fetchAssessment]);

  if (!hydrated || !isOtpVerified || isLoadingAssessment) {
    return (
      <div className="animate-pulse space-y-6 py-10 px-6 bg-white border border-[#E4E7EC] rounded-[24px] shadow-sm">
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-5 w-1/3 rounded bg-gray-200"></div>
          <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          <div className="h-5 w-1/5 rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-full rounded bg-gray-200 mt-6"></div>
      </div>
    );
  }

  const config = assessmentConfig ?? assessmentConfigs[positionId];

  if (!position || !config) {
    return (
      <div className="py-10 text-center text-[#FF4242] font-inter">
        Error: Position assessment configuration not found.
        {assessmentLoadError && (
          <p className="mt-2 text-sm text-gray-500">{assessmentLoadError}</p>
        )}
      </div>
    );
  }

  const handleStart = () => {
    if (!agreed) return;

    // Start timer and configure state in Zustand
    startAssessment(positionId, position.title, config);

    // Redirect to the first configured stage for this position
    const firstType = config.assessmentTypes?.[0] ?? config.assessmentType;
    let initialRoute = "/exam/mcq";
    if (firstType === "short_answers") {
      initialRoute = "/exam/short-answers";
    } else if (firstType === "long_answers") {
      initialRoute = "/exam/long-answers";
    }
    router.push(`/careers/${id}/apply${initialRoute}`);
  };

  // Agronomy detail mapping or generic detail mapping to match Figma's wording style:
  const getJobDetailParagraph = () => {
    if (positionId === 1) {
      return `The next step in our hiring process is an initial screening assessment for the ${position.title} role. This helps us understand your agronomy expertise, trial planning ability, and problem-solving approach in real field conditions.`;
    }
    return `The next step in our hiring process is an initial screening assessment for the ${position.title} role. This helps us understand your industry expertise, practical reasoning, and problem-solving approach in real field conditions.`;
  };

  return (
    <div className="min-h-[400px] w-full rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="flex w-full flex-col gap-12 py-2">
        {/* Instructions Content */}
        <div className="flex w-full flex-col gap-6">
          {/* Title and Intro Paragraph */}
          <div className="flex w-full flex-col gap-2">
            <h2
              className="text-[20px] leading-[20px] font-medium text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Hi {name},
            </h2>
            <p className="font-inter mt-2 text-[16px] leading-[24px] text-[#0D1A14]/70">
              {getJobDetailParagraph()}
            </p>
          </div>

          {/* Assessment Rules & Config */}
          <div className="font-inter flex flex-col text-[16px] leading-[24px] whitespace-pre-line text-[#0D1A14]">
            <span>Total questions: {config.totalQuestions}</span>
            <span>Time limit: {config.timeLimitMinutes} minutes</span>
            <span>Passing score: {config.passingScorePercent}%</span>
          </div>

          {/* Important Note */}
          <div className="font-inter text-[16px] leading-[24px] text-[#0D1A14]/70 italic">
            Important note: Please complete the assessment in one sitting. Once
            started, the timer cannot be paused.
          </div>

          {/* Rules Agreement Checkbox */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="group flex cursor-pointer items-center gap-3 text-left select-none"
            >
              <div
                className={cn(
                  "flex h-[18px] w-[18px] items-center justify-center rounded border transition-all",
                  agreed
                    ? "border-[#195236] bg-[#195236] text-[#F2F7F1]"
                    : "border-[#D0D5DD] bg-white group-hover:border-[#195236]"
                )}
              >
                {agreed && (
                  <svg
                    className="h-3 w-3 stroke-[3px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
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
        <div className="flex w-full items-center justify-between pt-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push(`/careers/${id}/apply/otp`)}
            className="flex h-[46px] w-[113px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] text-[16px] font-medium text-[#414E62] transition-all duration-200 select-none hover:bg-gray-100 active:scale-95"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          {/* Start Screening Button */}
          <button
            type="button"
            disabled={!agreed}
            onClick={handleStart}
            className={cn(
              "flex h-[46px] w-[188px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border text-[16px] font-medium transition-all duration-200 select-none active:scale-95",
              !agreed
                ? "cursor-not-allowed border-[#E4E7EC] bg-[#F2F4F7] text-[#97A1AF]"
                : "border-transparent bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28]"
            )}
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Start Screening</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
