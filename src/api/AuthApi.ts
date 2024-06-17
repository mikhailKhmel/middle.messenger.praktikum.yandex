import { HTTPTransport } from '../utils/fetch.ts';

const chatAPIInstance = new HTTPTransport();

export class AuthApi {
  baseUrl = 'ya-praktikum.tech/api/v2/auth';

  signin(data: { login: string; password: string }) {
    return chatAPIInstance.post(`${this.baseUrl}/signin`, {
      data,
    });
  }

  signup(data: {
    first_name: string,
    last_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }) {
    return chatAPIInstance.post(`${this.baseUrl}/auth/signup`, { data });
  }

  logout() {
    chatAPIInstance.post(`${this.baseUrl}/auth/logout`);
  }
}
