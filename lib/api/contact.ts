import { apiGet, apiPostQuery, RequestOptions } from "./client";
import { ApiContactInfo, ApiContactSubmitResponse } from "./types";

export interface ContactSubmitParams {
  name: string;
  email: string;
  message: string;
  phone?: string | null;
  subject?: string | null;
  inquiry_type?: string | null;
}

export const contactApi = {
  getContact(options?: RequestOptions) {
    return apiGet<ApiContactInfo>("/api/v1/contact/info", options);
  },
  submitContact(params: ContactSubmitParams, options?: RequestOptions) {
    return apiPostQuery<ApiContactSubmitResponse>(
      "/api/v1/contact/submit",
      {
        name: params.name,
        email: params.email,
        message: params.message,
        phone: params.phone,
        subject: params.subject,
        inquiry_type: params.inquiry_type || params.subject,
      },
      options
    );
  },
};
