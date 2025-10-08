import { stringifyQuery } from "./utils";

export type HttpResponse<T extends object> = {
  data: T;
  ok: boolean;
  status: number;
  url: string;
  config?: RequestInit;
  headers?: Headers;
};

interface QueryObject {
  [key: string]: unknown;
}

interface FetchConfig extends RequestInit {
  data?: QueryObject;
  query?: QueryObject;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  cache?: RequestCache;
}

export type FetchError = {
  reason: unknown;
  url: string;
  config: RequestInit;
  status?: number;
  isServerSide: boolean;
};

type RegisterOptions = {
  onRequest: (config: RequestInit) => RequestInit;
  onResponse: <T extends object>(
    response: HttpResponse<T>,
  ) => HttpResponse<T> | PromiseLike<HttpResponse<T>>;
  onNetworkError: (error: FetchError) => Promise<never> | HttpResponse<any>;
  onError: (error: FetchError) => Promise<never> | HttpResponse<any>;
};

type DefaultConfigOptions = Omit<FetchConfig, "data" | "query"> & {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  ignoreErrorCodes?: number;
};

// ============================================================================
// Pure Functions
// ============================================================================

const formatRequestHeaders = <T extends Headers>(
  headers: T | null,
): HeadersInit | undefined => {
  if (!headers) {
    return;
  }

  const userAgent = headers.get("User-Agent");
  const cookie = headers.get("Cookie");
  const ipAddress = headers.get("x-forwarded-for");
  const referer = headers.get("Referer");
  const requestId = headers.get("X-Request-ID");

  return {
    ...(userAgent && { "user-agent": userAgent }),
    ...(cookie && { cookie }),
    ...(ipAddress && { "x-forwarded-for": ipAddress }),
    ...(referer && { referer }),
    ...(requestId && { "x-request-id": requestId }),
    "x-nxopen-api-key": process.env.MAPLE_API_KEY || "",
  };
};

const processHttpResponse = async <T extends object>(
  response: Response,
  config: RequestInit,
): Promise<HttpResponse<T>> => {
  const data = (await response.json().catch((error) => ({ ...error }))) as T;
  const { headers, ok, status, url } = response;

  if (typeof window === "undefined") {
    return { config, data, headers, ok, status, url };
  }

  return { data, ok, status, url };
};

const buildFullUrl = (
  baseURL: string,
  url: string,
  query?: QueryObject,
): string => {
  const queryString = query ? stringifyQuery(query) : "";
  return !url.startsWith("http")
    ? `${baseURL}${url}${queryString}`
    : `${url}${queryString}`;
};

const buildRequestConfig = (
  config: FetchConfig,
  defaultConfig: DefaultConfigOptions,
  formattedHeaders?: HeadersInit,
): RequestInit => {
  const { cache, credentials, data, signal, ...restConfig } = config;
  const body = data ? JSON.stringify(data) : restConfig.body;
  const finalHeaders = {
    ...formattedHeaders,
    ...defaultConfig.headers,
    ...restConfig.headers,
  };

  return {
    ...defaultConfig,
    ...restConfig,
    body,
    cache: cache || "no-store",
    credentials: credentials || "include",
    headers: finalHeaders,
    signal,
  };
};

const createFetchError = (
  url: string,
  config: RequestInit,
  reason: unknown,
): FetchError => ({
  config,
  isServerSide: typeof window === "undefined",
  reason,
  url,
});

// ============================================================================
// Instance Factory
// ============================================================================

const createInstance = (
  baseURL = "",
  defaultConfig: DefaultConfigOptions = {},
) => {
  let interceptor: RegisterOptions = {
    onError: (error) => Promise.reject(error.reason),
    onNetworkError: (error) => Promise.reject(error.reason),
    onRequest: (config) => config,
    onResponse: (response) => response,
  };

  const request = async <T extends object = object>(
    url: string,
    config: FetchConfig,
    headers?: () => Headers,
  ): Promise<HttpResponse<T>> => {
    // 서버 사이드에서 headers 필수 검증
    if (typeof window === "undefined" && !headers) {
      throw new Error("서버 사이드에서는 'headers' 프로퍼티가 필요합니다");
    }

    // URL 및 설정 구성
    const formattedHeaders = headers && formatRequestHeaders(headers());
    const fullUrl = buildFullUrl(baseURL, url, config.query);
    const requestConfig = buildRequestConfig(
      config,
      defaultConfig,
      formattedHeaders,
    );

    // 인터셉터 적용
    const finalConfig = interceptor.onRequest(requestConfig);
    try {
      const response = await fetch(fullUrl, finalConfig);
      return processHttpResponse<T>(response, finalConfig)
        .then(interceptor.onResponse)
        .catch((error) => {
          return interceptor.onError(
            createFetchError(fullUrl, finalConfig, error),
          );
        });
    } catch (error) {
      return interceptor.onNetworkError(
        createFetchError(fullUrl, finalConfig, error),
      );
    }
  };

  return {
    delete: <T extends object>(
      url: string,
      config: FetchConfig = {},
      headers?: () => Headers,
    ) => request<T>(url, { ...config, method: "DELETE" }, headers),

    get: <T extends object>(
      url: string,
      config: FetchConfig = {},
      headers?: () => Headers,
    ) => request<T>(url, { ...config, method: "GET" }, headers),

    patch: <T extends object>(
      url: string,
      config: FetchConfig = {},
      headers?: () => Headers,
    ) => request<T>(url, { ...config, method: "PATCH" }, headers),

    post: <T extends object>(
      url: string,
      config: FetchConfig = {},
      headers?: () => Headers,
    ) => request<T>(url, { ...config, method: "POST" }, headers),

    put: <T extends object>(
      url: string,
      config: FetchConfig = {},
      headers?: () => Headers,
    ) => request<T>(url, { ...config, method: "PUT" }, headers),

    register: (customRegister: Partial<RegisterOptions>) => {
      interceptor = {
        ...interceptor,
        ...customRegister,
      };
    },
  };
};

export const httpCreate = (
  baseURL: string,
  options?: Omit<DefaultConfigOptions, "method"> & {
    register?: Partial<RegisterOptions>;
  },
) => {
  const { register, ...restOptions } = options || {};
  const httpClient = createInstance(baseURL, {
    ...restOptions,
  });

  if (register) {
    httpClient.register(register);
  }

  return httpClient;
};
