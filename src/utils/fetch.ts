enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  headers?: any
  method: METHOD
  data?: any
}

function queryStringify(data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data)
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`
  }, '?')
}

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = { data?: any }
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

export class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET })
  }
  post = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHOD.POST })
  }

  put = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT })
  }

  delete = (url: string, options: OptionsWithoutMethod = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE })
  }

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { headers, method, data } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const isGet = method === METHOD.GET
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })
      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHOD.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}
