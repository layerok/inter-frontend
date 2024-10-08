import { createApiClient } from "@intersog/js-sdk";

export const apiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});
