"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "info", label: "Personal Info", paths: ["/info"] },
  { id: "otp", label: "Verification", paths: ["/otp"] },
  { id: "start", label: "Instructions", paths: ["/start"] },
  { id: "assessment", label: "Assessment", paths: ["/mcq", "/written", "/short-answers", "/long-answers", "/loading"] },
  { id: "result", label: "Results", paths: ["/result", "/confirmation", "/review"] },
  { id: "additional", label: "Additional Info", paths: ["/additional-info"] },
  { id: "completed", label: "Completed", paths: ["/submitted"] },
];

export default function ApplyProgressStepper() {
  const pathname = usePathname();

  // Find current step index
  const currentStepIndex = STEPS.findIndex((step) =>
    step.paths.some((path) => pathname?.endsWith(path))
  );

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-[20px] p-4 lg:p-6 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between min-w-[700px] px-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-1.5 relative">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-semibold transition-all duration-300",
                    isCompleted && "bg-[#195236] text-[#F2F7F1]",
                    isActive && "bg-[#A9E179] text-[#195236] ring-4 ring-[#A9E179]/20 font-bold",
                    !isCompleted && !isActive && "bg-[#F2F4F7] text-[#667085] border border-[#D0D5DD]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3px]" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-[12px] lg:text-[14px] font-medium text-center whitespace-nowrap",
                    isActive && "text-[#195236] font-semibold",
                    isCompleted && "text-[#195236]/80",
                    !isCompleted && !isActive && "text-[#667085]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Progress Line */}
              {index < STEPS.length - 1 && (
                <div className="h-[2px] flex-grow mx-4 bg-[#E4E7EC] relative overflow-hidden min-w-[30px]">
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full bg-[#195236] transition-all duration-500 ease-out",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
