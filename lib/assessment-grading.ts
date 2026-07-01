import {
  assessmentConfigs,
  mcqQuestionsData,
  shouldAutoGradeAssessment,
} from "@/data/questions-data";

export interface McqQuestionBreakdown {
  questionId: string;
  question: string;
  selectedIndex: number | undefined;
  correctIndex: number;
  isCorrect: boolean;
  selectedLabel: string;
  correctLabel: string;
}

export interface McqGradingResult {
  score: number;
  isPassed: boolean;
  correctCount: number;
  totalCount: number;
  passingScorePercent: number;
  breakdown: McqQuestionBreakdown[];
}

const OPTION_LABELS = ["A", "B", "C", "D"];

function formatOptionLabel(index: number, options: string[]): string {
  const letter = OPTION_LABELS[index] ?? "?";
  const text = options[index] ?? "—";
  return `${letter}. ${text}`;
}

export function gradeMcqAssessment(
  positionId: number,
  mcqAnswers: Record<string, number>
): McqGradingResult | null {
  if (!shouldAutoGradeAssessment(positionId)) return null;

  const config = assessmentConfigs[positionId];
  const questions = mcqQuestionsData[positionId] || [];
  if (!config || questions.length === 0) return null;

  let correctCount = 0;
  const breakdown: McqQuestionBreakdown[] = questions.map((q) => {
    const selectedIndex = mcqAnswers[q.id];
    const isCorrect = selectedIndex === q.correctAnswer;
    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      question: q.question,
      selectedIndex,
      correctIndex: q.correctAnswer,
      isCorrect,
      selectedLabel:
        selectedIndex === undefined
          ? "No answer"
          : formatOptionLabel(selectedIndex, q.options),
      correctLabel: formatOptionLabel(q.correctAnswer, q.options),
    };
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const isPassed = score >= config.passingScorePercent;

  return {
    score,
    isPassed,
    correctCount,
    totalCount: questions.length,
    passingScorePercent: config.passingScorePercent,
    breakdown,
  };
}

export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}

export { OPTION_LABELS };
