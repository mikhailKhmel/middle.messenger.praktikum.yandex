import { HTTPTransport } from '../utils/fetch.ts';

const chatAPIInstance = new HTTPTransport();

export class ChatsApi {
  baseUrl = 'ya-praktikum.tech/api/v2/chats';

  async chats() {
    const res = await chatAPIInstance.get(`${this.baseUrl}`);
    return res;
  }
}
