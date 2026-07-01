"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { mcqQuestionsData, shortAnswerQuestionsData, longAnswerQuestionsData, assessmentConfigs, hasMultipleExamTypes, shouldAutoGradeAssessment } from "@/data/questions-data";
import { cn } from "@/lib/utils";

interface ExamLayoutProps {
  children: React.ReactNode;
}

export default function ExamLayout({ children }: ExamLayoutProps) {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const positionId = parseInt(id as string);
  const config = assessmentConfigs[positionId];
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
  } = useApplicationStore();

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
  const mcqQuestions = mcqQuestionsData[positionId] || [];
  const shortQuestions = shortAnswerQuestionsData[positionId] || [];
  const longQuestions = longAnswerQuestionsData[positionId] || [];
  const types = config.assessmentTypes ?? [config.assessmentType];

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
      if (isShortAnswersPage && types.includes("mcq")) {
        const mcqs = mcqQuestionsData[positionId] || [];
        const unansweredMcq = mcqs.some(q => mcqAnswers[q.id] === undefined);
        if (unansweredMcq) {
          router.replace(`/careers/${id}/apply/exam/mcq`);
          return;
        }
      }
      
      // Check if trying to access long-answers without completing mcq or short-answers
      if (isLongAnswersPage) {
        if (types.includes("mcq")) {
          const mcqs = mcqQuestionsData[positionId] || [];
          if (mcqs.some(q => mcqAnswers[q.id] === undefined)) {
            router.replace(`/careers/${id}/apply/exam/mcq`);
            return;
          }
        }
        if (types.includes("short_answers")) {
          const shortQs = shortAnswerQuestionsData[positionId] || [];
          if (shortQs.some(q => !shortAnswers[q.id]?.trim())) {
            router.replace(`/careers/${id}/apply/exam/short-answers`);
            return;
          }
        }
      }
    }
  }, [hydrated, isStarted, isCompleted, isShortAnswersPage, isLongAnswersPage, types, mcqAnswers, shortAnswers, positionId, id, router]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && hydrated) {
      interval = setInterval(() => {
        tickTimer(currentStage);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, hydrated, tickTimer, currentStage]);

  // Auto-advance if stage timer reaches 0
  useEffect(() => {
    if (hydrated && isTimerRunning) {
      const remaining = stageTimeRemaining[currentStage] ?? 0;
      if (remaining === 0) {
        const currentIndex = types.indexOf(currentStage);
        const nextType = types[currentIndex + 1];
        if (nextType === "short_answers") {
          router.replace(`/careers/${id}/apply/exam/short-answers`);
        } else if (nextType === "long_answers") {
          router.replace(`/careers/${id}/apply/exam/long-answers`);
        } else {
          completeAssessment();
        }
      }
    }
  }, [stageTimeRemaining, currentStage, hydrated, isTimerRunning, types, id, router, completeAssessment]);

  // Redirect on finish
  useEffect(() => {
    if (isCompleted && hydrated) {
      const nextRoute = shouldAutoGradeAssessment(positionId) ? "/loading" : "/submitted";
      router.replace(`/careers/${id}/apply${nextRoute}`);
    }
  }, [isCompleted, hydrated, id, router, positionId]);

  if (!hydrated || !isStarted || isCompleted) {
    return <div className="text-center py-10 font-inter text-[#0D1A14]/70">Loading assessment...</div>;
  }

  if (!config) {
    return <div className="text-center py-10 text-[#FF4242]">Assessment config not found.</div>;
  }

  let questions = [];
  let answeredCount = 0;

  if (isMCQPage) {
    questions = mcqQuestions;
    answeredCount = Object.keys(mcqAnswers).length;
  } else if (isShortAnswersPage) {
    questions = shortQuestions;
    answeredCount = questions.filter(q => !!shortAnswers[q.id]).length;
  } else if (isLongAnswersPage) {
    questions = longQuestions;
    answeredCount = questions.filter(q => !!longAnswers[q.id]).length;
  }

  // Format time remaining MM:SS
  const remainingTime = stageTimeRemaining[currentStage] ?? 0;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const hasMultipleExamTypesState = hasMultipleExamTypes(positionId);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Category Stepper Header */}
      {hasMultipleExamTypesState && (
        <div className="w-full p-4 sm:p-6 flex items-start justify-between gap-1">
          {types.map((type, idx) => {
            const isStepActive = (type === "mcq" && isMCQPage) ||
              (type === "short_answers" && isShortAnswersPage) ||
              (type === "long_answers" && isLongAnswersPage);

            const isStepCompleted = (() => {
              const currentIdx = types.indexOf(currentStage);
              return idx < currentIdx;
            })();

            const isActiveOrCompleted = isStepActive || isStepCompleted;

            const label = type === "mcq"
              ? "Technical Knowledge (MCQ)"
              : type === "short_answers"
                ? "Short Answers"
                : "Long Answers";

            return (
              <div
                key={type}
                className={cn(
                  "flex flex-col gap-2 sm:gap-4 relative",
                  idx === types.length - 1 ? "flex-initial" : "flex-1"
                )}
              >
                {/* Step Label (Top) */}
                {/* Step Label (Top) */}
                <div className="h-7 sm:h-11 flex items-start">
                  <span
                    className={cn(
                      "text-[11px] sm:text-[16px] lg:text-[18px] leading-[14px] sm:leading-[22px] text-left line-clamp-2 sm:line-clamp-none pr-1",
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
                <div className="relative w-full h-8 sm:h-[56px] flex items-center">
                  {/* Step Circle */}
                  <div className={cn(
                    "w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium text-[11px] sm:text-[18px] z-10 shrink-0",
                    isActiveOrCompleted
                      ? "bg-[#195236] text-[#F2F7F1]"
                      : "bg-[#F2F7F1] text-[#195236]/30 border border-[#E4E7EC]"
                  )}>
                    {idx + 1}
                  </div>

                  {/* Connecting Line (only if not the last step) */}
                  {idx < types.length - 1 && (
                    <div
                      className="flex-1 h-[2px] ml-1 sm:ml-2"
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
      <div className="w-full flex items-center justify-between text-[#0D1A14] font-inter text-[16px] leading-6 px-1">
        <span>Total questions: {questions.length}</span>
        <div className="flex items-center gap-2">
          <span className="font-normal">Time remaining:</span>
          <span className={cn(
            "font-mono font-medium",
            remainingTime < 180 ? "text-[#FF4242] animate-pulse" : "text-[#0D1A14]"
          )}>
            {timeString}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col gap-12 relative">

          {children}
        </div>
      </div>
    </div>
  );
}
