import {
  apiGet,
  apiPostForm,
  apiPostJson,
  apiPostMultipart,
  RequestOptions,
} from "./client";
import {
  ApiJobPosition,
  ApiJobPositionDetailResponse,
  ApiHiringBenefit,
  ApiHiringTestimonial,
  ApiHiringPageContent,
  ApiHiringData,
} from "./types";
import { JobPosition } from "@/data/career-data";

export interface GetPositionsParams {
  department?: string | null;
  location?: string | null;
  job_type?: string | null;
}

export type ResumeType = "future_leader" | "general";

export interface AssessmentSubmissionPayload {
  email: string;
  answers: Record<string, string>;
}

export const hiringApi = {
  getPositions(params?: GetPositionsParams, options?: RequestOptions) {
    return apiGet<ApiJobPosition[]>("/api/v1/hiring/positions", {
      ...options,
      params: params as any,
    });
  },

  getPositionById(positionId: number, options?: RequestOptions) {
    return apiGet<ApiJobPositionDetailResponse>(`/api/v1/hiring/positions/${positionId}`, options);
  },

  getPositionBySlug(slug: string, options?: RequestOptions) {
    return apiGet<ApiJobPositionDetailResponse>(`/api/v1/hiring/positions/slug/${slug}`, options);
  },

  getBenefits(options?: RequestOptions) {
    return apiGet<ApiHiringBenefit[]>("/api/v1/hiring/benefits", options);
  },

  getTestimonials(options?: RequestOptions) {
    return apiGet<ApiHiringTestimonial[]>("/api/v1/hiring/testimonials", options);
  },

  getPageContent(options?: RequestOptions) {
    return apiGet<ApiHiringPageContent>("/api/v1/hiring/page-content", options);
  },

  getAllHiringContent(options?: RequestOptions) {
    return apiGet<ApiHiringData>("/api/v1/hiring/", options);
  },

  getPositionAssessment(positionId: number, options?: RequestOptions) {
    return apiGet<unknown>(`/api/v1/hiring/positions/${positionId}/assessment`, options);
  },

  applyStep1(
    form: Record<string, string | number | boolean | undefined | null>,
    options?: RequestOptions
  ) {
    if (form.position_id === undefined || form.position_id === null) {
      console.error("applyStep1 missing required position_id in form payload:", form);
    }
    return apiPostForm<unknown>("/api/v1/hiring/apply/step-1", form, options);
  },

  submitAssessment(
    applicationId: number,
    payload: AssessmentSubmissionPayload,
    options?: RequestOptions
  ) {
    return apiPostJson<unknown>(
      `/api/v1/hiring/apply/${applicationId}/assessment`,
      payload,
      options
    );
  },

  submitAdditionalInfo(
    applicationId: number,
    formData: FormData,
    options?: RequestOptions
  ) {
    return apiPostMultipart<unknown>(
      `/api/v1/hiring/apply/${applicationId}/additional-info`,
      formData,
      options
    );
  },

  getApplicationStatus(applicationId: number, email: string, options?: RequestOptions) {
    return apiGet<unknown>(`/api/v1/hiring/applications/${applicationId}`, {
      ...options,
      params: { email },
    });
  },

  getApplicationsByEmail(email: string, options?: RequestOptions) {
    return apiGet<unknown[]>("/api/v1/hiring/applications", {
      ...options,
      params: { email },
    });
  },

  uploadResume(formData: FormData, resumeType?: ResumeType, options?: RequestOptions) {
    if (resumeType) {
      formData.append("resume_types", resumeType);
      formData.append("resume_type", resumeType);
    }
    const fileEntry = formData.get("file");
    if (fileEntry instanceof File && fileEntry.name) {
      if (!formData.has("filename")) formData.append("filename", fileEntry.name);
      if (!formData.has("file_name")) formData.append("file_name", fileEntry.name);
    }
    const mergedOptions: RequestOptions = {
      ...options,
      params: resumeType
        ? { ...options?.params, resume_types: resumeType, resume_type: resumeType }
        : options?.params,
    };
    return apiPostMultipart<{ url: string }>("/api/v1/hiring/upload-cv", formData, mergedOptions);
  },
};

/* --- Mapping helpers to bridge API data to Career-data structure --- */

export function normalizeFileUrl(url: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const backendUrl = process.env.API_BACKEND_URL;
    if (backendUrl) {
      try {
        const backendHost = new URL(backendUrl).hostname;
        const urlObj = new URL(url);
        if (urlObj.hostname === backendHost) {
          return `/api/file-proxy?path=${encodeURIComponent(urlObj.pathname + urlObj.search)}`;
        }
      } catch {}
    }
    return url;
  }
  return `/api/file-proxy?path=${encodeURIComponent(url)}`;
}

export function getBenefitIcon(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("salary") || t.includes("pay") || t.includes("compensation")) return "briefcase-01.svg";
  if (t.includes("incentive") || t.includes("bonus") || t.includes("commission") || t.includes("target")) return "target-01.svg";
  if (t.includes("travel") || t.includes("allowance") || t.includes("transport") || t.includes("fuel")) return "location-03.svg";
  if (t.includes("development") || t.includes("growth") || t.includes("training") || t.includes("learn")) return "rocket-01.svg";
  if (t.includes("insurance") || t.includes("health") || t.includes("medical") || t.includes("provident") || t.includes("leave")) return "shield-tick.svg";
  return "briefcase-01.svg";
}

export function mapApiPositionToJobPosition(item: ApiJobPosition): JobPosition {
  const jobTypeLabel =
    item.job_type === "full_time"
      ? "Full-time"
      : item.job_type === "part_time"
        ? "Part-time"
        : item.job_type === "contract"
          ? "Contract"
          : item.job_type || "Full-time";

  const locationLabel = item.location
    ? item.location.charAt(0).toUpperCase() + item.location.slice(1)
    : "Dhaka";

  const tags = ["Onsite", jobTypeLabel, locationLabel];

  return {
    id: item.id,
    slug: item.slug,
    is_active: item.is_active !== undefined ? item.is_active : true,
    title: item.title,
    description: (item.short_description || item.description || "")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\u00a0/g, " ")
      .trim(),
    tags,
    salary: item.salary || item.salary_range || undefined,
    salaryNote: item.salary_note || (item as any).salaryNote || undefined,
    location: locationLabel,
    jobType: jobTypeLabel,
    experience: item.experience_required,
    fullDescription: item.description,
    whatYoullDo: item.responsibilities || [],
    whatWereLookingFor: item.requirements || [],
    skillsAndCompetencies: item.skills_required || [],
    whyJoin: [
      "Work in a research-driven agricultural environment",
      "Contribute directly to farmer productivity and food security",
      "Opportunities for leadership and professional growth",
      "Collaborative and mission-focused team culture",
    ],
    benefitsList: (item.benefits || []).map((b) => ({
      text: b,
      icon: getBenefitIcon(b),
    })),
    detailsPdfUrl: normalizeFileUrl(item.details_pdf_url),
    sort_order: item.sort_order,
  };
}
