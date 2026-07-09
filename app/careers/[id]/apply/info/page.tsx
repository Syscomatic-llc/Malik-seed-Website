"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PersonalInfoPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    name: storeName,
    email: storeEmail,
    setPersonalInfo,
  } = useApplicationStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Sync state with store on hydration
  useEffect(() => {
    setName(storeName);
    setEmail(storeEmail);
    setHydrated(true);
  }, [storeName, storeEmail]);

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
    setLoading(false);
    router.push(`/careers/${id}/apply/otp`);
  };

  if (!hydrated) {
    return (
      <div className="animate-pulse space-y-4 py-4">
        <div className="h-6 w-1/4 rounded bg-gray-200"></div>
        <div className="h-10 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        <div className="h-10 w-full rounded bg-gray-200"></div>
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
