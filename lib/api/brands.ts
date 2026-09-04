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

function normalizeKey(str?: string | null): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export interface BrandsApi {
  getSectionBackground(options?: RequestOptions): Promise<ApiSectionBackgroundResponse>;
  getBrands(category?: string | null, options?: RequestOptions): Promise<ApiBrand[]>;
  getBrandDetail<T = unknown>(slug: string, options?: RequestOptions): Promise<T>;
  resolveBrandSlug(identifier: string, options?: RequestOptions): Promise<string>;
  findBrandSlug(brands: ApiBrand[], identifier: string): string | undefined;

  getPotatoSeedData(options?: RequestOptions): Promise<ApiPotatoSeedDataResponse>;
  getPotatoSeedData(slug: string, options?: RequestOptions): Promise<ApiPotatoSeedDataResponse>;

  getInnovationDevelopmentData(options?: RequestOptions): Promise<ApiInnovationDevelopmentDataResponse>;
  getInnovationDevelopmentData(slug: string, options?: RequestOptions): Promise<ApiInnovationDevelopmentDataResponse>;

  getMaliksFarmData(options?: RequestOptions): Promise<ApiMaliksFarmDataResponse>;
  getMaliksFarmData(slug: string, options?: RequestOptions): Promise<ApiMaliksFarmDataResponse>;

  getMaliksFlowerData(options?: RequestOptions): Promise<ApiMaliksFlowerDataResponse>;
  getMaliksFlowerData(slug: string, options?: RequestOptions): Promise<ApiMaliksFlowerDataResponse>;

  getOrigeneData(options?: RequestOptions): Promise<ApiOrigeneDataResponse>;
  getOrigeneData(slug: string, options?: RequestOptions): Promise<ApiOrigeneDataResponse>;

  getVegetableSeedData(options?: RequestOptions): Promise<ApiVegetableSeedDataResponse>;
  getVegetableSeedData(slug: string, options?: RequestOptions): Promise<ApiVegetableSeedDataResponse>;
}

export const brandsApi: BrandsApi = {
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

  /**
   * Generic dynamic brand detail fetcher by slug.
   * Useful when slugs are dynamic, received from routing parameters, or changed in CMS.
   */
  getBrandDetail<T = unknown>(slug: string, options?: RequestOptions) {
    return apiGet<T>(`/api/v1/our-brands/brands/${encodeURIComponent(slug)}/detail`, options);
  },

  /**
   * Helper utility to find a brand's actual slug from an array of ApiBrand records by slug, name, or category.
   * Uses fuzzy normalized matching to tolerate differences across environments (e.g. "innovation" vs "innovation-development").
   */
  findBrandSlug(brands: ApiBrand[], identifier: string): string | undefined {
    if (!brands || brands.length === 0) return undefined;
    const target = normalizeKey(identifier);
    if (!target) return undefined;

    // 1. Exact case-insensitive match on slug, name, or category
    const exact = brands.find(
      (b) =>
        b.slug?.toLowerCase() === identifier.toLowerCase() ||
        b.name?.toLowerCase() === identifier.toLowerCase() ||
        b.category?.toLowerCase() === identifier.toLowerCase()
    );
    if (exact?.slug) return exact.slug;

    // 2. Normalized alphanumeric equality
    const normalized = brands.find(
      (b) =>
        normalizeKey(b.slug) === target ||
        normalizeKey(b.name) === target ||
        normalizeKey(b.category) === target
    );
    if (normalized?.slug) return normalized.slug;

    // 3. Substring / partial match across environments
    const partial = brands.find((b) => {
      const bSlug = normalizeKey(b.slug);
      const bName = normalizeKey(b.name);
      const bCat = normalizeKey(b.category);
      return (
        (bSlug && (bSlug.includes(target) || target.includes(bSlug))) ||
        (bName && (bName.includes(target) || target.includes(bName))) ||
        (bCat && (bCat.includes(target) || target.includes(bCat)))
      );
    });
    return partial?.slug;
  },

  /**
   * Dynamically resolves the server's current brand slug by querying the getBrands() endpoint.
   * Ensures compatibility between development, staging, and production environments.
   */
  async resolveBrandSlug(identifier: string, options?: RequestOptions): Promise<string> {
    try {
      const brands = await brandsApi.getBrands(null, options);
      const matched = brandsApi.findBrandSlug(brands, identifier);
      if (matched) return matched;
    } catch {
      // Fall back to identifier if getBrands fails
    }
    return identifier;
  },

  async getPotatoSeedData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiPotatoSeedDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("potato-seeds", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiPotatoSeedDataResponse>(slug, opts);
  },

  async getInnovationDevelopmentData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiInnovationDevelopmentDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("innovation-development", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiInnovationDevelopmentDataResponse>(slug, opts);
  },

  async getMaliksFarmData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiMaliksFarmDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("maliks-farm", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiMaliksFarmDataResponse>(slug, opts);
  },

  async getMaliksFlowerData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiMaliksFlowerDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("maliks-flower", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiMaliksFlowerDataResponse>(slug, opts);
  },

  async getOrigeneData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiOrigeneDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("origene", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiOrigeneDataResponse>(slug, opts);
  },

  async getVegetableSeedData(
    slugOrOptions?: string | RequestOptions,
    options?: RequestOptions
  ): Promise<ApiVegetableSeedDataResponse> {
    const slug =
      typeof slugOrOptions === "string"
        ? slugOrOptions
        : await brandsApi.resolveBrandSlug("vegetable-seeds", slugOrOptions);
    const opts = typeof slugOrOptions === "string" ? options : slugOrOptions;
    return brandsApi.getBrandDetail<ApiVegetableSeedDataResponse>(slug, opts);
  },
};
