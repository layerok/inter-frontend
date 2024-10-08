import { Client, createApiClient } from "@intersog/js-sdk";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const createClient = (): Client => {
  const apiClient = createApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    withXSRFToken: true,
  });

  apiClient.interceptors.request.use((config) => {
    const { method } = config;

    const queryParamsOrRequestBody: {
      XDEBUG_SESSION_START?: number;
    } = {};

    if (import.meta.env.DEV) {
      queryParamsOrRequestBody.XDEBUG_SESSION_START = 1;
    }

    const type = method === "post" ? "data" : "params";

    config[type] = {
      ...queryParamsOrRequestBody,
      ...config[type],
    };

    return config;
  });

  createAuthRefreshInterceptor(
    apiClient,
    () => apiClient.initializeCsrfCookie(),
    {
      statusCodes: [419],
    },
  );

  const onUnauthenticated = () => {
    // todo: emit user unauthenticated
    return Promise.resolve();
  };

  createAuthRefreshInterceptor(apiClient, onUnauthenticated, {
    statusCodes: [401],
  });

  return apiClient;
};

export const apiClient = createClient();
