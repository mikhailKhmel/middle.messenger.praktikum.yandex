export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Options = {
  headers?: any;
  method: MethodEnum;
  data?: any;
};

export function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

type OptionsWithoutMethod = { data?: any; headers?: any };
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  BASE_URL = 'https://ya-praktikum.tech/api/v2';

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: MethodEnum.GET,
    });

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: MethodEnum.PUT,
    });

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: MethodEnum.POST,
    });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, {
      ...options,
      method: MethodEnum.DELETE,
    });

  request(url: string, options: Options = { method: MethodEnum.GET }): Promise<XMLHttpRequest> {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === MethodEnum.GET;
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      Object.keys(headers ?? {}).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      if (method === MethodEnum.POST || method === MethodEnum.PUT) {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      }
      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (method === MethodEnum.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  }
}
