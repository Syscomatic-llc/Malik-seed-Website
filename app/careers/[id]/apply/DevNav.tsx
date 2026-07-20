"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApplicationStore } from "@/store/applicationStore";
import { assessmentConfigs, mcqQuestionsData } from "@/data/questions-data";
import { gradeMcqAssessment } from "@/lib/assessment-grading";

const PAGES = [
  { label: "Info", path: "info" },
  { label: "OTP", path: "otp" },
  { label: "Start", path: "start" },
  { label: "MCQ", path: "mcq" },
  { label: "Short Answers", path: "short-answers" },
  { label: "Long Answers", path: "long-answers" },
  { label: "Review", path: "review" },
  { label: "Loading", path: "loading" },
  { label: "Result", path: "result" },
  { label: "Additional Info", path: "additional-info" },
  { label: "Submitted", path: "submitted" },
];

export default function DevNav({ positionId }: { positionId: string }) {
  const router = useRouter();
  const store = useApplicationStore();
  const [open, setOpen] = useState(false);
  const [seedPass, setSeedPass] = useState(true);

  if (process.env.NODE_ENV !== "development") return null;

  const seedMcqAnswers = (numId: number, pass: boolean) => {
    const questions = store.dynamicMcqQuestions.length > 0 ? store.dynamicMcqQuestions : (mcqQuestionsData[numId] || []);
    questions.forEach((q) => {
      if (pass) {
        store.setMCQAnswer(q.id, q.correctAnswer);
      } else {
        const wrongIndex = q.correctAnswer === 0 ? 1 : 0;
        store.setMCQAnswer(q.id, wrongIndex);
      }
    });
  };

  const applyGradingFromAnswers = (numId: number) => {
    const result = gradeMcqAssessment(numId, store.mcqAnswers, store.dynamicMcqQuestions, store.assessmentConfig ?? undefined);
    if (result) {
      store.setGradingResult(result.score, result.isPassed);
    }
  };

  const seedStateAndNavigate = (path: string) => {
    const numId = parseInt(positionId);
    const config = assessmentConfigs[numId];

    store.setPersonalInfo("Dev User", "dev@test.com");
    store.setOtpVerified(true);

    if (
      [
        "start",
        "mcq",
        "short-answers",
        "long-answers",
        "review",
        "loading",
        "result",
        "additional-info",
        "submitted",
      ].includes(path)
    ) {
      store.startAssessment(
        numId,
        "Dev Position",
        config ?? { timeLimitMinutes: 30, assessmentType: "mcq" }
      );
    }

    if (
      [
        "mcq",
        "review",
        "loading",
        "result",
        "additional-info",
        "submitted",
      ].includes(path)
    ) {
      seedMcqAnswers(numId, seedPass);
    }

    if (
      ["review", "loading", "result", "additional-info", "submitted"].includes(
        path
      )
    ) {
      store.completeAssessment();
    }

    if (["result", "additional-info", "submitted"].includes(path)) {
      applyGradingFromAnswers(numId);
    }

    if (["additional-info", "submitted"].includes(path)) {
      store.setAdditionalInfo({
        phoneNumber: "+8801700000000",
        location: "Dhaka, Bangladesh",
        cvFileName: "resume.pdf",
        cvFileSize: 1024 * 1024,
      });
    }

    setOpen(false);
    if (["mcq", "short-answers", "long-answers"].includes(path)) {
      router.push(`/careers/${positionId}/apply/exam/${path}`);
    } else {
      router.push(`/careers/${positionId}/apply/${path}`);
    }
  };

  return (
    <div className="fixed right-5 bottom-5 z-9999 flex flex-col items-end gap-2">
      {open && (
        <div className="flex w-[240px] flex-col gap-3 rounded-xl border border-gray-700 bg-gray-900 p-4 text-white shadow-2xl">
          <div className="border-b border-gray-700 pb-2 text-xs font-bold tracking-widest text-yellow-400 uppercase">
            🛠 Dev Navigation
          </div>

          <div className="flex flex-col gap-1 text-xs text-gray-300">
            <span>Seed MCQ answers:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSeedPass(true)}
                className={`flex-1 rounded-full px-2 py-1 font-bold transition-colors ${seedPass ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                All correct
              </button>
              <button
                onClick={() => setSeedPass(false)}
                className={`flex-1 rounded-full px-2 py-1 font-bold transition-colors ${!seedPass ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                All wrong
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {PAGES.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => seedStateAndNavigate(path)}
                className="rounded-lg px-3 py-1.5 text-left text-sm text-gray-100 transition-colors hover:bg-gray-700"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        title="Dev Navigation"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-lg font-black text-gray-900 shadow-lg transition-colors hover:bg-yellow-300"
      >
        🛠
      </button>
    </div>
  );
}
