import { Paths } from "@intersog/js-sdk";
import { AxiosRequestConfig } from "axios";
import { apiClient } from "src/api-client/apiClient.ts";

export const userMutations = {
  updateDetail: {
    mutationFn: async ({
      params,
      data,
      reqConfig,
    }: {
      params: Paths.UpdateUser.PathParameters;
      data: Paths.UpdateUser.RequestBody;
      reqConfig?: AxiosRequestConfig;
    }) => {
      const response = await apiClient.updateUser(params, data, reqConfig);
      return response.data;
    },
  },
  deleteDetail: {
    mutationFn: async ({
      params,
      data,
      reqConfig,
    }: {
      params: Paths.DeleteUser.PathParameters;
      data?: any;
      reqConfig?: AxiosRequestConfig;
    }) => {
      const response = await apiClient.deleteUser(params, data, reqConfig);
      return response.data;
    },
  },
  createDetail: {
    mutationFn: async ({
      data,
      params,
      reqConfig,
    }: {
      data: Paths.CreateUser.RequestBody;
      params: any;
      reqConfig?: AxiosRequestConfig;
    }) => {
      const response = await apiClient.createUser(params, data, reqConfig);
      return response.data;
    },
  },
};
