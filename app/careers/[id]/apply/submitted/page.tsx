"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Home, Compass } from "lucide-react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { hasWrittenAssessment } from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";
import NextImage from "next/image";

export default function ApplicationSubmittedPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isCompleted, reset, assessmentConfig } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const position = openPositionsData.positions.find(
    (pos) => pos.id.toString() === id || pos.slug === id
  );
  const positionId = position ? position.id : parseInt(id as string);
  
  let hasWritten = false;
  if (assessmentConfig) {
    const types = assessmentConfig.assessmentTypes ?? [assessmentConfig.assessmentType];
    hasWritten = types.includes("short_answers") || types.includes("long_answers");
  } else {
    hasWritten = hasWrittenAssessment(positionId);
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isLeaving) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
      } else if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
      }
    }
  }, [isOtpVerified, isCompleted, hydrated, id, router, isLeaving]);

  const handleReturnHome = () => {
    setIsLeaving(true);
    reset(); // Clear store state on completion
    router.push("/");
  };

  const handleExploreBrands = () => {
    setIsLeaving(true);
    reset(); // Clear store state on completion
    router.push("/our-brands");
  };

  if (!hydrated || (!isCompleted && !isLeaving)) {
    return (
      <div className="font-inter py-10 text-center text-[#0D1A14]/70">
        Loading confirmation...
      </div>
    );
  }

  if (hasWritten) {
    return (
      <div className="mx-auto flex min-h-[432px] w-full max-w-[816px] items-center justify-center rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
        <div className="flex w-full max-w-[736px] flex-col items-start gap-12 py-4">
          {/* Header Block (Spinner & Texts) */}
          <div className="flex w-full flex-col items-start gap-8">
            <NextImage
              src="/images/careers/uiw_loading.svg"
              className="text-brand-accent h-12 w-12"
              alt="Loading"
              width={48}
              height={48}
            />

            <div className="flex w-full flex-col items-start gap-4">
              <h1
                className="w-full text-[24px] leading-[29px] font-medium tracking-tight text-[#0D1A14]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Your Assessment has been successfully submitted!
              </h1>
              <p
                className="w-full text-[16px] leading-[24px] text-[#0D1A14]/70"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Thank you for completing the Malik Seeds technical assessment. Your responses have been successfully recorded. Since this position requires evaluation for written answers, our hiring team will review your submission and contact you via email regarding the next steps.
              </p>
              <p
                className="w-full text-[14px] leading-[21px] font-medium text-[#0D1A14]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                You may now safely close this window or use the options below to return home.
              </p>
            </div>
          </div>
 
          {/* Divider Line */}
          <div className="h-[1px] w-full bg-[#E4E7EC]" />
 
          {/* Action Row */}
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              onClick={() => router.push(`/careers/${id}/apply/review`)}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] px-6 text-[16px] leading-[19px] font-medium text-[#414E62] transition-all hover:bg-[#e4e7ec] sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <ArrowIcon
                direction="left"
                size={20}
                className="text-[#414E62]"
              />
              <span>Review Your Responses</span>
            </button>
            <button
              onClick={handleReturnHome}
              className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#195236] px-6 text-[16px] leading-[19px] font-medium text-[#F2F7F1] transition-all hover:bg-[#153e28] sm:w-auto"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Return Home</span>
              <ArrowIcon
                direction="right"
                size={20}
                className="text-white"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[816px] rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="flex w-full flex-col items-start gap-[48px]">
        {/* Top Content Frame */}
        <div className="flex w-full flex-col items-start gap-[32px]">
          {/* Header Block (Icon & Texts) */}
          <div className="flex w-full flex-col items-start gap-[32px]">
            <div>
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.6239 0C26.1278 0.0994592 31.3726 2.35568 35.2297 6.28311C39.0868 10.2106 41.2479 15.4953 41.2479 21C41.2479 26.5047 39.0868 31.7894 35.2297 35.7169C31.3726 39.6443 26.1278 41.9005 20.6239 42C15.1201 41.9005 9.8753 39.6443 6.01819 35.7169C2.16108 31.7894 0 26.5047 0 21C0 15.4953 2.16108 10.2106 6.01819 6.28311C9.8753 2.35568 15.1201 0.0994592 20.6239 0ZM16.2628 27.8217L11.1199 22.6743C10.699 22.2519 10.4626 21.6798 10.4626 21.0834C10.4626 20.4871 10.699 19.915 11.1199 19.4926C11.5431 19.072 12.1154 18.836 12.7119 18.836C13.3085 18.836 13.8808 19.072 14.3039 19.4926L17.9268 23.12L26.9439 14.1029C27.3664 13.6819 27.9384 13.4455 28.5348 13.4455C29.1312 13.4455 29.7032 13.6819 30.1257 14.1029C30.5461 14.5256 30.7821 15.0975 30.7821 15.6937C30.7821 16.2899 30.5461 16.8619 30.1257 17.2846L19.5154 27.8949C19.3 28.1091 19.0435 28.2777 18.7614 28.3905C18.4793 28.5032 18.1773 28.5578 17.8735 28.551C17.5698 28.5441 17.2705 28.476 16.9937 28.3507C16.717 28.2254 16.4683 28.0455 16.2628 27.8217Z"
                  fill="#00BA00"
                />
              </svg>
            </div>

            {/* Headline and Description Paragraphs */}
            <div className="flex w-full flex-col items-start gap-[16px]">
              <h1
                className="w-full text-[24px] leading-[24px] font-medium tracking-tight text-[#0D1A14]"
                style={{ fontFamily: "var(--font-inter-tight)" }}
              >
                Your Application Has Been Successfully Submitted
              </h1>
              <p
                className="w-full text-[16px] leading-[24px] text-[#0D1A14]/70"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Thank you for applying to Malik Seeds. Your application,
                including your assessment responses and submitted documents, has
                been received successfully.
              </p>
              <p
                className="w-full text-[16px] leading-[24px] text-[#0D1A14]/70"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Our recruitment team will review your application carefully. If
                your profile matches the requirements of the role, we will
                contact you regarding the next stage of the selection process.
              </p>
            </div>
          </div>

          {/* Divider Line 8 */}
          <div className="h-[1px] w-full bg-[#E4E7EC]" />

          {/* What Happens Next Section */}
          <div className="flex w-full flex-col items-start gap-[8px]">
            <h2
              className="text-[16px] leading-[24px] font-medium text-[#0D1A14]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              What Happens Next
            </h2>
            <div className="flex w-full flex-col items-start gap-[8px]">
              {[
                "Our team reviews your assessment and submitted documents",
                "Shortlisted candidates will be contacted for further evaluation",
                "Updates will be shared through the contact details you provided",
              ].map((text, idx) => (
                <div key={idx} className="flex w-full items-start gap-[12px]">
                  <div className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#195236]" />
                  <p
                    className="text-[16px] leading-[24px] text-[#0D1A14]/70"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Line 7 */}
        <div className="h-[1px] w-full bg-[#E4E7EC]" />

        {/* Action Row */}
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <button
            onClick={handleReturnHome}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] border border-[#E4E7EC] bg-[#F2F4F7] px-6 text-[16px] leading-[19px] font-medium text-[#414E62] transition-all hover:bg-[#e4e7ec] sm:w-auto"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <ArrowIcon direction={"left"} size={20} />
            <span>Return to Home</span>
          </button>
          <button
            onClick={handleExploreBrands}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-[10px] rounded-[60px] bg-[#195236] px-6 text-[16px] leading-[19px] font-medium text-[#F2F7F1] transition-all hover:bg-[#153e28] hover:shadow-sm sm:w-auto"
            style={{ fontFamily: "var(--font-inter-tight)" }}
          >
            <span>Explore Our Brands</span>
            <ArrowIcon direction={"right"} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
