import { apiGet, RequestOptions } from "./client";
import {
  ApiBrand,
  ApiSectionBackgroundResponse,
  ApiPotatoSeedDataResponse,
  ApiInnovationDevelopmentDataResponse,
  ApiMaliksFarmDataResponse,
  ApiMaliksFlowerDataResponse,
  ApiOrigeneDataResponse,
  ApiVegetableSeedDataResponse,
} from "./types";

export const brandsApi = {
  getSectionBackground(options?: RequestOptions) {
    return apiGet<ApiSectionBackgroundResponse>(
      "/api/v1/our-brands/section-background",
      options
    );
  },

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
      "/api/v1/our-brands/brands/malik-farm/detail",
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

  getVegetableSeedData(options?: RequestOptions) {
    return apiGet<ApiVegetableSeedDataResponse>(
      "/api/v1/our-brands/brands/vegetable-seeds/detail",
      options
    );
  },
};
