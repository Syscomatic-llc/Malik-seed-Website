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
  const { name: storeName, email: storeEmail, setPersonalInfo } = useApplicationStore();

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
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const isFormValid = name.trim().length > 0 && email.trim().length > 0 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="w-full flex flex-col gap-6 py-2">
        {/* Title & Divider Section */}
        <div className="flex flex-col gap-6">
          <h2 
            className="text-[18px] md:text-[20px] font-medium text-[#0D1A14] leading-[18px] md:leading-[20px]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            Tell us about yourself
          </h2>
          <hr className="w-full border-t border-[#E4E7EC]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-12">
          {/* Form Inputs container */}
          <div className="flex flex-col gap-6 w-full">
            {/* Name Field */}
            <div className="flex flex-col gap-2 w-full">
              <Label 
                htmlFor="name" 
                className="text-[#0D1A14] text-[16px] leading-[24px] font-normal flex items-start gap-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Name <span className="text-[#FF4242] text-[14px] leading-[21px]">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full h-[48px] bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] py-[12px] font-inter text-[16px] text-[#0D1A14] focus-visible:ring-[#195236] placeholder:text-[#414E62]/60"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2 w-full">
              <Label 
                htmlFor="email" 
                className="text-[#0D1A14] text-[16px] leading-[24px] font-normal flex items-start gap-0.5"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Email Address <span className="text-[#FF4242] text-[14px] leading-[21px]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full h-[48px] bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] py-[12px] font-inter text-[16px] text-[#0D1A14] focus-visible:ring-[#195236] placeholder:text-[#414E62]/60"
              />
            </div>
          </div>

          {error && (
            <div className="text-[14px] text-[#FF4242] bg-[#FF4242]/5 border border-[#FF4242]/20 rounded-[8px] p-3 font-inter">
              {error}
            </div>
          )}

          {/* Action Row */}
          <div className="flex justify-end pt-4 border-t border-[#E4E7EC] w-full">
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={cn(
                "flex items-center justify-center gap-[10px] rounded-[60px] transition-all duration-200 select-none active:scale-95 cursor-pointer font-medium",
                "w-[140px] h-[41px] text-[14px] md:w-[178px] md:h-[46px] md:text-[16px] border",
                !isFormValid
                  ? "bg-[#F2F4F7] border-[#E4E7EC] text-[#97A1AF] cursor-not-allowed"
                  : "bg-[#195236] border-transparent text-[#F2F7F1] hover:bg-[#153e28]"
              )}
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>{loading ? "Submitting..." : "Submit & Next"}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
