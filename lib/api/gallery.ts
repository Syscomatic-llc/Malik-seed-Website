import { apiGet, RequestOptions } from "./client";
import { ApiGalleryData } from "./types";

export const galleryApi = {
  getAll(options?: RequestOptions) {
    return apiGet<ApiGalleryData>("/api/v1/our-gallery/", options);
  },
};
