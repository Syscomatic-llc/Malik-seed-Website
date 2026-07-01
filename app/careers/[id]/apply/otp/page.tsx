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
  const { email, setOtpVerified } = useApplicationStore();

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
    if (otp.length < 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate OTP verification
    // For demo purposes, we accept "123456"
    setTimeout(() => {
      if (otp === "123456") {
        setOtpVerified(true);
        router.push(`/careers/${id}/apply/start`);
      } else {
        setError("Invalid verification code. Please check and try again.");
        setLoading(false);
      }
    }, 1000);
  };

  if (!hydrated || !email) {
    return (
      <div className="animate-pulse space-y-4 py-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-20 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const isOtpValid = otp.length === 6;

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="w-full flex flex-col gap-6 py-2">
        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h2 
            className="font-medium text-[20px] text-[#0D1A14] leading-[20px]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Email verification
          </h2>
          <p className="font-inter text-[16px] text-[#0D1A14]/70 leading-[24px] mt-2">
            We&apos;ve sent a verification code to the email address you provided. Please check your inbox and enter the code below to continue. If you don&apos;t see the email, check your Spam/Junk folder.
          </p>
        </div>

        <hr className="w-full border-t border-[#E4E7EC]" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {/* Verification Code Input */}
          <div className="flex flex-col gap-2">
            <Label 
              htmlFor="otp" 
              className="text-[#0D1A14] text-[16px] leading-[24px] font-normal"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Verification code
            </Label>
            <Input
              id="otp"
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              disabled={loading}
              maxLength={6}
              className="w-full h-[48px] bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] py-[12px] font-inter text-[16px] text-[#0D1A14] focus-visible:ring-[#195236] placeholder:text-[#414E62]/60"
            />
          </div>

          {error && (
            <div className="text-[14px] text-[#FF4242] bg-[#FF4242]/5 border border-[#FF4242]/20 rounded-[8px] p-3 font-inter">
              {error}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 w-full">
            {/* Subtle testing code text on the bottom left */}
            <span className="text-[13px] font-inter text-[#0D1A14]/40">
              * Demo code: 123456
            </span>

            {/* Next Button */}
            <button
              type="submit"
              disabled={loading || !isOtpValid}
              className={cn(
                "flex items-center justify-center gap-[10px] rounded-[60px] h-[46px] w-[112px] font-medium text-[16px] border transition-all duration-200 select-none active:scale-95 cursor-pointer",
                !isOtpValid
                  ? "bg-[#F2F4F7] border-[#E4E7EC] text-[#97A1AF] cursor-not-allowed"
                  : "bg-[#195236] border-transparent text-[#F2F7F1] hover:bg-[#153e28]"
              )}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
