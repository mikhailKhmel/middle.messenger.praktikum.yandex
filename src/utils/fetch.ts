enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  headers?: any;
  method: MethodEnum;
  data?: any;
};

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?',
  );
}

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = { data?: any };
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<unknown>;

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.GET });

  // используем тип и удаляем дублирование в аргументах
  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.PUT });

  // используем тип и удаляем дублирование в аргументах
  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.POST });

  // используем тип и удаляем дублирование в аргументах
  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: MethodEnum.DELETE });

  request(url: string, options: Options = { method: MethodEnum.GET }): Promise<XMLHttpRequest> {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === MethodEnum.GET;
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === MethodEnum.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
