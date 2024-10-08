import { Client } from "@intersog/js-sdk";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { createContext, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "src/auth/auth.constants.ts";

export const ApiClientContext = createContext<null | Client>(null);

export const ApiClientProvider = ({
  children,
  client,
}: PropsWithChildren<{
  client: Client;
}>) => {
  const navigate = useNavigate();
  console.log("render");

  useEffect(() => {
    const id = client.interceptors.request.use((config) => {
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

    return () => client.interceptors.request.eject(id);
  }, [client]);

  useEffect(() => {
    const id = createAuthRefreshInterceptor(
      client,
      () => client.initializeCsrfCookie(),
      {
        statusCodes: [419],
      },
    );
    return () => client.interceptors.request.eject(id);
  }, [client]);

  useEffect(() => {
    console.log("set interceptor");
    const onUnauthenticated = () => {
      navigate(loginRoute);
      console.log("authenticated");
      return Promise.resolve();
    };

    const id = createAuthRefreshInterceptor(client, onUnauthenticated, {
      statusCodes: [401],
    });
    return () => client.interceptors.request.eject(id);
  }, [client, navigate]);

  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  );
};
