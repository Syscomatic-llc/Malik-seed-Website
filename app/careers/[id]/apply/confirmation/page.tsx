"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export default function AssessmentConfirmationPassedPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isCompleted, isPassed, reset } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
      } else if (!isPassed) {
        router.replace(`/careers/${id}/apply/result`);
      }
    }
  }, [isOtpVerified, isCompleted, isPassed, hydrated, id, router]);

  if (!hydrated || !isCompleted || !isPassed) {
    return <div className="text-center py-10">Loading results...</div>;
  }

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="flex flex-col gap-6 md:gap-8 max-w-[700px] mx-auto py-4">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6239 0C26.1278 0.0994592 31.3726 2.35568 35.2297 6.28311C39.0868 10.2106 41.2479 15.4953 41.2479 21C41.2479 26.5047 39.0868 31.7894 35.2297 35.7169C31.3726 39.6443 26.1278 41.9005 20.6239 42C15.1201 41.9005 9.8753 39.6443 6.01819 35.7169C2.16108 31.7894 0 26.5047 0 21C0 15.4953 2.16108 10.2106 6.01819 6.28311C9.8753 2.35568 15.1201 0.0994592 20.6239 0ZM16.2628 27.8217L11.1199 22.6743C10.699 22.2519 10.4626 21.6798 10.4626 21.0834C10.4626 20.4871 10.699 19.915 11.1199 19.4926C11.5431 19.072 12.1154 18.836 12.7119 18.836C13.3085 18.836 13.8808 19.072 14.3039 19.4926L17.9268 23.12L26.9439 14.1029C27.3664 13.6819 27.9384 13.4455 28.5348 13.4455C29.1312 13.4455 29.7032 13.6819 30.1257 14.1029C30.5461 14.5256 30.7821 15.0975 30.7821 15.6937C30.7821 16.2899 30.5461 16.8619 30.1257 17.2846L19.5154 27.8949C19.3 28.1091 19.0435 28.2777 18.7614 28.3905C18.4793 28.5032 18.1773 28.5578 17.8735 28.551C17.5698 28.5441 17.2705 28.476 16.9937 28.3507C16.717 28.2254 16.4683 28.0455 16.2628 27.8217Z" fill="#00BA00" />
            </svg>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="font-inter-tight text-[24px] font-medium text-[#0D1A14] leading-[30px]">
              Congratulations! <br />
              Your assessment responses meet the required evaluation criteria.
            </h2>
            <p className="font-inter text-[15px] text-[#0D1A14]/70 leading-[150%] mt-2">
              You can now proceed to the next step of the application process by submitting your CV, cover letter, and supporting documents. Our recruitment team will review your complete application after submission.
            </p>
          </div>
        </div>

        <hr className="w-full border-t border-[#E4E7EC] my-2" />

        <div className="flex flex-col gap-4">
          <h3 className="font-inter-tight text-[18px] font-semibold text-[#0D1A14]">
            What Happens Next
          </h3>
          <ol className="flex flex-col gap-3 font-inter text-[16px] font-medium text-[#0D1A14]/80 pl-2">
            <li className="flex gap-1 items-center">
              <span className="text-[#195236] text-[16px] font-medium shrink-0 ">1. </span>
              <span>Upload your CV, cover letter, and other details.</span>
            </li>
            <li className="flex gap-1 items-center">
              <span className="text-[#195236] text-[16px] font-medium shrink-0 ">2. </span>
              <span>Our recruitment team reviews your full profile, including assessment results.</span>
            </li>
            <li className="flex gap-1 items-center">
              <span className="text-[#195236] text-[16px] font-medium shrink-0">3. </span>
              <span>Shortlisted candidates will be contacted directly for the next interview stages.</span>
            </li>
          </ol>
        </div>
        <div className="w-full h-[1px] bg-[#E4E7EC]" />

        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => router.push(`/careers/${id}/apply/review`)}
            className="w-full sm:w-auto flex justify-center items-center cursor-pointer gap-[10px] rounded-[60px] h-[46px] px-6 font-medium text-[16px] leading-[19px] border border-[#E4E7EC] bg-[#F2F4F7] text-[#414E62] transition-all hover:bg-[#e4e7ec]"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <ArrowIcon direction={"left"} size={20} />
            <span>Review Your Responses</span>
          </button>
          <button
            onClick={() => {
              router.push(`/careers/${id}/apply/additional-info`);
            }}
            className="w-full sm:w-auto flex justify-center items-center cursor-pointer gap-[10px] rounded-[60px] h-[46px] px-6 font-medium text-[16px] leading-[19px] bg-[#195236] text-[#F2F7F1] transition-all hover:bg-[#153e28] hover:shadow-sm"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Continue</span>
            <ArrowIcon direction={"right"} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
