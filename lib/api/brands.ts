import { apiGet, RequestOptions } from "./client";
import {
  ApiBrand,
  ApiPotatoSeedDataResponse,
  ApiInnovationDevelopmentDataResponse,
  ApiMaliksFarmDataResponse,
  ApiMaliksFlowerDataResponse,
  ApiOrigeneDataResponse,
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
      "/api/v1/our-brands/brands/innovation/detail",
      options
    );
  },

  getMaliksFarmData(options?: RequestOptions) {
    return apiGet<ApiMaliksFarmDataResponse>(
      "/api/v1/our-brands/brands/maliks-farm/detail",
      options
    );
  },

  getMaliksFlowerData(options?: RequestOptions) {
    return apiGet<ApiMaliksFlowerDataResponse>(
      "/api/v1/our-brands/brands/malik-flower/detail",
      options
    );
  },

  getOrigeneData(options?: RequestOptions) {
    return apiGet<ApiOrigeneDataResponse>(
      "/api/v1/our-brands/brands/origene/detail",
      options
    );
  },
};
