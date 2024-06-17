import { HTTPTransport } from '../utils/fetch.ts';

const userAPIInstance = new HTTPTransport();

export class UserApi {
  baseUrl = 'ya-praktikum.tech/api/v2/user';

  async update(data: {
    first_name: string,
    last_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
  }) {
    const res = await userAPIInstance.put(`${this.baseUrl}`, { data });
    return res;
  }

  async updatePassword(data: {oldPassword: string, newPassword: string}) {
    const res = await userAPIInstance.put(`${this.baseUrl}/password`, { data });
    return res;
  }
}
