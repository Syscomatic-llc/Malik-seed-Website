"use client";

import { useEffect, useState, useRef, useSyncExternalStore, DragEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApplicationStore } from "@/store/applicationStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HEARD_ABOUT_OPTIONS = [
  "Company Website",
  "LinkedIn",
  "Employee Referral",
  "Dealer Network",
  "Other"
];

// Returns false during SSR, true once mounted on the client.
// Avoids a setState-in-effect just to detect hydration.
function useHasHydrated() {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
}

export default function AdditionalInfoPage() {
  const router = useRouter();
  const { id } = useParams();
  const store = useApplicationStore();
  const {
    isOtpVerified,
    isCompleted,
    isPassed,
    phoneNumber: storePhone,
    location: storeLoc,
    cvFileName: storeCvName,
    cvFileSize: storeCvSize,
    setAdditionalInfo
  } = store;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [heardAbout, setHeardAbout] = useState<string[]>(["LinkedIn"]); // Checked LinkedIn by default in Figma

  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<{ name: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hydrated = useHasHydrated();

  // Sync state on hydration — mirrors persisted Zustand store into local
  // editable state once the client has mounted. Legitimate external-system
  // sync, not derivable via render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (hydrated) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setPhoneNumber(storePhone || "");
      setLocation(storeLoc || "");
      setLinkedin(store.linkedin || "");
      setPortfolio(store.portfolio || "");
      setHeardAbout(store.heardAbout?.length ? store.heardAbout : ["LinkedIn"]);
      if (storeCvName) {
        setCvFile({ name: storeCvName, size: storeCvSize || 0 });
      }
    }
  }, [hydrated, store, storePhone, storeLoc, storeCvName, storeCvSize]);

  // Validation redirect
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
    return <div className="text-center py-10">Loading form...</div>;
  }

  // Handle file selection
  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setCvFile({ name: file.name, size: file.size });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setCvFile({ name: file.name, size: file.size });
      }
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      setError("Only PDF or DOCX/DOC files are accepted");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return false;
    }
    setError("");
    return true;
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleHeardAbout = (option: string) => {
    if (heardAbout.includes(option)) {
      setHeardAbout(heardAbout.filter(item => item !== option));
    } else {
      setHeardAbout([...heardAbout, option]);
    }
  };

  // Submit final application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !location) {
      setError("Please fill out all required fields");
      return;
    }

    if (!cvFile) {
      setError("Please upload your CV / Resume to submit your application");
      return;
    }

    setLoading(true);
    setError("");

    // Update local store
    setAdditionalInfo({
      phoneNumber,
      location,
      linkedin,
      portfolio,
      heardAbout,
      experience: "",
      expectedSalary: "",
      noticePeriod: "",
      coverLetter: "",
      cvFileName: cvFile.name,
      cvFileSize: cvFile.size
    });

    // Simulate submission delay locally
    setTimeout(() => {
      setLoading(false);
      router.push(`/careers/${id}/apply/submitted`);
    }, 1200);
  };

  // Format file size in MB
  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="w-full bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-10 shadow-sm min-h-[400px]">
      <div className="flex flex-col gap-12 max-w-[736px] mx-auto py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">

          {/* Section 1: Additional Information */}
          <div className="flex flex-col gap-8">
            <h2 className="font-inter-tight text-[20px] font-medium text-[#0D1A14] leading-[20px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
              Additional Information
            </h2>

            <div className="flex flex-col gap-6 w-full">
              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal flex items-center">
                  Phone Number<span className="text-[#FF4242] ml-0.5">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62] focus-visible:ring-[#195236] transition-all"
                />
              </div>

              {/* Current Location */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="location" className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal flex items-center">
                  Current Location<span className="text-[#FF4242] ml-0.5">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62] focus-visible:ring-[#195236] transition-all"
                />
              </div>

              {/* LinkedIn Profile */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="linkedin" className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal">
                  LinkedIn Profile (Optional)
                </Label>
                <Input
                  id="linkedin"
                  placeholder="Enter link here"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62] focus-visible:ring-[#195236] transition-all"
                />
              </div>

              {/* Portfolio / Website */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="portfolio" className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal">
                  Portfolio / Website (Optional)
                </Label>
                <Input
                  id="portfolio"
                  placeholder="Enter link here"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  disabled={loading}
                  className="h-12 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[10px] px-[18px] text-[16px] text-[#0D1A14] placeholder:text-[#414E62] focus-visible:ring-[#195236] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: How did you hear about this opportunity? */}
          <div className="flex flex-col gap-4">
            <h3 className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal">
              How did you hear about this opportunity?
            </h3>
            <div className="flex flex-col gap-2">
              {HEARD_ABOUT_OPTIONS.map((option) => {
                const isChecked = heardAbout.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleHeardAbout(option)}
                    className="flex items-center gap-3 text-left cursor-pointer select-none group w-fit py-1"
                  >
                    <div className={cn(
                      "w-[18px] h-[18px] rounded border flex items-center justify-center transition-all",
                      isChecked
                        ? "bg-[#195236] border-[#195236] text-[#F2F7F1]"
                        : "border-[#D0D5DD] bg-white group-hover:border-[#195236]"
                    )}>
                      {isChecked && (
                        <svg className="w-2.5 h-2.5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="font-inter text-[16px] leading-[24px] text-[#0D1A14]">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="w-full border-t border-[#CED2DA]" />

          {/* Section 3: Upload Documents */}
          <div className="flex flex-col gap-8">
            <h2 className="font-inter-tight text-[20px] font-medium text-[#0D1A14] leading-[20px]" style={{ fontFamily: "var(--font-inter-tight)" }}>
              Upload Documents
            </h2>

            <div className="flex flex-col gap-2 w-full">
              <Label className="font-inter text-[16px] leading-[24px] text-[#0D1A14] font-normal flex items-center">
                Upload Your CV / Resume<span className="text-[#FF4242] ml-0.5">*</span>
              </Label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
                disabled={loading}
              />

              {!cvFile ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "h-[124px] bg-[#F9FAFB] border rounded-[12px] flex items-center justify-center cursor-pointer transition-all",
                    isDragging
                      ? "border-[#195236] bg-[#195236]/5"
                      : "border-[#CED2DA] hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-2 text-[#344051]">
                    <Upload className="w-6 h-6 text-[#344051]" />
                    <span className="font-inter text-[16px] font-medium leading-[24px] text-[#344051]">
                      Click to upload or drag and drop. PDF preferred
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border border-[#E4E7EC] rounded-[16px] p-4 bg-[#F9FAFB] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#195236]/10 flex items-center justify-center text-[#195236]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-inter font-medium text-[14px] text-[#0D1A14] truncate max-w-[250px] sm:max-w-[400px]">
                        {cvFile.name}
                      </span>
                      <span className="font-inter text-[12px] text-[#0D1A14]/50">
                        {formatSize(cvFile.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    key="remove-cv-file"
                    type="button"
                    onClick={removeFile}
                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#FF4242] hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="text-[14px] text-[#FF4242] bg-[#FF4242]/5 border border-[#FF4242]/20 rounded-[8px] p-3">
              {error}
            </div>
          )}

          {/* Apply Now Button */}
          <div className="flex justify-end border-t border-[#E4E7EC] pt-6 mt-4">
            <Button
              type="submit"
              disabled={loading || !phoneNumber || !location || !cvFile}
              className="flex items-center justify-center gap-2 rounded-[60px] h-[46px] w-[155px] font-medium text-[16px] border border-transparent bg-[#195236] text-[#F2F7F1] hover:bg-[#153e28] transition-all duration-200 select-none active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter-tight)" }}
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}