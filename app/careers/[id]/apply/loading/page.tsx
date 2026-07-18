"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import {
  assessmentConfigs,
  shouldAutoGradeAssessment,
} from "@/data/questions-data";
import { openPositionsData } from "@/data/career-data";

export default function AssessmentLoadingPage() {
  const router = useRouter();
  const { id } = useParams();
  const { isOtpVerified, isCompleted, isPassed } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      if (!isOtpVerified) {
        router.replace(`/careers/${id}/apply/otp`);
        return;
      }
      if (!isCompleted) {
        router.replace(`/careers/${id}/apply/start`);
        return;
      }

      // Simulate grading evaluation time (3 seconds)
      const timer = setTimeout(() => {
        const position = openPositionsData.positions.find(
          (pos) => pos.id.toString() === id || pos.slug === id
        );
        const positionId = position ? position.id : parseInt(id as string);
        const autoGrade = shouldAutoGradeAssessment(positionId);

        if (autoGrade) {
          // MCQ: always go to result page first (result handles pass/fail branching)
          router.replace(`/careers/${id}/apply/result`);
        } else {
          // Written or mixed flow: skip pass/fail result stage.
          router.replace(`/careers/${id}/apply/submitted`);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOtpVerified, isCompleted, isPassed, hydrated, id, router]);

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-sm md:p-10">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center gap-6 py-16 text-center">
        {/* Dynamic spinner */}
        <div className="relative h-16 w-16 flex items-center justify-center">
          <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.76 34.56C24.9057 34.56 26.0045 35.0151 26.8147 35.8253C27.6249 36.6355 28.08 37.7343 28.08 38.88C28.08 40.0257 27.6249 41.1245 26.8147 41.9347C26.0045 42.7449 24.9057 43.2 23.76 43.2C22.6143 43.2 21.5155 42.7449 20.7053 41.9347C19.8951 41.1245 19.44 40.0257 19.44 38.88C19.44 37.7343 19.8951 36.6355 20.7053 35.8253C21.5155 35.0151 22.6143 34.56 23.76 34.56ZM10.2406 28.08C11.6727 28.08 13.0462 28.6489 14.0589 29.6616C15.0716 30.6743 15.6406 32.0478 15.6406 33.48C15.6406 34.9122 15.0716 36.2857 14.0589 37.2984C13.0462 38.3111 11.6727 38.88 10.2406 38.88C8.80839 38.88 7.43488 38.3111 6.42218 37.2984C5.40949 36.2857 4.84056 34.9122 4.84056 33.48C4.84056 32.0478 5.40949 30.6743 6.42218 29.6616C7.43488 28.6489 8.80839 28.08 10.2406 28.08ZM35.249 29.16C36.3948 29.16 37.4936 29.6151 38.3037 30.4253C39.1139 31.2355 39.569 32.3343 39.569 33.48C39.569 34.6257 39.1139 35.7245 38.3037 36.5347C37.4936 37.3449 36.3948 37.8 35.249 37.8C34.1033 37.8 33.0045 37.3449 32.1943 36.5347C31.3842 35.7245 30.929 34.6257 30.929 33.48C30.929 32.3343 31.3842 31.2355 32.1943 30.4253C33.0045 29.6151 34.1033 29.16 35.249 29.16ZM39.96 20.129C40.8193 20.129 41.6434 20.4704 42.251 21.078C42.8586 21.6856 43.2 22.5097 43.2 23.369C43.2 24.2283 42.8586 25.0525 42.251 25.6601C41.6434 26.2677 40.8193 26.609 39.96 26.609C39.1007 26.609 38.2766 26.2677 37.669 25.6601C37.0614 25.0525 36.72 24.2283 36.72 23.369C36.72 22.5097 37.0614 21.6856 37.669 21.078C38.2766 20.4704 39.1007 20.129 39.96 20.129ZM5.4 12.96C6.83217 12.96 8.20568 13.5289 9.21838 14.5416C10.2311 15.5543 10.8 16.9278 10.8 18.36C10.8 19.7922 10.2311 21.1657 9.21838 22.1784C8.20568 23.1911 6.83217 23.76 5.4 23.76C3.96783 23.76 2.59432 23.1911 1.58162 22.1784C0.568927 21.1657 0 19.7922 0 18.36C0 16.9278 0.568927 15.5543 1.58162 14.5416C2.59432 13.5289 3.96783 12.96 5.4 12.96ZM38.4178 11.2471C38.9906 11.2471 39.54 11.4747 39.9451 11.8798C40.3502 12.2848 40.5778 12.8343 40.5778 13.4071C40.5778 13.98 40.3502 14.5294 39.9451 14.9345C39.54 15.3396 38.9906 15.5671 38.4178 15.5671C37.8449 15.5671 37.2955 15.3396 36.8904 14.9345C36.4853 14.5294 36.2578 13.98 36.2578 13.4071C36.2578 12.8343 36.4853 12.2848 36.8904 11.8798C37.2955 11.4747 37.8449 11.2471 38.4178 11.2471ZM17.28 0C18.9986 0 20.6468 0.682712 21.8621 1.89795C23.0773 3.11318 23.76 4.7614 23.76 6.48C23.76 8.1986 23.0773 9.84682 21.8621 11.0621C20.6468 12.2773 18.9986 12.96 17.28 12.96C15.5614 12.96 13.9132 12.2773 12.6979 11.0621C11.4827 9.84682 10.8 8.1986 10.8 6.48C10.8 4.7614 11.4827 3.11318 12.6979 1.89795C13.9132 0.682712 15.5614 0 17.28 0ZM33.48 6.48C33.7664 6.48 34.0411 6.59379 34.2437 6.79633C34.4462 6.99886 34.56 7.27357 34.56 7.56C34.56 7.84643 34.4462 8.12114 34.2437 8.32368C34.0411 8.52621 33.7664 8.64 33.48 8.64C33.1936 8.64 32.9189 8.52621 32.7163 8.32368C32.5138 8.12114 32.4 7.84643 32.4 7.56C32.4 7.27357 32.5138 6.99886 32.7163 6.79633C32.9189 6.59379 33.1936 6.48 33.48 6.48Z" fill="#75BC43"/>
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-inter-tight text-[22px] font-semibold text-[#0D1A14]">
            Evaluating your responses...
          </h2>
          <p className="font-inter text-[15px] leading-[24px] text-[#0D1A14]/70">
            Please wait while our system analyzes your screening assessment
            results. This should only take a few seconds. Do not close this tab
            or refresh the page.
          </p>
        </div>
      </div>
    </div>
  );
}
