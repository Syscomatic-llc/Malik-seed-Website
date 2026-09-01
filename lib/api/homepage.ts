import { apiGet, RequestOptions } from "./client";
import {
  ApiHeroSlide,
  ApiCtaButton,
  ApiAbout,
  ApiService,
  ApiTestimonial,
  ApiTimelineItem,
  ApiPartner,
  ApiNewsArticle,
  ApiCtaBanner,
  ApiHomepageData,
} from "./types";

export const homepageApi = {
  getHero(options?: RequestOptions) {
    return apiGet<ApiHeroSlide[] | { slides: ApiHeroSlide[]; cta_buttons?: ApiCtaButton[] }>("/api/v1/homepage/hero", options);
  },
  getAbout(options?: RequestOptions) {
    return apiGet<ApiAbout>("/api/v1/homepage/about", options);
  },
  getServices(options?: RequestOptions) {
    return apiGet<ApiService[]>("/api/v1/homepage/services", options);
  },
  getBrands(options?: RequestOptions) {
    return apiGet<unknown[]>("/api/v1/homepage/brands", options);
  },
  getTestimonials(options?: RequestOptions) {
    return apiGet<ApiTestimonial[]>("/api/v1/homepage/testimonials", options);
  },
  getTimeline(options?: RequestOptions) {
    return apiGet<ApiTimelineItem[]>("/api/v1/homepage/timeline", options);
  },
  getPartners(options?: RequestOptions) {
    return apiGet<ApiPartner[]>("/api/v1/homepage/partners", options);
  },
  getNews(options?: RequestOptions) {
    return apiGet<ApiNewsArticle[]>("/api/v1/news/articles", options);
  },
  getCtaBanners(options?: RequestOptions) {
    return apiGet<ApiCtaBanner[]>("/api/v1/homepage/cta-banners", options);
  },
  getAll(options?: RequestOptions) {
    return apiGet<ApiHomepageData>("/api/v1/homepage/", options);
  },
};
