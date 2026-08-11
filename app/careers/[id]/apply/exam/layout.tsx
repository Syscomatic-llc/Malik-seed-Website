"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  shouldAutoGradeAssessment,
} from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";
import { cn } from "@/lib/utils";

interface ExamLayoutProps {
  children: React.ReactNode;
}

export default function ExamLayout({ children }: ExamLayoutProps) {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  
  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  const positionId = position ? position.id : parseInt(id as string);
  const {
    isOtpVerified,
    isStarted,
    isCompleted,
    stageTimeRemaining,
    isTimerRunning,
    mcqAnswers,
    shortAnswers,
    longAnswers,
    tickTimer,
    completeAssessment,
    completedStages,
    completeStage,
    assessmentConfig,
    dynamicMcqQuestions,
    dynamicShortQuestions,
    dynamicLongQuestions,
    showTimeoutAlert,
    transitionCountdown,
    setTransitionCountdown,
    finalizeTimeoutStage,
  } = useApplicationStore();

  const config = assessmentConfig;

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Determine current exam page
  const isMCQPage = pathname.endsWith("/mcq");
  const isShortAnswersPage = pathname.endsWith("/short-answers");
  const isLongAnswersPage = pathname.endsWith("/long-answers");

  // Active stage
  let currentStage: "mcq" | "short_answers" | "long_answers" = "mcq";
  if (isShortAnswersPage) currentStage = "short_answers";
  else if (isLongAnswersPage) currentStage = "long_answers";

  // Load questions based on active sub-page
  const mcqQuestions = dynamicMcqQuestions;
  const shortQuestions = dynamicShortQuestions;
  const longQuestions = dynamicLongQuestions;
  const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);

  // 5-second countdown timer on timeout
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (transitionCountdown !== null) {
      timer = setTimeout(() => {
        if (transitionCountdown > 1) {
          setTransitionCountdown(transitionCountdown - 1);
        } else {
          // Resolve next stage before clearing showTimeoutAlert
          const currentIndex = types.indexOf(showTimeoutAlert as any);
          const nextType = types[currentIndex + 1];

          // Finalize store state
          finalizeTimeoutStage(showTimeoutAlert);

          // Perform navigation
          if (nextType === "short_answers") {
            router.replace(`/careers/${id}/apply/exam/short-answers`);
          } else if (nextType === "long_answers") {
            router.replace(`/careers/${id}/apply/exam/long-answers`);
          }
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [
    transitionCountdown,
    showTimeoutAlert,
    setTransitionCountdown,
    finalizeTimeoutStage,
    types,
    id,
    router,
  ]);

  // Validation redirect
  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isStarted) {
        router.replace(`/careers/${id}/apply/start`);
      }
    }
  }, [isOtpVerified, isStarted, hydrated, id, router]);

  // In-exam stage routing validation
  useEffect(() => {
    if (hydrated && isStarted && !isCompleted) {
      // Check if trying to access short-answers without completing mcq
      if (isShortAnswersPage && types.includes("mcq") && !completedStages.mcq) {
        const unansweredMcq = mcqQuestions.some((q) => mcqAnswers[q.id] === undefined);
        if (unansweredMcq) {
          router.replace(`/careers/${id}/apply/exam/mcq`);
          return;
        }
      }

      // Check if trying to access long-answers without completing mcq or short-answers
      if (isLongAnswersPage) {
        if (types.includes("mcq") && !completedStages.mcq) {
          if (mcqQuestions.some((q) => mcqAnswers[q.id] === undefined)) {
            router.replace(`/careers/${id}/apply/exam/mcq`);
            return;
          }
        }
        if (types.includes("short_answers") && !completedStages.short_answers) {
          if (shortQuestions.some((q) => !shortAnswers[q.id]?.trim())) {
            router.replace(`/careers/${id}/apply/exam/short-answers`);
            return;
          }
        }
      }
    }
  }, [
    hydrated,
    isStarted,
    isCompleted,
    isShortAnswersPage,
    isLongAnswersPage,
    types,
    mcqAnswers,
    shortAnswers,
    completedStages,
    positionId,
    id,
    router,
    mcqQuestions,
    shortQuestions,
  ]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const activeStage = types.find((type: string) => !completedStages[type]);
    if (isTimerRunning && hydrated && activeStage) {
      interval = setInterval(() => {
        tickTimer(activeStage);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, hydrated, tickTimer, completedStages, types]);

  // Auto-advance logic removed in favor of store-level timeout countdown transition

  // Redirect on finish
  useEffect(() => {
    if (isCompleted && hydrated) {
      router.replace(`/careers/${id}/apply/loading`);
    }
  }, [isCompleted, hydrated, id, router]);

  if (!hydrated || !isStarted || isCompleted) {
    return (
      <div className="font-inter py-10 text-center text-[#0D1A14]/70">
        Loading assessment...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="py-10 text-center text-[#FF4242]">
        Assessment config not found.
      </div>
    );
  }

  let questions = [];
  let answeredCount = 0;

  if (isMCQPage) {
    questions = mcqQuestions;
    answeredCount = Object.keys(mcqAnswers).length;
  } else if (isShortAnswersPage) {
    questions = shortQuestions;
    answeredCount = questions.filter((q) => !!shortAnswers[q.id]).length;
  } else if (isLongAnswersPage) {
    questions = longQuestions;
    answeredCount = questions.filter((q) => !!longAnswers[q.id]).length;
  }

  // Format time remaining MM:SS
  const remainingTime = stageTimeRemaining[currentStage] ?? 0;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const showStepper = types.length >= 2;

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Category Stepper Header */}
      {showStepper && (
        <div className="flex w-full items-start justify-between gap-1 p-4 sm:p-6">
          {types.map((type: string, idx: number) => {
            const isStepActive =
              (type === "mcq" && isMCQPage) ||
              (type === "short_answers" && isShortAnswersPage) ||
              (type === "long_answers" && isLongAnswersPage);

            const isStepCompleted = (() => {
              const currentIdx = types.indexOf(currentStage);
              return idx < currentIdx;
            })();

            const isActiveOrCompleted = isStepActive || isStepCompleted;

            const label =
              type === "mcq"
                ? "Technical Knowledge (MCQ)"
                : type === "short_answers"
                  ? "Short Answers"
                  : "Long Answers";

            return (
              <div
                key={type}
                className={cn(
                  "relative flex flex-col gap-2 sm:gap-4",
                  idx === types.length - 1 ? "flex-initial" : "flex-1"
                )}
              >
                {/* Step Label (Top) */}
                {/* Step Label (Top) */}
                <div className="flex h-7 items-start sm:h-11">
                  <span
                    className={cn(
                      "line-clamp-2 pr-1 text-left text-[11px] leading-[14px] sm:line-clamp-none sm:text-[16px] sm:leading-[22px] lg:text-[18px]",
                      isStepActive
                        ? "font-medium text-[#195236]"
                        : isStepCompleted
                          ? "font-medium text-black"
                          : "font-medium text-[#195236]/30"
                    )}
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {label}
                  </span>
                </div>

                {/* Circle + Line (Bottom) */}
                <div className="relative flex h-8 w-full items-center sm:h-[56px]">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium sm:h-10 sm:w-10 sm:text-[18px]",
                      isActiveOrCompleted
                        ? "bg-[#195236] text-[#F2F7F1]"
                        : "border border-[#E4E7EC] bg-[#F2F7F1] text-[#195236]/30"
                    )}
                  >
                    {idx + 1}
                  </div>

                  {/* Connecting Line (only if not the last step) */}
                  {idx < types.length - 1 && (
                    <div
                      className="ml-1 h-[2px] flex-1 sm:ml-2"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to right, #195236 0, #195236 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Header */}
      <div className="font-inter flex w-full items-center justify-between px-1 text-[16px] leading-6 text-[#0D1A14]">
        <span>Total questions: {questions.length}</span>
        <div className="flex items-center gap-2">
          <span className="font-normal">Time remaining:</span>
          <span
            className={cn(
              "font-mono font-medium",
              remainingTime < 180
                ? "animate-pulse text-[#FF4242]"
                : "text-[#0D1A14]"
            )}
          >
            {timeString}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="w-full rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
        <div className="relative flex flex-col gap-12">
          {children}
        </div>
      </div>

      {/* 5-Second Timeout Transition Countdown Overlay */}
      {transitionCountdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="mx-4 flex w-full max-w-[480px] flex-col items-center gap-6 rounded-[24px] border border-[#E4E7EC] bg-white p-8 text-center shadow-2xl animate-scale-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF2F2] text-[#FF4242]">
              <svg className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[24px] font-bold tracking-tight text-[#0D1A14] font-inter-tight">Time's Up!</h2>
              <p className="text-[15px] leading-[22px] text-[#0D1A14]/70 font-inter">
                Your responses for <strong>{
                  showTimeoutAlert === "mcq"
                    ? "Technical Knowledge (MCQ)"
                    : showTimeoutAlert === "short_answers"
                      ? "Short Answers"
                      : "Long Answers"
                }</strong> have been saved automatically.
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[12px] font-semibold text-[#195236]/60 font-inter uppercase tracking-wider">Moving to next stage in</span>
              <span className="text-[56px] font-bold text-[#195236] font-mono leading-none">{transitionCountdown}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
