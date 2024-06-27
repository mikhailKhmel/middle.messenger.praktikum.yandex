import { HTTPTransport } from '../types/HTTPTransport.ts';

export class UserApi extends HTTPTransport {
  userUrl = `${this.BASE_URL}/user`;

  async update(data: {
    first_name: string;
    last_name: string;
    login: string;
    email: string;
    display_name: string;
    phone: string;
  }) {
    const res = await this.put(`${this.userUrl}/profile`, { data });
    return res;
  }

  async updatePassword(data: { oldPassword: string; newPassword: string }) {
    const res = await this.put(`${this.userUrl}/profile/password`, { data });
    return res;
  }

  async updateAvatar(data: FormData) {
    return this.put(`${this.userUrl}/profile/avatar`, { data });
  }

  async searchUser(data: { login: string }) {
    const res = await this.post(`${this.userUrl}/search`, {
      data,
    });
    return JSON.parse(res.response);
  }
}
