"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "info", label: "Personal Info", paths: ["/info"] },
  { id: "otp", label: "Verification", paths: ["/otp"] },
  { id: "additional", label: "Additional Info", paths: ["/additional-info"] },
  { id: "start", label: "Instructions", paths: ["/start"] },
  {
    id: "assessment",
    label: "Assessment",
    paths: ["/mcq", "/written", "/short-answers", "/long-answers", "/loading"],
  },
  { id: "result", label: "Results", paths: ["/result", "/review"] },
  { id: "completed", label: "Completed", paths: ["/submitted"] },
];

export default function ApplyProgressStepper() {
  const pathname = usePathname();

  // Find current step index
  const currentStepIndex = STEPS.findIndex((step) =>
    step.paths.some((path) => pathname?.endsWith(path))
  );

  return (
    <div className="w-full overflow-x-auto rounded-[20px] border border-[#E4E7EC] bg-[#FFFFFF] p-4 shadow-sm lg:p-6">
      <div className="flex min-w-[700px] items-center justify-between px-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-initial"
            >
              {/* Step indicator */}
              <div className="relative flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold transition-all duration-300",
                    isCompleted && "bg-[#195236] text-[#F2F7F1]",
                    isActive &&
                      "bg-[#A9E179] font-bold text-[#195236] ring-4 ring-[#A9E179]/20",
                    !isCompleted &&
                      !isActive &&
                      "border border-[#D0D5DD] bg-[#F2F4F7] text-[#667085]"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 stroke-[3px]" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-center text-[12px] font-medium whitespace-nowrap lg:text-[14px]",
                    isActive && "font-semibold text-[#195236]",
                    isCompleted && "text-[#195236]/80",
                    !isCompleted && !isActive && "text-[#667085]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Progress Line */}
              {index < STEPS.length - 1 && (
                <div className="relative mx-4 h-[2px] min-w-[30px] flex-grow overflow-hidden bg-[#E4E7EC]">
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
