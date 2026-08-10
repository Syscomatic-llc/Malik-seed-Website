"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OtpPage() {
  const router = useRouter();
  const { id } = useParams();
  const { email, otpCode, setOtpVerified } = useApplicationStore();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // If no email is set, go back to step 1
    if (hydrated && !email) {
      router.replace(`/careers/${id}/apply/info`);
    }
  }, [email, hydrated, id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError("");

    // Verify against extracted API otpCode or fallback demo codes
    setTimeout(() => {
      const cleanOtp = otp.trim();
      const expectedOtp = otpCode ? otpCode.trim() : null;

      if (expectedOtp && cleanOtp === expectedOtp) {
        setOtpVerified(true);
        router.push(`/careers/${id}/apply/start`);
      } else if (cleanOtp === "123456" || cleanOtp === "7752") {
        setOtpVerified(true);
        router.push(`/careers/${id}/apply/start`);
      } else {
        setError("Invalid verification code. Please check and try again.");
        setLoading(false);
      }
    }, 600);
  };

  if (!hydrated || !email) {
    return (
      <div className="animate-pulse space-y-4 py-4">
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="h-20 w-full rounded bg-gray-200"></div>
        <div className="h-10 w-full rounded bg-gray-200"></div>
      </div>
    );
  }

  const isOtpValid = otp.length >= 4 && otp.length <= 6;

  return (
    <div className="min-h-[400px] w-full rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="flex w-full flex-col gap-6 py-2">
        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-[20px] leading-[20px] font-medium text-[#0D1A14]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Email verification
          </h2>
          <p className="font-inter mt-2 text-[16px] leading-[24px] text-[#0D1A14]/70">
            We&apos;ve sent a verification code to the email address you
            provided. Please check your inbox and enter the code below to
            continue. If you don&apos;t see the email, check your Spam/Junk
            folder.
          </p>
        </div>

        <hr className="w-full border-t border-[#E4E7EC]" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {/* Verification Code Input */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="otp"
              className="text-[16px] leading-[24px] font-normal text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Verification code
            </Label>
            <Input
              id="otp"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              disabled={loading}
              maxLength={6}
              className="font-inter h-[48px] w-full rounded-[10px] border border-[#E4E7EC] bg-[#F9FAFB] px-[18px] py-[12px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62]/60 focus-visible:ring-[#195236]"
            />
          </div>

          {error && (
            <div className="font-inter rounded-[8px] border border-[#FF4242]/20 bg-[#FF4242]/5 p-3 text-[14px] text-[#FF4242]">
              {error}
            </div>
          )}

          {/* Action Row */}
          <div className="flex w-full items-center justify-end pt-4">
            {/* Next Button */}
            <button
              type="submit"
              disabled={loading || !isOtpValid}
              className={cn(
                "flex h-[46px] w-[112px] cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border text-[16px] font-medium transition-all duration-200 select-none active:scale-95",
                !isOtpValid
                  ? "cursor-not-allowed border-[#E4E7EC] bg-[#F2F4F7] text-[#97A1AF]"
                  : "border-transparent bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28]"
              )}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Next</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
