import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export declare type ImplicitParamValue = string | number;

export interface UnknownParamsObject {
  [parameter: string]: ImplicitParamValue;
}

export type Parameters<ParamsObject = UnknownParamsObject> = ParamsObject;

export declare type RequestPayload = any;
export declare type OperationResponse<Response> = Promise<
  AxiosResponse<Response>
>;
export declare type UnknownOperationMethod = (
  parameters?: Parameters,
  data?: RequestPayload,
  config?: AxiosRequestConfig,
) => OperationResponse<any>;
export interface UnknownOperationMethods {
  [operationId: string]: UnknownOperationMethod;
}

export type OpenAPIClient<OperationMethods = UnknownOperationMethods> =
  AxiosInstance & OperationMethods;

declare namespace Components {
  namespace Responses {
    export interface AuthenticationException {
      message: string;
    }
    export interface AuthorizationException {
      message: string;
    }
    export interface ModelNotFoundException {
      message: string;
    }
    export interface ValidationException {
      message: string;
      errors: {
        [name: string]: string[];
      };
    }
  }
  namespace Schemas {
    export interface UserResource {
      id: string;
      gid: string;
      name: string;
      email: string;
      created_at: string;
      updated_at: string;
    }
    export interface LoginBrowserRequest {
      email: string;
      password: string;
      remember_me?: boolean;
    }
    export interface PaginatedSetLinks {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    }
    export interface PaginatedSetMeta {
      current_page: number;
      from: number | null;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string | null;
      per_page: number;
      to: number | null;
      total: number;
    }
  }
}
declare namespace Paths {
  namespace UpdateUser {
    namespace Parameters {
      export type User = string;
    }
    export interface PathParameters {
      user: Parameters.User;
    }
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource;
      }
      export type $401 = Components.Responses.AuthenticationException;
      export type $403 = Components.Responses.AuthorizationException;
      export type $404 = Components.Responses.ModelNotFoundException;
      export type $422 = Components.Responses.ValidationException;
    }
  }
  namespace DeleteUser {
    namespace Parameters {
      export type User = string;
    }
    export interface PathParameters {
      user: Parameters.User;
    }
    namespace Responses {
      export interface $204 {}
      export type $401 = Components.Responses.AuthenticationException;
      export type $403 = Components.Responses.AuthorizationException;
      export type $404 = Components.Responses.ModelNotFoundException;
    }
  }
  namespace CreateUser {
    export type RequestBody = Components.Schemas.UserStoreRequest;
    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource;
      }
      export type $401 = Components.Responses.AuthenticationException;
      export type $403 = Components.Responses.AuthorizationException;
      export type $422 = Components.Responses.ValidationException;
    }
  }
  namespace LoginBrowser {
    export type RequestBody = Components.Schemas.LoginBrowserRequest;
    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource;
      }
      export type $403 = Components.Responses.AuthorizationException;
      export type $422 = Components.Responses.ValidationException;
    }
  }
  namespace LogoutBrowser {
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {}
      export type $401 = Components.Responses.AuthenticationException;
    }
  }
  namespace GetLoggedInUser {
    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource;
      }
      export type $401 = Components.Responses.AuthenticationException;
    }
  }
  namespace InitializeCsrfCookie {
    namespace Responses {
      export interface $200 {}
    }
  }
  namespace GetUser {
    namespace Parameters {
      export type User = string;
    }
    export interface PathParameters {
      user: Parameters.User;
    }

    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource;
      }
      export type $401 = Components.Responses.AuthenticationException;
      export type $403 = Components.Responses.AuthorizationException;
      export type $404 = Components.Responses.ModelNotFoundException;
    }
  }
  namespace GetUsers {
    export interface QueryParameters {
      page?: {
        number?: number;
        size?: number;
      };
    }
    namespace Responses {
      export interface $200 {
        data: Components.Schemas.UserResource[];
        links: Components.Schemas.PaginatedSetLinks;
        meta: Components.Schemas.PaginatedSetMeta;
      }
      export type $401 = Components.Responses.AuthenticationException;
      export type $403 = Components.Responses.AuthorizationException;
    }
  }
}

export interface OperationMethods {
  "getUsers"(
    parameters?: Parameters<Paths.GetUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetUsers.Responses.$200>;
  "createUser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateUser.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.CreateUser.Responses.$200>;
  "getUser"(
    parameters?: Parameters<Paths.GetUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetUser.Responses.$200>;
  "updateUser"(
    parameters?: Parameters<Paths.UpdateUser.PathParameters> | null,
    data?: Paths.UpdateUser.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.UpdateUser.Responses.$200>;
  "deleteUser"(
    parameters?: Parameters<Paths.DeleteUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.DeleteUser.Responses.$204>;
  "initializeCsrfCookie"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.InitializeCsrfCookie.Responses.$200>;

  "loginBrowser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginBrowser.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.LoginBrowser.Responses.$200>;

  "getLoggedInUser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetLoggedInUser.Responses.$200>;

  "logoutBrowser"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LogoutBrowser.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.LogoutBrowser.Responses.$200>;
}

export type Client = OpenAPIClient<OperationMethods>;
