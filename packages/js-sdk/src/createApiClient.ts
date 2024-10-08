import type { AxiosRequestConfig } from "axios";
import type { Client, OperationMethods } from "./openapi";
import axios from "axios";

export const createApiClient = (axiosConfig: AxiosRequestConfig): Client => {
  const client = axios.create(axiosConfig);

  const getUsers: OperationMethods["getUsers"] = (parameters, data, config) => {
    const url = "/user";
    return client.get(replacePathParameters(url, parameters), {
      params: omitPathParameters(parameters, url),
      data: data,
      ...config,
    });
  };
  const createUser: OperationMethods["createUser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/user";
    return client.post(replacePathParameters(url, parameters), data, {
      params: omitPathParameters(parameters, url),
      ...config,
    });
  };
  const getUser: OperationMethods["getUser"] = (parameters, data, config) => {
    const url = "/user/{user}";
    return client.get(replacePathParameters(url, parameters), {
      params: omitPathParameters(parameters, url),
      data: data,
      ...config,
    });
  };
  const updateUser: OperationMethods["updateUser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/user/{user}";
    return client.put(replacePathParameters(url, parameters), data, {
      params: omitPathParameters(parameters, url),
      ...config,
    });
  };
  const deleteUser: OperationMethods["deleteUser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/user/{user}";
    return client.delete(replacePathParameters(url, parameters), {
      params: omitPathParameters(parameters, url),
      data: data,
      ...config,
    });
  };

  const initializeCsrfCookie: OperationMethods["initializeCsrfCookie"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/auth/csrf-cookie";
    return client.get(replacePathParameters(url, parameters), {
      params: omitPathParameters(parameters, url),
      data: data,
      ...config,
    });
  };

  const loginBrowser: OperationMethods["loginBrowser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/auth/login/browser";
    return client.post(replacePathParameters(url, parameters), data, {
      params: omitPathParameters(parameters, url),
      ...config,
    });
  };
  const getLoggedInUser: OperationMethods["getLoggedInUser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/auth/user";
    return client.get(replacePathParameters(url, parameters), {
      params: omitPathParameters(parameters, url),
      data: data,
      ...config,
    });
  };
  const logoutBrowser: OperationMethods["logoutBrowser"] = (
    parameters,
    data,
    config,
  ) => {
    const url = "/auth/logout/browser";
    return client.post(replacePathParameters(url, parameters), data, {
      params: omitPathParameters(parameters, url),
      ...config,
    });
  };

  const operations = {
    initializeCsrfCookie,
    loginBrowser,
    getLoggedInUser,
    logoutBrowser,
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
  };
  return Object.assign(client, operations);
};
const omitPathParameters = (
  params: Record<string, any> | undefined | null,
  url: string,
) => {
  if (!params) {
    return params;
  }
  return Object.keys(params).reduce((acc, paramName) => {
    if (url.includes("{" + paramName + "}")) {
      return acc;
    }
    return { [paramName]: params[paramName], ...acc };
  }, {});
};
const replacePathParameters = (
  url: string,
  params: Record<string, any> | undefined | null,
) => {
  if (!params) {
    return url;
  }
  return Object.keys(params).reduce((acc, paramName) => {
    return acc.replace("{" + paramName + "}", params[paramName]);
  }, url);
};
