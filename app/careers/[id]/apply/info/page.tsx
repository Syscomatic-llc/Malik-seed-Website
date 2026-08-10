"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { openPositionsData } from "@/data/career-data";
import { hiringApi } from "@/lib/api";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    name: storeName,
    email: storeEmail,
    setPersonalInfo,
    setStep1Data,
    fetchAssessment,
    assessmentConfig,
    isLoadingAssessment,
    assessmentLoadError,
    positionId: storePositionId,
    positionTitle: storePositionTitle,
  } = useApplicationStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  const parsedUrlId = !isNaN(parseInt(id as string, 10)) ? parseInt(id as string, 10) : null;
  const resolvedPositionId = storePositionId ?? (position ? position.id : parsedUrlId);
  const resolvedPositionTitle = storePositionTitle || (position ? position.title : "selected");

  // Sync state with store on hydration and load assessment
  useEffect(() => {
    setName(storeName);
    setEmail(storeEmail);
    setHydrated(true);
    fetchAssessment(id as string);
  }, [storeName, storeEmail, id, fetchAssessment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("A valid email address is required");
      return;
    }

    setLoading(true);
    setError("");

    setPersonalInfo(name, email);

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || name.trim();
    const lastName = nameParts.slice(1).join(" ") || " ";

    try {
      const response = await hiringApi.applyStep1({
        first_name: firstName,
        last_name: lastName,
        email: email.trim(),
        position_id: resolvedPositionId,
      }) as any;

      const appId = response?.application_id ?? response?.application?.id ?? null;
      const otpCode = response?.otp_code ?? response?.application?.otp_code ?? null;

      if (appId || otpCode) {
        setStep1Data(appId ? Number(appId) : null, otpCode ? String(otpCode) : null);
      }
    } catch (err) {
      console.warn("applyStep1 API call failed or offline, proceeding with fallback:", err);
    } finally {
      setLoading(false);
      router.push(`/careers/${id}/apply/otp`);
    }
  };

  if (!hydrated || isLoadingAssessment) {
    return (
      <div className="animate-pulse space-y-6 py-10 px-6 bg-white border border-[#E4E7EC] rounded-[24px] shadow-sm">
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-5 w-1/3 rounded bg-gray-200"></div>
          <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          <div className="h-5 w-1/5 rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-full rounded bg-gray-200 mt-6"></div>
      </div>
    );
  }

  const config = assessmentConfig;
  const isNoAssessment = assessmentLoadError === "This position does not require an assessment." || (resolvedPositionId !== null && !config && !assessmentLoadError);
  const isConnectionError = assessmentLoadError && assessmentLoadError !== "This position does not require an assessment.";
  const hasValidPosition = !!position || !!storePositionId;

  // Case A: Genuinely no assessment required
  if (hasValidPosition && (isNoAssessment || (!config && !isConnectionError))) {
    return (
      <div className="mx-auto w-full max-w-[816px] rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10 font-inter">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F7F1] text-[#195236]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-[24px] leading-[29px] font-medium tracking-tight text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              No Assessment Active
            </h1>
            <p className="text-[16px] leading-[24px] text-[#0D1A14]/70">
              There is currently no screening assessment active for the <strong>{resolvedPositionTitle}</strong> position. Please check back later.
            </p>
          </div>
          <div className="h-[1px] w-full bg-[#E4E7EC]" />
          <button
            onClick={() => router.push("/careers")}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#195236] px-6 text-[16px] leading-[19px] font-medium text-[#F2F7F1] transition-all hover:bg-[#153e28] sm:w-auto"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Back to Open Positions</span>
          </button>
        </div>
      </div>
    );
  }

  // Case B: Backend connection/loading issue (System connection error)
  if (isConnectionError && !config) {
    return (
      <div className="mx-auto w-full max-w-[816px] rounded-[24px] border border-[#FFD0D0] bg-[#FFF2F2] p-6 shadow-sm md:p-10 font-inter">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD0D0] text-[#C12727]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h1
              className="text-[24px] leading-[29px] font-semibold tracking-tight text-[#C12727]"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              Assessment Loading Error
            </h1>
            <p className="text-[16px] leading-[24px] text-[#C12727]/80">
              We encountered a temporary network issue connecting to the server to load the assessment config for <strong>{resolvedPositionTitle}</strong>.
            </p>
            {assessmentLoadError && (
              <span className="text-[13px] font-mono bg-white/50 border border-[#FFC2C2] px-3 py-1.5 rounded-lg text-[#8C1C1C] break-all">
                Details: {assessmentLoadError}
              </span>
            )}
          </div>
          <div className="h-[1px] w-full bg-[#FFC2C2]" />
          <div className="flex flex-wrap gap-4 w-full">
            <button
              onClick={() => {
                fetchAssessment(id as string);
              }}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#C12727] px-6 text-[16px] leading-[19px] font-medium text-white transition-all hover:bg-[#9F1C1C] sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Retry Connection</span>
            </button>
            <button
              onClick={() => router.push("/careers")}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#C12727] px-6 text-[16px] leading-[19px] font-medium text-[#C12727] transition-all hover:bg-white sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Back to Open Positions</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email);

  return (
    <div className="min-h-[400px] w-full rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="flex w-full flex-col gap-6 py-2">
        {/* Title & Divider Section */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[18px] leading-[18px] font-medium text-[#0D1A14] md:text-[20px] md:leading-[20px]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Tell us about yourself
          </h2>
          <hr className="w-full border-t border-[#E4E7EC]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-12">
          {/* Form Inputs container */}
          <div className="flex w-full flex-col gap-6">
            {/* Name Field */}
            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="name"
                className="flex items-start gap-0.5 text-[16px] leading-[24px] font-normal text-[#0D1A14]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Name{" "}
                <span className="text-[14px] leading-[21px] text-[#FF4242]">
                  *
                </span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="font-inter h-[48px] w-full rounded-[10px] border border-[#E4E7EC] bg-[#F9FAFB] px-[18px] py-[12px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62]/60 focus-visible:ring-[#195236]"
              />
            </div>

            {/* Email Field */}
            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="email"
                className="flex items-start gap-0.5 text-[16px] leading-[24px] font-normal text-[#0D1A14]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Email Address{" "}
                <span className="text-[14px] leading-[21px] text-[#FF4242]">
                  *
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="font-inter h-[48px] w-full rounded-[10px] border border-[#E4E7EC] bg-[#F9FAFB] px-[18px] py-[12px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62]/60 focus-visible:ring-[#195236]"
              />
            </div>
          </div>

          {error && (
            <div className="font-inter rounded-[8px] border border-[#FF4242]/20 bg-[#FF4242]/5 p-3 text-[14px] text-[#FF4242]">
              {error}
            </div>
          )}

          {/* Action Row */}
          <div className="flex w-full justify-end border-t border-[#E4E7EC] pt-4">
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-[10px] rounded-[60px] font-medium transition-all duration-200 select-none active:scale-95",
                "h-[41px] w-[140px] border text-[14px] md:h-[46px] md:w-[178px] md:text-[16px]",
                !isFormValid
                  ? "cursor-not-allowed border-[#E4E7EC] bg-[#F2F4F7] text-[#97A1AF]"
                  : "border-transparent bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28]"
              )}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>{loading ? "Submitting..." : "Submit & Next"}</span>
              <ArrowRight className="h-4 w-4 shrink-0 md:h-5 md:w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
