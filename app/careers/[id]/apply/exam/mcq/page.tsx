"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { mcqQuestionsData, assessmentConfigs, getAssessmentTypes } from "@/data/questions-data";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";
import { z } from "zod";

export default function MCQAssessmentPage() {
  const router = useRouter();
  const { id } = useParams();
  const { mcqAnswers, setMCQAnswer } = useApplicationStore();

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const positionId = parseInt(id as string);
  const questions = mcqQuestionsData[positionId] || [];
  const config = assessmentConfigs[positionId];

  if (!config || questions.length === 0) {
    return <div className="text-center py-10 text-[#FF4242]">MCQ assessment not found.</div>;
  }

  const handleNext = () => {
    // Generate validation schema shape for all active questions
    const schemaShape = questions.reduce((acc, q) => {
      acc[q.id] = z.number();
      return acc;
    }, {} as Record<string, z.ZodTypeAny>);

    const mcqSchema = z.object(schemaShape);
    const result = mcqSchema.safeParse(mcqAnswers);

    if (!result.success) {
      const unansweredCount = questions.filter(q => mcqAnswers[q.id] === undefined).length;
      setErrorMessage(`Please answer all questions before proceeding. You have ${unansweredCount} unanswered questions.`);
      setShowErrorPopup(true);
      return;
    }

    const types = getAssessmentTypes(positionId);
    const currentIndex = types.indexOf("mcq");
    const nextType = types[currentIndex + 1];

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
    <div className="flex flex-col gap-12 relative w-full">
      {/* Questions list */}
      <div className="flex flex-col gap-12">
        {questions.map((q, index) => {
          const selectedOption = mcqAnswers[q.id];
          return (
            <div key={q.id} className="flex flex-col gap-4 w-full">
              <h3 className="font-normal font-inter-tight text-[16px] text-[#0D1A14] leading-[24px]">
                Q{index + 1}: {q.question} <span className="text-[#FF4242] ml-0.5 font-semibold">*</span>
              </h3>

              <div className="flex flex-col gap-1 w-full">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => setMCQAnswer(q.id, optIdx)}
                      className="w-full flex items-center justify-start gap-4 py-2 text-left transition-all duration-200 cursor-pointer select-none border-b border-transparent"
                    >
                      {/* Circular radio indicator */}
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "border-[#195236] bg-[#195236]" : "border-[#D0D5DD] bg-white"
                      )}>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-normal font-inter text-[16px] leading-[24px] text-[#0D1A14]">
                        {optionPrefixes[optIdx]}{opt}
                      </span>
                    </button>
                  );
                })}
              </div>
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
