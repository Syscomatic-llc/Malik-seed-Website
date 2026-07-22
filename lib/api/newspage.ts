import { apiGet, RequestOptions } from "./client";
import {
  ApiNewsArticle,
  ApiNewsCategory,
  ApiPressRelease,
  ApiNewsPageData,
} from "./types";

export interface GetArticlesParams {
  category?: string;
  featured?: boolean;
  limit?: number;
}

export const newsApi = {
  getArticles(params?: GetArticlesParams, options?: RequestOptions) {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.featured !== undefined)
      query.set("featured", String(params.featured));
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiGet<{ items: ApiNewsArticle[]; total: number }>(
      `/api/v1/news/articles${qs ? `?${qs}` : ""}`,
      options
    ).then((res) => res?.items || []);
  },
  getFeaturedArticles(options?: RequestOptions) {
    return apiGet<ApiNewsArticle[]>("/api/v1/news/articles/featured", options);
  },
  getArticleBySlug(slug: string, options?: RequestOptions) {
    return apiGet<ApiNewsArticle>(`/api/v1/news/articles/${slug}`, options);
  },
  getCategories(options?: RequestOptions) {
    return apiGet<ApiNewsCategory[]>("/api/v1/news/categories", options).then(
      (res) =>
        Array.isArray(res)
          ? [...res].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          : []
    );
  },
  getPressReleases(options?: RequestOptions) {
    return apiGet<ApiPressRelease[]>("/api/v1/news/press-releases", options);
  },
  getPressReleaseBySlug(slug: string, options?: RequestOptions) {
    return apiGet<ApiPressRelease>(
      `/api/v1/news/press-releases/${slug}`,
      options
    );
  },
  subscribeNewsletter(
    email: string,
    firstName?: string,
    lastName?: string,
    options?: RequestOptions
  ) {
    const query = new URLSearchParams({ email });
    if (firstName) query.set("first_name", firstName);
    if (lastName) query.set("last_name", lastName);
    return apiGet<unknown>(`/api/v1/news/subscribe?${query.toString()}`, {
      ...options,
      method: "POST",
    } as RequestOptions);
  },
  getAll(options?: RequestOptions) {
    return apiGet<ApiNewsPageData>("/api/v1/news/", options).then((res) => {
      if (res && Array.isArray(res.categories)) {
        res.categories.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      }
      return res;
    });
  },
  getNews(options?: RequestOptions) {
    return this.getAll(options);
  },
};
