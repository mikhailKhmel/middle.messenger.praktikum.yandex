import { HTTPTransport } from '../types/HTTPTransport.ts';

const userAPIInstance = new HTTPTransport();

export class UserApi {
  baseUrl = 'https://ya-praktikum.tech/api/v2/user';

  async update(data: {
    first_name: string,
    last_name: string,
    login: string,
    email: string,
    display_name: string,
    phone: string
  }) {
    const res = await userAPIInstance.put(`${this.baseUrl}/profile`, { data });
    return res;
  }

  async updatePassword(data: { oldPassword: string, newPassword: string }) {
    const res = await userAPIInstance.put(`${this.baseUrl}/profile/password`, { data });
    return res;
  }

  async updateAvatar(data: {avatar: File}) {
    return userAPIInstance.put(`${this.baseUrl}/profile/avatar`, { data });
  }
}
