import { httpCreate } from "@/shared/lib/http-client";

const mapleApiBaseUrl =
  typeof window === "undefined"
    ? "https://open.api.nexon.com/maplestory"
    : `${process.env.NEXT_PUBLIC_HOST_URL}/api/maple`;

export const mapleApiClient = () => {
  const httpClient = httpCreate(mapleApiBaseUrl, {
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
