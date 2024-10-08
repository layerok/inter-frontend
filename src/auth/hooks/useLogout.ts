import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import type { Paths } from "@intersog/js-sdk";
import type { AxiosRequestConfig } from "axios";
import { authMutations } from "src/auth/auth.queries.ts";

export const useLogout = (
  options: UseMutationOptions<
    Paths.LogoutBrowser.Responses.$200,
    DefaultError,
    {
      data?: Paths.LogoutBrowser.RequestBody;
      axiosConfig?: AxiosRequestConfig;
    }
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...authMutations.logout,
    ...options,
    onError: (error, variables, context) => {
      return options?.onError?.(error, variables, context);
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
};
