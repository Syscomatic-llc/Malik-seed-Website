"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  mcqQuestionsData,
  shortAnswerQuestionsData,
  longAnswerQuestionsData,
  assessmentConfigs,
} from "@/data/questions-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAssessmentTypes,
  hasWrittenAssessment,
  hasShortAnswersAssessment,
  hasLongAnswersAssessment,
} from "@/data/questions-data";
import {
  McqDevAnswerKey,
  McqDevReviewBadge,
} from "@/components/dev/McqDevHints";
import { isDevEnvironment } from "@/lib/assessment-grading";

export default function ReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    isOtpVerified,
    isStarted,
    isCompleted,
    mcqAnswers,
    shortAnswers,
    longAnswers,
    completeAssessment,
    assessmentConfig,
  } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const positionId = parseInt(id as string);
  const config = assessmentConfig ?? assessmentConfigs[positionId];
  const types =
    config?.assessmentTypes ?? (config ? [config.assessmentType] : []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isStarted) {
        router.replace(`/careers/${id}/apply/start`);
      }
    }
  }, [isOtpVerified, isStarted, hydrated, id, router]);

  useEffect(() => {
    if (hydrated && isStarted && !isCompleted) {
      if (types.includes("mcq")) {
        const mcqs = mcqQuestionsData[positionId] || [];
        if (mcqs.some((q) => mcqAnswers[q.id] === undefined)) {
          router.replace(`/careers/${id}/apply/exam/mcq`);
          return;
        }
      }
      if (types.includes("short_answers")) {
        const shortQs = shortAnswerQuestionsData[positionId] || [];
        if (shortQs.some((q) => !shortAnswers[q.id]?.trim())) {
          router.replace(`/careers/${id}/apply/exam/short-answers`);
          return;
        }
      }
      if (types.includes("long_answers")) {
        const longQs = longAnswerQuestionsData[positionId] || [];
        if (longQs.some((q) => !longAnswers[q.id]?.trim())) {
          router.replace(`/careers/${id}/apply/exam/long-answers`);
          return;
        }
      }
    }
  }, [
    hydrated,
    isStarted,
    isCompleted,
    types,
    mcqAnswers,
    shortAnswers,
    longAnswers,
    positionId,
    id,
    router,
  ]);

  if (!hydrated || !isStarted) {
    return <div className="py-10 text-center">Loading responses...</div>;
  }

  if (!config) {
    return (
      <div className="py-10 text-center text-[#FF4242]">
        Assessment config not found.
      </div>
    );
  }

  const showMcqReview = types.includes("mcq");
  const hasShortAnswers = hasShortAnswersAssessment(positionId);
  const hasLongAnswers = hasLongAnswersAssessment(positionId);
  const hasWritten = hasWrittenAssessment(positionId);

  const mcqQuestions = mcqQuestionsData[positionId] || [];
  const shortQuestions = shortAnswerQuestionsData[positionId] || [];
  const longQuestions = longAnswerQuestionsData[positionId] || [];

  const optionPrefixes = ["A. ", "B. ", "C. ", "D. "];
  const submitRoute = hasWritten
    ? `/careers/${id}/apply/submitted`
    : `/careers/${id}/apply/loading`;
  const backRoute =
    longQuestions.length > 0
      ? `/careers/${id}/apply/exam/long-answers`
      : shortQuestions.length > 0
        ? `/careers/${id}/apply/exam/short-answers`
        : `/careers/${id}/apply/exam/mcq`;

  return (
    <div className="min-h-[400px] w-full rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="mx-auto flex max-w-[800px] flex-col gap-6 py-4">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              if (isCompleted) {
                router.push(`/careers/${id}/apply/submitted`);
              } else {
                router.push(backRoute);
              }
            }}
            className="flex items-center gap-2 self-start text-[15px] font-semibold text-[#195236] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <h1
            className="text-[28px] leading-[36px] font-bold text-[#0D1A14]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Review Your Responses
          </h1>
          <p className="font-inter text-[15px] leading-[24px] text-[#0D1A14]/70">
            {isCompleted
              ? "Your responses have been successfully submitted and are now in read-only mode. You cannot make any further changes."
              : "Please take a moment to review your answers. You can go back to make changes if needed. Once submitted, your responses are final and cannot be modified."}
          </p>
        </div>

        <hr className="my-2 w-full border-t border-[#E4E7EC]" />

        {/* MCQ review */}
        {showMcqReview && mcqQuestions.length > 0 && (
          <div className="flex flex-col gap-12">
            {isDevEnvironment() && (
              <div className="rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 px-4 py-3 font-mono text-[12px] text-yellow-900">
                🛠 DEV mode - review shows ✓/✗ vs correct answer key per MCQ.
              </div>
            )}
            <h2
              className="text-[20px] font-bold text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              MCQ Responses
            </h2>
            {mcqQuestions.map((q, index) => {
              const selectedOption = mcqAnswers[q.id];

              return (
                <div key={q.id} className="flex w-full flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-inter-tight text-[16px] leading-[24px] font-normal text-[#0D1A14]">
                      Q{index + 1}: {q.question}
                    </h3>
                    <McqDevReviewBadge
                      question={q}
                      questionIndex={index}
                      selectedOption={selectedOption}
                    />
                  </div>
                  <McqDevAnswerKey question={q} questionIndex={index} />

                  <div className="flex w-full flex-col gap-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className="flex w-full items-center justify-start gap-4 border-b border-transparent py-2 text-left select-none"
                        >
                          {/* Circular radio indicator (read-only) */}
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
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
                        </div>
                      );
                    })}
                  </div>

                  {selectedOption === undefined && (
                    <p className="font-inter pl-8 text-[13px] text-[#FF4242] italic">
                      No answer selected.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showMcqReview && hasWritten && (
          <hr className="my-4 w-full border-t border-[#E4E7EC]" />
        )}

        {/* Short Answers Review */}
        {hasShortAnswers && shortQuestions.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2
              className="text-[20px] font-bold text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Short Answer Responses
            </h2>
            {shortQuestions.map((q, index) => {
              const answerText = shortAnswers[q.id] || "";
              return (
                <div key={q.id} className="flex w-full flex-col gap-3">
                  <div className="flex w-full flex-col gap-1">
                    <span className="font-inter text-[14px] font-semibold text-[#667085]">
                      Question {index + 1}:
                    </span>
                    {q.description && (
                      <h3 className="font-inter-tight text-[16px] font-semibold text-[#0D1A14] lg:text-[17px]">
                        {q.description}
                      </h3>
                    )}
                  </div>

                  <div className="font-inter min-h-[100px] rounded-[12px] border border-[#E4E7EC] bg-[#F9FAFB] p-4 text-[15px] leading-[24px] whitespace-pre-wrap text-[#0D1A14]/80">
                    {answerText ? (
                      answerText
                    ) : (
                      <em className="text-gray-400">No response provided.</em>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasShortAnswers && hasLongAnswers && (
          <hr className="my-4 w-full border-t border-[#E4E7EC]" />
        )}

        {/* Long Answers Review */}
        {hasLongAnswers && longQuestions.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2
              className="text-[20px] font-bold text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Long Answer Responses
            </h2>
            {longQuestions.map((q, index) => {
              const answerText = longAnswers[q.id] || "";
              return (
                <div key={q.id} className="flex w-full flex-col gap-3">
                  <div className="flex w-full flex-col gap-1">
                    <span className="font-inter text-[14px] font-semibold text-[#667085]">
                      Question {index + 1}:
                    </span>
                    {q.description && (
                      <h3 className="font-inter-tight text-[16px] font-semibold text-[#0D1A14] lg:text-[17px]">
                        {q.description}
                      </h3>
                    )}
                  </div>

                  {q.subBullets && q.subBullets.length > 0 && (
                    <ul className="font-inter flex list-disc flex-col gap-1 pl-5 text-[13px] text-[#0D1A14]/60">
                      {q.subBullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  <div className="font-inter min-h-[100px] rounded-[12px] border border-[#E4E7EC] bg-[#F9FAFB] p-4 text-[15px] leading-[24px] whitespace-pre-wrap text-[#0D1A14]/80">
                    {answerText ? (
                      answerText
                    ) : (
                      <em className="text-gray-400">No response provided.</em>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-[#E4E7EC] pt-6">
          {isCompleted ? (
            <Button
              onClick={() => {
                router.push(`/careers/${id}/apply/submitted`);
              }}
              className="font-inter-tight h-[46px] cursor-pointer rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] px-8 font-semibold text-[#414E62] hover:bg-[#e4e7ec]"
            >
              Back to Status
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowConfirmPopup(true);
              }}
              className="font-inter-tight h-[46px] cursor-pointer rounded-[60px] bg-[#195236] px-8 font-semibold text-white hover:bg-[#153e28]"
            >
              Submit Assessment
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Submission Popup Modal */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1A14]/40 backdrop-blur-sm transition-all duration-300">
          <div className="mx-4 flex w-full max-w-[420px] flex-col items-center gap-6 rounded-[20px] border border-[#E4E7EC] bg-white p-6 text-center shadow-xl">
            {/* Alert Icon Circle */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#195236]/10 text-[#195236]">
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
                Submit Assessment?
              </h3>
              <p className="font-inter text-[14px] leading-[21px] text-[#414E62]">
                Are you sure you want to submit your assessment? You cannot
                change your answers after submission.
              </p>
            </div>

            <div className="flex w-full gap-4">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="font-inter-tight h-11 flex-1 cursor-pointer rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] text-[16px] font-medium text-[#414E62] transition-colors hover:bg-[#e4e7ec]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  completeAssessment();
                  router.push(submitRoute);
                }}
                className="font-inter-tight h-11 flex-1 cursor-pointer rounded-[60px] bg-[#195236] text-[16px] font-medium text-[#F2F7F1] transition-colors hover:bg-[#153e28]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
