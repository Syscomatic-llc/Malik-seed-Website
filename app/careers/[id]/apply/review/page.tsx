"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { mcqQuestionsData, shortAnswerQuestionsData, longAnswerQuestionsData, assessmentConfigs } from "@/data/questions-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssessmentTypes, hasWrittenAssessment, hasShortAnswersAssessment, hasLongAnswersAssessment } from "@/data/questions-data";
import { McqDevAnswerKey, McqDevReviewBadge } from "@/components/dev/McqDevHints";
import { isDevEnvironment } from "@/lib/assessment-grading";

export default function ReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isStarted, isCompleted, mcqAnswers, shortAnswers, longAnswers, completeAssessment, assessmentConfig } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const positionId = parseInt(id as string);
  const config = assessmentConfig ?? assessmentConfigs[positionId];
  const types = config?.assessmentTypes ?? (config ? [config.assessmentType] : []);

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
      if (types.includes("long_answers")) {
        const longQs = longAnswerQuestionsData[positionId] || [];
        if (longQs.some(q => !longAnswers[q.id]?.trim())) {
          router.replace(`/careers/${id}/apply/exam/long-answers`);
          return;
        }
      }
    }
  }, [hydrated, isStarted, isCompleted, types, mcqAnswers, shortAnswers, longAnswers, positionId, id, router]);

  if (!hydrated || !isStarted) {
    return <div className="text-center py-10">Loading responses...</div>;
  }

  if (!config) {
    return <div className="text-center py-10 text-[#FF4242]">Assessment config not found.</div>;
  }

  const showMcqReview = types.includes("mcq");
  const hasShortAnswers = hasShortAnswersAssessment(positionId);
  const hasLongAnswers = hasLongAnswersAssessment(positionId);
  const hasWritten = hasWrittenAssessment(positionId);

  const mcqQuestions = mcqQuestionsData[positionId] || [];
  const shortQuestions = shortAnswerQuestionsData[positionId] || [];
  const longQuestions = longAnswerQuestionsData[positionId] || [];

  const optionPrefixes = ["A. ", "B. ", "C. ", "D. "];
  const submitRoute = hasWritten ? `/careers/${id}/apply/submitted` : `/careers/${id}/apply/loading`;
  const backRoute = longQuestions.length > 0
    ? `/careers/${id}/apply/exam/long-answers`
    : shortQuestions.length > 0
      ? `/careers/${id}/apply/exam/short-answers`
      : `/careers/${id}/apply/exam/mcq`;

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="flex flex-col gap-6 max-w-[800px] mx-auto py-4">
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
            className="flex items-center gap-2 text-[#195236] hover:underline font-semibold text-[15px] self-start"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <h1 
            className="text-[28px] font-bold text-[#0D1A14] leading-[36px]"
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

        <hr className="w-full border-t border-[#E4E7EC] my-2" />

        {/* MCQ review */}
        {showMcqReview && mcqQuestions.length > 0 && (
          <div className="flex flex-col gap-12">
            {isDevEnvironment() && (
              <div className="rounded-xl border-2 border-dashed border-yellow-400 bg-yellow-50 px-4 py-3 font-mono text-[12px] text-yellow-900">
                🛠 DEV mode — review shows ✓/✗ vs correct answer key per MCQ.
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
                <div key={q.id} className="flex flex-col gap-4 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-normal font-inter-tight text-[16px] text-[#0D1A14] leading-[24px]">
                      Q{index + 1}: {q.question}
                    </h3>
                    <McqDevReviewBadge question={q} questionIndex={index} selectedOption={selectedOption} />
                  </div>
                  <McqDevAnswerKey question={q} questionIndex={index} />

                  <div className="flex flex-col gap-1 w-full">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className="w-full flex items-center justify-start gap-4 py-2 text-left select-none border-b border-transparent"
                        >
                          {/* Circular radio indicator (read-only) */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                              isSelected
                                ? "border-[#195236] bg-[#195236]"
                                : "border-[#D0D5DD] bg-white"
                            )}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="font-normal font-inter text-[16px] leading-[24px] text-[#0D1A14]">
                            {optionPrefixes[optIdx]}{opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {selectedOption === undefined && (
                    <p className="pl-8 text-[13px] text-[#FF4242] font-inter italic">
                      No answer selected.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showMcqReview && hasWritten && <hr className="w-full border-t border-[#E4E7EC] my-4" />}

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
                <div key={q.id} className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[14px] text-[#667085] font-semibold font-inter">
                      Question {index + 1}:
                    </span>
                    {q.description && (
                      <h3 className="font-inter-tight text-[16px] lg:text-[17px] font-semibold text-[#0D1A14]">
                        {q.description}
                      </h3>
                    )}
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E4E7EC] rounded-[12px] p-4 font-inter text-[15px] leading-[24px] text-[#0D1A14]/80 whitespace-pre-wrap min-h-[100px]">
                    {answerText ? answerText : <em className="text-gray-400">No response provided.</em>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasShortAnswers && hasLongAnswers && <hr className="w-full border-t border-[#E4E7EC] my-4" />}

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
                <div key={q.id} className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[14px] text-[#667085] font-semibold font-inter">
                      Question {index + 1}:
                    </span>
                    {q.description && (
                      <h3 className="font-inter-tight text-[16px] lg:text-[17px] font-semibold text-[#0D1A14]">
                        {q.description}
                      </h3>
                    )}
                  </div>

                  {q.subBullets && q.subBullets.length > 0 && (
                    <ul className="list-disc pl-5 flex flex-col gap-1 font-inter text-[13px] text-[#0D1A14]/60">
                      {q.subBullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  <div className="bg-[#F9FAFB] border border-[#E4E7EC] rounded-[12px] p-4 font-inter text-[15px] leading-[24px] text-[#0D1A14]/80 whitespace-pre-wrap min-h-[100px]">
                    {answerText ? answerText : <em className="text-gray-400">No response provided.</em>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end border-t border-[#E4E7EC] pt-6 mt-6">
          {isCompleted ? (
            <Button
              onClick={() => {
                router.push(`/careers/${id}/apply/submitted`);
              }}
              className="bg-[#F2F4F7] hover:bg-[#e4e7ec] border border-[#E4E7EC] text-[#414E62] rounded-[60px] h-[46px] px-8 font-semibold font-inter-tight cursor-pointer"
            >
              Back to Status
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowConfirmPopup(true);
              }}
              className="bg-[#195236] hover:bg-[#153e28] text-white rounded-[60px] h-[46px] px-8 font-semibold font-inter-tight cursor-pointer"
            >
              Submit Assessment
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Submission Popup Modal */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-[#0D1A14]/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white border border-[#E4E7EC] rounded-[20px] p-6 max-w-[420px] w-full mx-4 shadow-xl flex flex-col gap-6 items-center text-center">
            {/* Alert Icon Circle */}
            <div className="w-12 h-12 rounded-full bg-[#195236]/10 text-[#195236] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14M12 17.01L12.01 16.998M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-inter-tight text-[18px] font-semibold text-[#0D1A14]">
                Submit Assessment?
              </h3>
              <p className="font-inter text-[14px] text-[#414E62] leading-[21px]">
                Are you sure you want to submit your assessment? You cannot change your answers after submission.
              </p>
            </div>
            
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="flex-1 border border-[#E4E7EC] bg-[#F2F4F7] text-[#414E62] font-inter-tight font-medium text-[16px] h-11 rounded-[60px] hover:bg-[#e4e7ec] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  completeAssessment();
                  router.push(submitRoute);
                }}
                className="flex-1 bg-[#195236] text-[#F2F7F1] font-inter-tight font-medium text-[16px] h-11 rounded-[60px] hover:bg-[#153e28] transition-colors cursor-pointer"
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
