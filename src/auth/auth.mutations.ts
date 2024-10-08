import type { Paths } from "@intersog/js-sdk";
import type { AxiosRequestConfig } from "axios";
import { apiClient } from "src/apiClient.ts";

export const authMutations = {
  logout: {
    mutationKey: ["auth", "logout"],
    mutationFn: async ({
      data,
      axiosConfig,
    }: {
      data?: Paths.LogoutBrowser.RequestBody;
      axiosConfig?: AxiosRequestConfig;
    }) => {
      const response = await apiClient.logoutBrowser(null, data, axiosConfig);
      return response.data;
    },
  },
  login: {
    mutationKey: ["auth", "login"],
    mutationFn: async ({
      data,
      axiosConfig,
    }: {
      data: Paths.LoginBrowser.RequestBody;
      axiosConfig?: AxiosRequestConfig;
    }) => {
      const response = await apiClient.loginBrowser(null, data, axiosConfig);
      return response.data;
    },
  },
};
