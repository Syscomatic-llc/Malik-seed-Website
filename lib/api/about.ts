import { apiGet, RequestOptions } from "./client";
import {
  ApiHeroSlide,
  ApiAbout,
} from "./types";

export const aboutpageApi = {
  getHero(options?: RequestOptions) {
    return apiGet<ApiHeroSlide[]>("/api/v1/about/hero", options);
  },
  getAbout(options?: RequestOptions) {
    return apiGet<ApiAbout>("/api/v1/about", options);
  },
};
