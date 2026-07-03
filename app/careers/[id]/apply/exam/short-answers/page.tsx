"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { shortAnswerQuestionsData, assessmentConfigs } from "@/data/questions-data";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { z } from "zod";
import { cn } from "@/lib/utils";

export default function ShortAnswersPage() {
  const router = useRouter();
  const { id } = useParams();
  const { shortAnswers, setShortAnswer, completedStages, completeStage, assessmentConfig } = useApplicationStore();

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const positionId = parseInt(id as string);
  const questions = shortAnswerQuestionsData[positionId] || [];
  const config = assessmentConfig ?? assessmentConfigs[positionId];

  if (!config || questions.length === 0) {
    return <div className="text-center py-10 text-[#FF4242]">Short answer assessment not found.</div>;
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
    const schemaShape = questions.reduce((acc, q) => {
      acc[q.id] = z.string().trim().min(1, {
        message: `Response is required for all fields`
      });
      return acc;
    }, {} as Record<string, z.ZodTypeAny>);

    const shortAnswersSchema = z.object(schemaShape);
    const result = shortAnswersSchema.safeParse(shortAnswers);

    if (!result.success) {
      const unansweredCount = questions.filter(q => !shortAnswers[q.id]?.trim()).length;
      setErrorMessage(`Please answer all questions before proceeding. You have ${unansweredCount} unanswered questions.`);
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
    <div className="flex flex-col gap-12 relative w-full">
      {/* Questions list */}
      <div className="flex flex-col gap-12">
        {questions.map((q, index) => {
          const answerText = shortAnswers[q.id] || "";
          const characterCount = answerText.length;

          return (
            <div key={q.id} className="w-full flex flex-col gap-6">
              {/* Question Info Block */}
              <div className="flex flex-col gap-3 w-full">
                <span className="text-[16px] font-semibold text-[#0D1A14] leading-[24px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                  Question {index + 1}: <span className="text-[#FF4242] ml-0.5 font-semibold">*</span>
                </span>
                {q.description && (
                  <p className="text-[16px] text-[#0D1A14] leading-[24px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                    {q.description}
                  </p>
                )}
                
                {/* Detailed descriptions */}
                {q.subBullets && q.subBullets.length > 0 && (
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <span className="text-[14px] text-[#0D1A14] leading-[21px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                      Describe in detail how you would:
                    </span>
                    <ul className="list-disc pl-5 flex flex-col gap-1 text-[14px] text-[#0D1A14] leading-[21px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
                      {q.subBullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {q.placeholder && (
                  <p className="text-[14px] text-[#0D1A14] leading-[21px] mt-2" style={{ fontFamily: "var(--font-inter-tight)" }}>
                    {q.placeholder}
                  </p>
                )}
              </div>

              {/* Response Input card */}
              <div className="w-full border border-[#E4E7EC] bg-white rounded-[16px] overflow-hidden focus-within:border-[#195236] transition-all">
                {/* Textarea Header Bar */}
                <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-[#E4E7EC] text-[14px] text-[#414E62]">
                  <span className="font-inter">Your response here</span>
                  <span className="font-inter text-[#0D1A14] font-medium">
                    {characterCount} / 500
                  </span>
                </div>
                {/* Textarea input field */}
                <textarea
                  placeholder="Type your response here..."
                  value={answerText}
                  disabled={completedStages["short_answers"]}
                  onChange={(e) => setShortAnswer(q.id, e.target.value.slice(0, 500))}
                  className={cn(
                    "w-full min-h-[180px] p-6 focus:outline-none resize-none bg-white text-[#414E62] font-inter text-[14px] leading-[21px] placeholder:text-[#414E62]/40",
                    completedStages["short_answers"] && "bg-gray-50 text-gray-500 cursor-not-allowed"
                  )}
                />
              </div>

              {/* Divider Line between questions */}
              {index < questions.length - 1 && (
                <hr className="w-full border-t border-[#E4E7EC] mt-6" />
              )}
            </div>
          );
        })}
      </div>

      <hr className="w-full border-t border-[#E4E7EC] mt-4" />

      {/* Action Row */}
      <div className="flex items-center justify-between w-full pt-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrevious}
          className="flex items-center justify-center gap-[10px] rounded-[60px] h-[46px] w-[113px] font-medium text-[16px] border border-[#E4E7EC] bg-[#F2F4F7] text-[#414E62] transition-all duration-200 select-none active:scale-95 cursor-pointer hover:bg-gray-100"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          <ArrowIcon className="w-5 h-5" direction="left" />
          <span>Back</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center justify-center gap-[10px] rounded-[60px] h-[46px] w-[112px] font-medium text-[16px] border border-transparent bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28] transition-all duration-200 select-none active:scale-95 cursor-pointer"
          style={{ fontFamily: "var(--font-inter-tight)" }}
        >
          <span>Next</span>
          <ArrowIcon className="w-5 h-5" direction="right" />
        </button>
      </div>

      {/* Action Required Error Popup Modal */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-[#0D1A14]/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white border border-[#E4E7EC] rounded-[20px] p-6 max-w-[400px] w-full mx-4 shadow-xl flex flex-col gap-6 items-center text-center">
            {/* Warning Icon Circle */}
            <div className="w-12 h-12 rounded-full bg-[#FF4242]/10 text-[#FF4242] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14M12 17.01L12.01 16.998M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="font-inter-tight text-[18px] font-semibold text-[#0D1A14]">
                Action Required
              </h3>
              <p className="font-inter text-[14px] text-[#414E62] leading-[21px]">
                {errorMessage}
              </p>
            </div>
            
            <button
              onClick={() => setShowErrorPopup(false)}
              className="w-full bg-[#195236] text-[#F2F7F1] font-inter-tight font-medium text-[16px] h-11 rounded-[60px] hover:bg-[#153e28] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
