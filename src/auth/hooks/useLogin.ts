import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import type { Paths } from "@intersog/js-sdk";
import type { AxiosRequestConfig } from "axios";
import { authQueries } from "src/auth/auth.queries.ts";
import { authMutations } from "src/auth/auth.mutations.ts";

export const useLogin = (
  options: UseMutationOptions<
    Paths.LoginBrowser.Responses.$200,
    DefaultError,
    {
      data: Paths.LoginBrowser.RequestBody;
      axiosConfig?: AxiosRequestConfig;
    }
  > = {},
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...authMutations.login,
    onSuccess: async (data) => {
      queryClient.setQueryData(authQueries.loggedInUser().queryKey, data, {
        updatedAt: Date.now(),
      });
    },
    ...options,
  });
};
