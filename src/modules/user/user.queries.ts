import { queryOptions } from "@tanstack/react-query";
import { Paths } from "@intersog/js-sdk";
import { AxiosRequestConfig } from "axios";
import { apiClient } from "src/clients/apiClient.ts";

export const userQueries = {
  all: ["users"] as const,
  list: (
    params: Paths.GetUsers.QueryParameters,
    reqConfig?: AxiosRequestConfig,
  ) => {
    return queryOptions({
      queryKey: [...userQueries.lists(), { params }] as const,
      queryFn: async ({ signal }) => {
        const response = await apiClient.getUsers(params, null, {
          signal,
          ...reqConfig,
        });
        return response.data;
      },
    });
  },
  lists: () => [...userQueries.all, "list"] as const,
  details: () => [...userQueries.all, "detail"] as const,
  detail: (
    params: Paths.GetUser.PathParameters,
    reqConfig?: AxiosRequestConfig,
  ) => {
    return queryOptions({
      queryKey: [...userQueries.details(), { params }] as const,
      queryFn: async ({ signal }) => {
        const response = await apiClient.getUser(params, null, {
          signal,
          ...reqConfig,
        });
        return response.data;
      },
    });
  },
} as const;
