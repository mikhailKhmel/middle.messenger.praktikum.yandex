import { HTTPTransport } from '../types/HTTPTransport.ts';

const chatAPIInstance = new HTTPTransport();

export class ChatsApi {
  baseUrl = 'https://ya-praktikum.tech/api/v2/chats';

  async chats() {
    const res = await chatAPIInstance.get(`${this.baseUrl}`);
    return JSON.parse(res.response);
  }

  async createChat(data: { title: string }) {
    const res = await chatAPIInstance.post(`${this.baseUrl}`, {
      data,
      headers: {
        'content-type': 'application/json',
      },
    });
    return res;
  }
}
