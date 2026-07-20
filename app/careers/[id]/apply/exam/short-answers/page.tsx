"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  shortAnswerQuestionsData,
  assessmentConfigs,
} from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { z } from "zod";
import { cn } from "@/lib/utils";

export default function ShortAnswersPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    shortAnswers,
    setShortAnswer,
    completedStages,
    completeStage,
    assessmentConfig,
    dynamicShortQuestions,
  } = useApplicationStore();

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  const positionId = position ? position.id : parseInt(id as string);
  const questions = dynamicShortQuestions.length > 0 ? dynamicShortQuestions : (shortAnswerQuestionsData[positionId] || []);
  const config = assessmentConfig ?? assessmentConfigs[positionId];

  if (!config || questions.length === 0) {
    return (
      <div className="py-10 text-center text-[#FF4242]">
        Short answer assessment not found.
      </div>
    );
  }

  const types = config.assessmentTypes ?? [config.assessmentType];

  const handleNext = () => {
    const currentIndex = types.indexOf("short_answers");
    const nextType = types[currentIndex + 1];

    // If short answers stage is completed, skip validation and navigate
    const isCompletedStage = completedStages["short_answers"];
    if (isCompletedStage) {
      if (nextType === "long_answers") {
        router.push(`/careers/${id}/apply/exam/long-answers`);
      } else {
        router.push(`/careers/${id}/apply/review`);
      }
      return;
    }

    // Generate Zod validation schema for all active questions
    const schemaShape = questions.reduce(
      (acc, q) => {
        acc[q.id] = z.string().trim().min(1, {
          message: `Response is required for all fields`,
        });
        return acc;
      },
      {} as Record<string, z.ZodTypeAny>
    );

    const shortAnswersSchema = z.object(schemaShape);
    const result = shortAnswersSchema.safeParse(shortAnswers);

    if (!result.success) {
      const unansweredCount = questions.filter(
        (q) => !shortAnswers[q.id]?.trim()
      ).length;
      setErrorMessage(
        `Please answer all questions before proceeding. You have ${unansweredCount} unanswered questions.`
      );
      setShowErrorPopup(true);
      return;
    }

    completeStage("short_answers");

    if (nextType === "long_answers") {
      router.push(`/careers/${id}/apply/exam/long-answers`);
    } else {
      router.push(`/careers/${id}/apply/review`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = types.indexOf("short_answers");
    const prevType = types[currentIndex - 1];

    if (prevType === "mcq") {
      router.push(`/careers/${id}/apply/exam/mcq`);
    } else {
      router.push(`/careers/${id}/apply/start`);
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-12">
      {/* Questions list */}
      <div className="flex flex-col gap-12">
        {questions.map((q, index) => {
          const answerText = shortAnswers[q.id] || "";
          const characterCount = answerText.length;

          return (
            <div key={q.id} className="flex w-full flex-col gap-6">
              {/* Question Info Block */}
              <div className="flex w-full flex-col gap-3">
                <span
                  className="text-[16px] leading-[24px] font-semibold text-[#0D1A14]"
                  style={{ fontFamily: "var(--font-inter-tight)" }}
                >
                  Question {index + 1}:{" "}
                  <span className="ml-0.5 font-semibold text-[#FF4242]">*</span>
                </span>
                {q.question && !q.question.toLowerCase().startsWith("question") && (
                  <p
                    className="text-[16px] leading-[24px] text-[#0D1A14]"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {q.question}
                  </p>
                )}
                {q.description && (
                  <p
                    className="text-[16px] leading-[24px] text-[#0D1A14]"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {q.description}
                  </p>
                )}

                {/* Detailed descriptions */}
                {q.subBullets && q.subBullets.length > 0 && (
                  <div className="mt-2 flex w-full flex-col gap-2">
                    <span
                      className="text-[14px] leading-[21px] text-[#0D1A14]"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      Describe in detail how you would:
                    </span>
                    <ul
                      className="flex list-disc flex-col gap-1 pl-5 text-[14px] leading-[21px] text-[#0D1A14]"
                      style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                      {q.subBullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {q.placeholder && (
                  <p
                    className="mt-2 text-[14px] leading-[21px] text-[#0D1A14]"
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {q.placeholder}
                  </p>
                )}
              </div>

              {/* Response Input card */}
              <div className="w-full overflow-hidden rounded-[16px] border border-[#E4E7EC] bg-white transition-all focus-within:border-[#195236]">
                {/* Textarea Header Bar */}
                <div className="flex items-center justify-between border-b border-[#E4E7EC] bg-white px-6 py-4 text-[14px] text-[#414E62]">
                  <span className="font-inter">Your response here</span>
                  <span className="font-inter font-medium text-[#0D1A14]">
                    {characterCount} / 500
                  </span>
                </div>
                {/* Textarea input field */}
                <textarea
                  value={answerText}
                  disabled={completedStages["short_answers"]}
                  onChange={(e) =>
                    setShortAnswer(q.id, e.target.value.slice(0, 500))
                  }
                  className={cn(
                    "font-inter min-h-[180px] w-full resize-none bg-white p-6 text-[14px] leading-[21px] text-[#414E62] placeholder:text-[#414E62]/40 focus:outline-none",
                    completedStages["short_answers"] &&
                    "cursor-not-allowed bg-gray-50 text-gray-500"
                  )}
                />
              </div>

              {/* Divider Line between questions */}
              {index < questions.length - 1 && (
                <hr className="mt-6 w-full border-t border-[#E4E7EC]" />
              )}
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
