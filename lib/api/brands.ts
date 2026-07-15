import { apiGet, RequestOptions } from "./client";
import { ApiBrand } from "./types";

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
};
