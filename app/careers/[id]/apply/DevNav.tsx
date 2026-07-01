"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApplicationStore } from "@/store/applicationStore";
import { assessmentConfigs } from "@/data/questions-data";

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
  { label: "Confirmation", path: "confirmation" },
];

export default function DevNav({ positionId }: { positionId: string }) {
  const router = useRouter();
  const store = useApplicationStore();
  const [open, setOpen] = useState(false);
  const [passMCQ, setPassMCQ] = useState(true);

  if (process.env.NODE_ENV !== "development") return null;

  const seedStateAndNavigate = (path: string) => {
    const numId = parseInt(positionId);
    const config = assessmentConfigs[numId];
    const isMCQ = config?.assessmentType === "mcq";

    // Seed all required state so guards don't redirect
    store.setPersonalInfo("Dev User", "dev@test.com");
    store.setOtpVerified(true);

    if (["start", "mcq", "short-answers", "long-answers", "review", "loading", "result", "additional-info", "submitted", "confirmation"].includes(path)) {
      store.startAssessment(numId, "Dev Position", config?.timeLimitMinutes ?? 30);
    }

    if (["review", "loading", "result", "additional-info", "submitted", "confirmation"].includes(path)) {
      // Mark as completed with seeded score
      store.setAdditionalInfo({
        isStarted: true,
        isCompleted: true,
        isGraded: true,
        score: passMCQ ? 80 : 40,
        isPassed: passMCQ,
      });
    }

    if (["additional-info", "submitted", "confirmation"].includes(path)) {
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
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2">
      {open && (
        <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-4 w-[220px] flex flex-col gap-3 border border-gray-700">
          <div className="text-xs font-bold uppercase tracking-widest text-yellow-400 border-b border-gray-700 pb-2">
            🛠 Dev Navigation
          </div>

          {/* Pass/Fail toggle for MCQ */}
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span>MCQ Result:</span>
            <button
              onClick={() => setPassMCQ(!passMCQ)}
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${passMCQ ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
            >
              {passMCQ ? "PASS" : "FAIL"}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {PAGES.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => seedStateAndNavigate(path)}
                className="text-left text-sm px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors text-gray-100"
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
        className="w-10 h-10 rounded-full bg-yellow-400 text-gray-900 font-black text-lg shadow-lg hover:bg-yellow-300 transition-colors flex items-center justify-center"
      >
        🛠
      </button>
    </div>
  );
}
