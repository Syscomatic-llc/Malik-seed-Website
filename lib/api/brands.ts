import { apiGet, RequestOptions } from "./client";
import {
  ApiBrand,
  ApiPotatoSeedDataResponse,
  ApiInnovationDevelopmentDataResponse,
} from "./types";

export const brandsApi = {
  getBrands(category?: string | null, options?: RequestOptions) {
    return apiGet<ApiBrand[]>("/api/v1/our-brands/brands", {
      ...options,
      params: {
        ...(options?.params || {}),
        ...(category ? { category } : {}),
      },
    });
  },

  getPotatoSeedData(options?: RequestOptions) {
    return apiGet<ApiPotatoSeedDataResponse>("/api/v1/our-brands/brands/potato-seeds/detail", options);
  },

  getInnovationDevelopmentData(options?: RequestOptions) {
    return apiGet<ApiInnovationDevelopmentDataResponse>(
      "/api/v1/our-brands/brands/innovation-development/detail",
      options
    );
  },
};
