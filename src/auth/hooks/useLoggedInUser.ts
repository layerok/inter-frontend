import {
  type DefaultError,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { Paths } from "@intersog/js-sdk";
import { authQueries } from "src/auth/auth.queries.ts";

export const useLoggedInUser = (
  options: Omit<
    UseQueryOptions<
      Paths.GetUser.Responses.$200,
      DefaultError,
      Paths.GetUser.Responses.$200,
      any
    >,
    "queryFn" | "queryKey"
  > = {},
) => {
  return useQuery({
    ...authQueries.loggedInUser({ skipAuthRefresh: false }),
    ...options,
  });
};
