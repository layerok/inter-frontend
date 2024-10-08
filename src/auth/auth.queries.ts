import { queryOptions } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { apiClient } from "src/apiClient.ts";

type ExtendedAxiosConfig = AxiosRequestConfig & {
  skipAuthRefresh?: boolean;
};

export const authQueries = {
  loggedInUser: ({
    skipAuthRefresh = false,
  }: { skipAuthRefresh?: boolean } = {}) =>
    queryOptions({
      queryKey: ["auth", "user"] as const,
      queryFn: async ({ signal }) => {
        const response = await apiClient.getLoggedInUser(null, null, {
          signal,
          skipAuthRefresh,
        } as ExtendedAxiosConfig);
        return response.data;
      },
    }),
} as const;
