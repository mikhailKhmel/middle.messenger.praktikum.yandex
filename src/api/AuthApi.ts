import { HTTPTransport } from '../types/HTTPTransport.ts';

const chatAPIInstance = new HTTPTransport();

export class AuthApi {
  baseUrl = 'https://ya-praktikum.tech/api/v2/auth';

  signin(data: { login: string; password: string }) {
    return chatAPIInstance.post(`${this.baseUrl}/signin`, {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  signup(data: {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }) {
    return chatAPIInstance.post(`${this.baseUrl}/signup`, {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  logout() {
    chatAPIInstance.post(`${this.baseUrl}/logout`, { headers: {} });
  }
}
