export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Options = {
  headers?: Record<string, string>;
  method: MethodEnum;
  data?: Record<string, any> | FormData;
};

export function queryStringify(data: Record<string, any>): string {
  if (!data || Object.keys(data).length === 0) return '';
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<any>;

export class HTTPTransport {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.GET });

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.PUT });

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.POST });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.DELETE });

  async request(url: string, options: Options): Promise<any> {
    const { headers = {}, method, data } = options;
    let fullUrl = url;

    if (method === MethodEnum.GET && data) {
      fullUrl += `?${queryStringify(data)}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, fullUrl);
      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.timeout = 60000;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          const status = xhr.status || 0;
          const message = HTTPTransport.getStatusMessage(status);
          reject({ status, reason: xhr.response?.reason || message });
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (method === MethodEnum.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  static getStatusMessage(status: number): string {
    switch (Math.floor(status / 100)) {
      case 0:
        return 'abort';
      case 1:
        return 'Information';
      case 2:
        return 'Ok';
      case 3:
        return 'Redirect failed';
      case 4:
        return 'Access error';
      case 5:
        return 'Internal server error';
      default:
        return 'Unknown status';
    }
  }
}
