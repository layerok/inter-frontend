import { useContext } from "react";
import { ApiClientContext } from "src/lib/js-sdk/ApiClientProvider.tsx";

export const useApiClient = () => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error("useApiClient must used withing ApiClientProvider");
  }
};
