/**
 * Core HTTP client for the Malik Seed CMS API.
 * Handles base URL resolution, query strings, JSON/form/multipart bodies,
 * and Next.js fetch caching (`cache` / `next.revalidate`).
 *
 * By default this calls a same-origin path (`/api/v1/...`) which Next.js
 * rewrites (see next.config.js) proxy to the real backend. This avoids
 * CORS issues and keeps the actual backend URL out of the client bundle.
 * Set NEXT_PUBLIC_API_BASE_URL only if you want to bypass the proxy and
 * call the backend directly from the browser.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;
  detail?: unknown;

  constructor(message: string, status: number, detail?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

function buildQuery(params?: QueryParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export interface RequestOptions {
  /** Query string params, automatically appended to the path */
  params?: QueryParams;
  /** Standard fetch cache mode */
  cache?: RequestCache;
  /** Next.js ISR revalidation (seconds), or false to force `no-store` semantics via cache */
  revalidate?: number | false;
  /** Next.js cache tags for tag-based revalidation */
  tags?: string[];
  signal?: AbortSignal;
  headers?: HeadersInit;
}

async function request<T>(
  path: string,
  init: RequestInit,
  options?: RequestOptions
): Promise<T> {
  const isServer = typeof window === "undefined";
  const backendUrl = process.env.API_BACKEND_URL ?? "";

  let baseUrl = API_BASE_URL;
  let cleanPath = path;

  if (isServer && backendUrl) {
    if (cleanPath.startsWith("/api/v1")) {
      cleanPath = cleanPath.slice("/api/v1".length);
    }
    baseUrl = backendUrl;
  }

  const url = `${baseUrl}${cleanPath}${buildQuery(options?.params)}`;

  const fetchCache =
    options?.cache ??
    (options?.revalidate === 0 || options?.revalidate === false
      ? "no-store"
      : undefined);

  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
  if (options?.revalidate !== undefined) {
    nextOptions.revalidate = options.revalidate;
  }
  if (options?.tags && options.tags.length > 0) {
    nextOptions.tags = options.tags;
  }

  const res = await fetch(url, {
    ...init,
    cache: fetchCache,
    signal: options?.signal,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    headers: {
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text().catch(() => undefined);
    }
    throw new ApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      detail
    );
  }

  if (res.status === 204) return undefined as T;

  // Some endpoints may return empty bodies on success; guard against JSON parse errors.
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const apiGet = <T = unknown>(path: string, options?: RequestOptions) =>
  request<T>(path, { method: "GET" }, options);

export const apiPostJson = <T = unknown>(
  path: string,
  body?: unknown,
  options?: RequestOptions
) =>
  request<T>(
    path,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    options
  );

export const apiPostForm = <T = unknown>(
  path: string,
  form: Record<string, string | number | boolean | undefined | null>,
  options?: RequestOptions
) => {
  const body = new URLSearchParams();
  Object.entries(form).forEach(([key, value]) => {
    if (value !== undefined && value !== null) body.append(key, String(value));
  });
  return request<T>(
    path,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
    options
  );
};

/**
 * For endpoints declared with query params instead of a request body
 * (e.g. contact submit, newsletter subscribe) — POST with an empty body.
 */
export const apiPostQuery = <T = unknown>(
  path: string,
  params: QueryParams,
  options?: RequestOptions
) => request<T>(path, { method: "POST" }, { ...options, params });

export const apiPostMultipart = <T = unknown>(
  path: string,
  formData: FormData,
  options?: RequestOptions
) => request<T>(path, { method: "POST", body: formData }, options);

async function requestText(
  path: string,
  init: RequestInit,
  options?: RequestOptions
): Promise<string> {
  const isServer = typeof window === "undefined";
  const backendUrl = process.env.API_BACKEND_URL ?? "";

  let baseUrl = API_BASE_URL;
  let cleanPath = path;

  if (isServer && backendUrl) {
    if (cleanPath.startsWith("/api/v1")) {
      cleanPath = cleanPath.slice("/api/v1".length);
    }
    baseUrl = backendUrl;
  }

  const url = `${baseUrl}${cleanPath}${buildQuery(options?.params)}`;

  const fetchCache =
    options?.cache ??
    (options?.revalidate === 0 || options?.revalidate === false
      ? "no-store"
      : undefined);

  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
  if (options?.revalidate !== undefined) {
    nextOptions.revalidate = options.revalidate;
  }
  if (options?.tags && options.tags.length > 0) {
    nextOptions.tags = options.tags;
  }

  const res = await fetch(url, {
    ...init,
    cache: fetchCache,
    signal: options?.signal,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    headers: {
      Accept: "application/xml, text/xml, text/plain, */*",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.text();
    } catch {
      detail = undefined;
    }
    throw new ApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      detail
    );
  }

  return await res.text();
}

export const apiGetText = (path: string, options?: RequestOptions) =>
  requestText(path, { method: "GET" }, options);
