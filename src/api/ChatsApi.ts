import { HTTPTransport } from '../types/HTTPTransport.ts';

export class ChatsApi extends HTTPTransport {
  chatUrl = `${this.BASE_URL}/chats`;

  async chats() {
    const res = await this.get(`${this.chatUrl}`);
    return JSON.parse(res.response);
  }

  async createChat(data: { title: string }) {
    const res = await this.post(`${this.chatUrl}`, {
      data,
    });
    return res;
  }

  async getChatUsers({ id }: { id: number }) {
    const res = await this.get(`${this.chatUrl}/${id}/users`);
    return JSON.parse(res.response);
  }

  async addUser(data: { users: number[]; chatId: number }) {
    const res = await this.put(`${this.chatUrl}/users`, {
      data,
    });
    return res;
  }

  async deleteUser(data: { users: number[]; chatId: number }) {
    const res = await this.delete(`${this.chatUrl}/users`, {
      data,
    });
    return res;
  }

  async token(id: number) {
    const res = await this.post(`${this.chatUrl}/token/${id}`);
    return JSON.parse(res.response);
  }

  async updateAvatar(data: FormData) {
    return this.put(`${this.chatUrl}/avatar`, { data });
  }
}
