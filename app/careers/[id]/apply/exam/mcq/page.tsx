"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  mcqQuestionsData,
  assessmentConfigs,
  getAssessmentTypes,
} from "@/data/questions-data";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  McqDevAnswerKey,
  McqDevOptionHighlight,
} from "@/components/dev/McqDevHints";
import { isDevEnvironment } from "@/lib/assessment-grading";

export default function MCQAssessmentPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    mcqAnswers,
    setMCQAnswer,
    completedStages,
    completeStage,
    assessmentConfig,
  } = useApplicationStore();

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const positionId = parseInt(id as string);
  const questions = mcqQuestionsData[positionId] || [];
  const config = assessmentConfig ?? assessmentConfigs[positionId];

  if (!config || questions.length === 0) {
    return (
      <div className="py-10 text-center text-[#FF4242]">
        MCQ assessment not found.
      </div>
    );
  }

  const handleNext = () => {
    const types = getAssessmentTypes(positionId);
    const currentIndex = types.indexOf("mcq");
    const nextType = types[currentIndex + 1];

    // If MCQ stage is completed, skip validation and navigate
    const isCompletedStage = completedStages["mcq"];
    if (isCompletedStage) {
      if (nextType === "short_answers") {
        router.push(`/careers/${id}/apply/exam/short-answers`);
      } else if (nextType === "long_answers") {
        router.push(`/careers/${id}/apply/exam/long-answers`);
      } else {
        router.push(`/careers/${id}/apply/review`);
      }
      return;
    }

    // Generate validation schema shape for all active questions
    const schemaShape = questions.reduce(
      (acc, q) => {
        acc[q.id] = z.number();
        return acc;
      },
      {} as Record<string, z.ZodTypeAny>
    );

    const mcqSchema = z.object(schemaShape);
    const result = mcqSchema.safeParse(mcqAnswers);

    if (!result.success) {
      const unansweredCount = questions.filter(
        (q) => mcqAnswers[q.id] === undefined
      ).length;
      setErrorMessage(
        `Please answer all questions before proceeding. You have ${unansweredCount} unanswered questions.`
      );
      setShowErrorPopup(true);
      return;
    }

    completeStage("mcq");

    if (nextType === "short_answers") {
      router.push(`/careers/${id}/apply/exam/short-answers`);
    } else if (nextType === "long_answers") {
      router.push(`/careers/${id}/apply/exam/long-answers`);
    } else {
      router.push(`/careers/${id}/apply/review`);
    }
  };

  const handlePrevious = () => {
    router.push(`/careers/${id}/apply/start`);
  };

  const optionPrefixes = ["A. ", "B. ", "C. ", "D. "];

  return (
    <div className="relative flex w-full flex-col gap-12">
      {isDevEnvironment() && (
        <div className="rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 px-4 py-3 font-mono text-[12px] text-yellow-900">
          🛠 DEV mode - correct answers shown below each question. Tags mark
          selected vs correct options.
        </div>
      )}
      {/* Questions list */}
      <div className="flex flex-col gap-12">
        {questions.map((q, index) => {
          const selectedOption = mcqAnswers[q.id];
          return (
            <div key={q.id} className="flex w-full flex-col gap-4">
              <h3 className="font-inter-tight text-[16px] leading-[24px] font-normal text-[#0D1A14]">
                Q{index + 1}: {q.question}{" "}
                <span className="ml-0.5 font-semibold text-[#FF4242]">*</span>
              </h3>
              <McqDevAnswerKey question={q} questionIndex={index} />

              <div className="flex w-full flex-col gap-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrectOption = optIdx === q.correctAnswer;
                  const isCompletedStage = completedStages["mcq"];
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isCompletedStage}
                      onClick={() => setMCQAnswer(q.id, optIdx)}
                      className={cn(
                        "flex w-full items-center justify-start gap-4 border-b border-transparent py-2 text-left transition-all duration-200 select-none",
                        isCompletedStage
                          ? "cursor-not-allowed opacity-80"
                          : "cursor-pointer",
                        isDevEnvironment() &&
                          isCorrectOption &&
                          "rounded-lg bg-[#00BA00]/5 ring-1 ring-[#00BA00]/30"
                      )}
                    >
                      {/* Circular radio indicator */}
                      <div
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                          isSelected
                            ? "border-[#195236] bg-[#195236]"
                            : "border-[#D0D5DD] bg-white"
                        )}
                      >
                        {isSelected && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-inter text-[16px] leading-[24px] font-normal text-[#0D1A14]">
                        {optionPrefixes[optIdx]}
                        {opt}
                      </span>
                      <McqDevOptionHighlight
                        question={q}
                        optIdx={optIdx}
                        isSelected={isSelected}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="mt-4 w-full border-t border-[#E4E7EC]" />

      {/* Action Row */}
      <div className="flex w-full items-center justify-between pt-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrevious}
          className="flex h-[46px] w-[113px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] text-[16px] font-medium text-[#414E62] transition-all duration-200 select-none hover:bg-gray-100 active:scale-95"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          <ArrowIcon className="h-5 w-5" direction="left" />
          <span>Back</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex h-[46px] w-[112px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-transparent bg-[#195236] text-[16px] font-medium text-[#F2F7F1] transition-all duration-200 select-none hover:bg-[#153e28] active:scale-95"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          <span>Next</span>
          <ArrowIcon className="h-5 w-5" direction="right" />
        </button>
      </div>

      {/* Action Required Error Popup Modal */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1A14]/40 backdrop-blur-sm transition-all duration-300">
          <div className="mx-4 flex w-full max-w-[400px] flex-col items-center gap-6 rounded-[20px] border border-[#E4E7EC] bg-white p-6 text-center shadow-xl">
            {/* Warning Icon Circle */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4242]/10 text-[#FF4242]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V14M12 17.01L12.01 16.998M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-inter-tight text-[18px] font-semibold text-[#0D1A14]">
                Action Required
              </h3>
              <p className="font-inter text-[14px] leading-[21px] text-[#414E62]">
                {errorMessage}
              </p>
            </div>

            <button
              onClick={() => setShowErrorPopup(false)}
              className="font-inter-tight h-11 w-full cursor-pointer rounded-[60px] bg-[#195236] text-[16px] font-medium text-[#F2F7F1] transition-colors hover:bg-[#153e28]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
