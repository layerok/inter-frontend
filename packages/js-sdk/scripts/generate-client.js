import openapi from "../src/openapi.json" with { type: "json" };

export const getApiClientCode = (json) => {
  const operations = [];
  const exports = [];

  const omitPathParameters =
    `const omitPathParameters = (params: Record<string, any> | undefined | null, url: string,) => {` +
    `if (!params) { return params; }` +
    `return Object.keys(params).reduce((acc, paramName) => {` +
    `if (url.includes("{" +paramName + "}")) {return acc;}` +
    `return {` +
    `[paramName]: params[paramName],` +
    `...acc,` +
    `};` +
    `}, {});` +
    `};`;

  const replacePathParams =
    `const replacePathParameters = (` +
    `url: string,` +
    `params: Record<string, any> | undefined | null,` +
    `) => {` +
    `if (!params) {` +
    `return url;` +
    `}` +
    `return Object.keys(params).reduce((acc, paramName) => {` +
    `return acc.replace( "{" + paramName + "}", params[paramName]);` +
    `}, url);` +
    `};`;

  const utils = [omitPathParameters, replacePathParams].join(" ");

  Object.keys(json.paths).forEach((url) => {
    const path = json.paths[url];
    const methods = Object.keys(path);
    methods.forEach((method) => {
      const operation = path[method];
      const operationId = operation["operationId"];
      const functionName = dotToCamelCase(kebabToCamelCase(operationId));

      const body = {
        get: `const url = "${url}"; return client.get(replacePathParameters(url, parameters), {params: omitPathParameters(parameters, url), data: data,...config,});`,
        post: `const url = "${url}"; return client.post(replacePathParameters(url, parameters), data, {params: omitPathParameters(parameters, url),...config,});`,
        put: `const url = "${url}"; return client.put(replacePathParameters(url, parameters), data, {params: omitPathParameters(parameters, url),...config,});`,
        delete: `const url = "${url}"; return client.delete(replacePathParameters(url, parameters), {params: omitPathParameters(parameters, url),data: data,...config,});`,
      }[method];
      operations.push(
        `const ${functionName}: OperationMethods["${operationId}"] = (parameters,data,config,) => {${body}};`,
      );
      exports.push([operationId, functionName]);
    });
  });

  const imports = [
    `import type { AxiosRequestConfig } from "axios";`,
    `import type { Client, OperationMethods } from "./openapi";`,
    `import axios from "axios";`,
  ].join("");

  const createAxiosClient = `const client = axios.create({baseURL: serverUrl,...axiosConfig,})`;
  const createApiClientBody = `${createAxiosClient}; ${operations.join(
    " ",
  )} const operations = {${exports
    .map((export_) => `"${export_[0]}": ${export_[1]}`)
    .join(",")}}; return Object.assign(client, operations) as Client`;
  return `${imports} export const createApiClient = ({serverUrl}: {serverUrl: string; }, axiosConfig: AxiosRequestConfig,): Client => { ${createApiClientBody} }; ${utils}`;
};

const kebabToCamelCase = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
const dotToCamelCase = (s) => s.replace(/\../g, (x) => x[1].toUpperCase());

console.log(getApiClientCode(openapi));
