"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
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
    skipAssessmentFlow,
    positionId: storePositionId,
    positionTitle: storePositionTitle,
    positionSlug: storePositionSlug,
  } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const isStorePosMatching = Boolean(
    storePositionId &&
    (String(storePositionId) === String(id) ||
      (storePositionSlug && storePositionSlug.toLowerCase() === String(id).toLowerCase()))
  );

  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug?.toLowerCase() === String(id).toLowerCase()
  );
  const parsedUrlId = !isNaN(parseInt(id as string, 10)) ? parseInt(id as string, 10) : null;
  const resolvedPositionId = isStorePosMatching
    ? storePositionId
    : (position ? position.id : parsedUrlId);
  const resolvedPositionTitle = isStorePosMatching && storePositionTitle
    ? storePositionTitle
    : (position ? position.title : "selected");

  const fetchedIdRef = useRef<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!email) {
      router.replace(`/careers/${id}/apply/info`);
    } else if (!isOtpVerified) {
      router.replace(`/careers/${id}/apply/otp`);
    } else if (id && fetchedIdRef.current !== String(id)) {
      fetchedIdRef.current = String(id);
      fetchAssessment(id as string);
    }
  }, [email, isOtpVerified, hydrated, id, router, fetchAssessment]);

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

  const config = assessmentConfig;
  const isNoAssessment =
    !isLoadingAssessment &&
    (assessmentLoadError === "This position does not require an assessment." ||
      (resolvedPositionId !== null && !config && !assessmentLoadError));
  const isConnectionError =
    !isLoadingAssessment &&
    Boolean(assessmentLoadError && assessmentLoadError !== "This position does not require an assessment.");
  const hasValidPosition = !!position || !!storePositionId;
  // Case A: Genuinely no assessment required
  if (hasValidPosition && (isNoAssessment || (!config && !isConnectionError))) {
    return (
      <div className="mx-auto w-full max-w-[816px] rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10 font-inter">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F7F1] text-[#195236]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-[24px] leading-[29px] font-medium tracking-tight text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              No Assessment Active
            </h1>
            <p className="text-[16px] leading-[24px] text-[#0D1A14]/70">
              There is currently no screening assessment active for the <strong>{resolvedPositionTitle}</strong> position. Please check back later.
            </p>
          </div>
          <div className="h-[1px] w-full bg-[#E4E7EC]" />
          <button
            onClick={() => router.push("/careers")}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#195236] px-6 text-[16px] leading-[19px] font-medium text-[#F2F7F1] transition-all hover:bg-[#153e28] sm:w-auto"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Back to Open Positions</span>
          </button>
        </div>
      </div>
    );
  }

  // Case B: Backend connection/loading issue (System connection error)
  if (isConnectionError && !config) {
    return (
      <div className="mx-auto w-full max-w-[816px] rounded-[24px] border border-[#FFD0D0] bg-[#FFF2F2] p-6 shadow-sm md:p-10 font-inter">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD0D0] text-[#C12727]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-[24px] leading-[29px] font-semibold tracking-tight text-[#C12727]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Assessment Loading Error
            </h1>
            <p className="text-[16px] leading-[24px] text-[#C12727]/80">
              We encountered a temporary network issue connecting to the server to load the assessment config for <strong>{resolvedPositionTitle}</strong>.
            </p>
            {assessmentLoadError && (
              <span className="text-[13px] font-mono bg-white/50 border border-[#FFC2C2] px-3 py-1.5 rounded-lg text-[#8C1C1C] break-all">
                Details: {assessmentLoadError}
              </span>
            )}
          </div>
          <div className="h-[1px] w-full bg-[#FFC2C2]" />
          <div className="flex flex-wrap gap-4 w-full">
            <button
              onClick={() => {
                fetchAssessment(id as string);
              }}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#C12727] px-6 text-[16px] leading-[19px] font-medium text-white transition-all hover:bg-[#9F1C1C] sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Retry Connection</span>
            </button>
            <button
              onClick={() => router.push("/careers")}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#C12727] px-6 text-[16px] leading-[19px] font-medium text-[#C12727] transition-all hover:bg-white sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Back to Open Positions</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for completely invalid position IDs
  if (!hasValidPosition || !config) {
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
    if (!agreed || !resolvedPositionId) return;

    // Start timer and configure state in Zustand
    startAssessment(resolvedPositionId, resolvedPositionTitle, config);

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
    if (resolvedPositionId === 1) {
      return `The next step in our hiring process is an initial screening assessment for the ${resolvedPositionTitle} role. This helps us understand your agronomy expertise, trial planning ability, and problem-solving approach in real field conditions.`;
    }
    return `The next step in our hiring process is an initial screening assessment for the ${resolvedPositionTitle} role. This helps us understand your industry expertise, practical reasoning, and problem-solving approach in real field conditions.`;
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
            {Boolean(config.passingScorePercent && config.passingScorePercent > 0) && (
              <span>Passing score: {config.passingScorePercent}%</span>
            )}
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
        <div className="flex w-full flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.push(`/careers/${id}/apply/otp`)}
            className="flex h-[44px] w-full sm:h-[46px] sm:w-[113px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] text-[16px] font-medium text-[#414E62] transition-all duration-200 select-none hover:bg-gray-100 active:scale-95"
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
              "flex h-[44px] w-full sm:h-[46px] sm:w-[188px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border text-[16px] font-medium transition-all duration-200 select-none active:scale-95",
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
