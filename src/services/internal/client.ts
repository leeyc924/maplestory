import { httpCreate } from "@/shared/lib/http-client";

const internalApiBaseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/api/internal`;

export const internalApiClient = () => {
  const httpClient = httpCreate(internalApiBaseUrl, {
    register: {
      onError(error) {
        return Promise.reject(error.reason);
      },
      onNetworkError: (error) => {
        return Promise.reject(error.reason);
      },
    },
  });

  return httpClient;
};
