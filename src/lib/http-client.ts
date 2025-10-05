type HttpClientConfig = {
  baseURL: string;
  headers?: HeadersInit;
};

type GetRequestConfig = {
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
};

type MutateRequestConfig = {
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
};

type ErrorResponse = {
  error?: {
    name?: string;
    message?: string;
  };
};

export function createHttpClient(config: HttpClientConfig) {
  const { baseURL, headers: defaultHeaders = {} } = config;

  async function request<T>(
    endpoint: string,
    options: {
      method: string;
      headers?: HeadersInit;
      body?: string;
      next?: NextFetchRequestConfig;
    },
  ): Promise<T> {
    const url = `${baseURL}${endpoint}`;
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
      method: options.method,
      headers,
    };

    if (options.body) {
      fetchOptions.body = options.body;
    }

    if (options.next) {
      fetchOptions.next = options.next;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      try {
        const error: ErrorResponse = await response.json();
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
      } catch {
        // JSON 파싱 실패 시 기본 에러 메시지 사용
      }
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T>(endpoint: string, config?: GetRequestConfig): Promise<T> => {
      const options: {
        method: string;
        headers?: HeadersInit;
        next?: NextFetchRequestConfig;
      } = {
        method: "GET",
      };

      if (config?.headers) {
        options.headers = config.headers;
      }

      if (config?.next) {
        options.next = config.next;
      }

      return request<T>(endpoint, options);
    },

    post: <T>(
      endpoint: string,
      body?: Record<string, unknown>,
      config?: MutateRequestConfig,
    ): Promise<T> => {
      const options: {
        method: string;
        headers?: HeadersInit;
        body?: string;
        next?: NextFetchRequestConfig;
      } = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      if (config?.next) {
        options.next = config.next;
      }

      return request<T>(endpoint, options);
    },

    put: <T>(
      endpoint: string,
      body?: Record<string, unknown>,
      config?: MutateRequestConfig,
    ): Promise<T> => {
      const options: {
        method: string;
        headers?: HeadersInit;
        body?: string;
        next?: NextFetchRequestConfig;
      } = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      if (config?.next) {
        options.next = config.next;
      }

      return request<T>(endpoint, options);
    },

    delete: <T>(endpoint: string, config?: GetRequestConfig): Promise<T> => {
      const options: {
        method: string;
        headers?: HeadersInit;
        next?: NextFetchRequestConfig;
      } = {
        method: "DELETE",
      };

      if (config?.headers) {
        options.headers = config.headers;
      }

      if (config?.next) {
        options.next = config.next;
      }

      return request<T>(endpoint, options);
    },
  };
}

// 메이플스토리 API 클라이언트
function getMapleApiKey(): string {
  const key = process.env.MAPLE_API_KEY;
  if (!key) {
    throw new Error("MAPLE_API_KEY is not defined in environment variables");
  }
  return key;
}

export const mapleClient = createHttpClient({
  baseURL: "https://open.api.nexon.com/maplestory",
  headers: {
    "x-nxopen-api-key": getMapleApiKey(),
  },
});
