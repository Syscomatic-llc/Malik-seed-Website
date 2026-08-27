"use client";

import { cn } from "@/lib/utils";
import { isDevEnvironment, OPTION_LABELS } from "@/lib/assessment-grading";
import type { MCQQuestion } from "@/data/questions-data";

interface McqDevHintsProps {
  question: MCQQuestion;
  questionIndex: number;
  selectedOption?: number;
  variant?: "inline" | "compact";
}
export function McqDevAnswerKey({
  question,
  questionIndex,
}: {
  question: MCQQuestion;
  questionIndex: number;
}) {
  if (!isDevEnvironment()) return null;

  const letter = OPTION_LABELS[question.correctAnswer] ?? "?";
  const text = question.options[question.correctAnswer] ?? "";

  return (
    <div className="mt-1 rounded-lg border border-dashed border-[#00BA00]/40 bg-[#00BA00]/5 px-3 py-2 font-mono text-[12px] text-[#195236]">
      <span className="font-semibold">DEV Q{questionIndex + 1} key:</span>{" "}
      {letter}. {text}
    </div>
  );
}

export function McqDevOptionHighlight({
  question,
  optIdx,
  isSelected,
}: {
  question: MCQQuestion;
  optIdx: number;
  isSelected: boolean;
}) {
  if (!isDevEnvironment()) return null;

  const isCorrect = optIdx === question.correctAnswer;

  return (
    <span
      className={cn(
        "ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase",
        isCorrect && "bg-[#00BA00]/15 text-[#007A00]",
        isSelected && !isCorrect && "bg-[#FF4242]/10 text-[#FF4242]"
      )}
    >
      {isCorrect ? "correct" : isSelected ? "wrong" : ""}
    </span>
  );
}

export function McqDevReviewBadge({
  question,
  selectedOption,
}: McqDevHintsProps) {
  if (!isDevEnvironment()) return null;

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
        isCorrect
          ? "bg-[#00BA00]/15 text-[#007A00]"
          : "bg-[#FF4242]/10 text-[#FF4242]"
      )}
    >
      {isCorrect ? "✓ correct" : "✗ wrong"} - key:{" "}
      {OPTION_LABELS[question.correctAnswer]}
    </span>
  );
}
