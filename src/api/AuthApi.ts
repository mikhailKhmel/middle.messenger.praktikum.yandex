import { HTTPTransport } from '../types/HTTPTransport.ts';

export class AuthApi extends HTTPTransport {
  authUrl = `${this.BASE_URL}/auth`;

  async getUserInfo() {
    const res = await this.get(`${this.authUrl}/user`);
    return JSON.parse(res.response);
  }

  signin(data: { login: string; password: string }) {
    return this.post(`${this.authUrl}/signin`, {
      data,
    });
  }

  signup(data: {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return this.post(`${this.authUrl}/signup`, {
      data,
    });
  }

  logout() {
    this.post(`${this.authUrl}/logout`, { headers: {} });
  }
}
