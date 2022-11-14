import no_avatar from "@assets/images/no_avatar.jpeg";
import { API_URL } from "@consts/paths";
import { IContact } from "@models/IContact";
import { IMessage } from "@models/IMessage";

import $api from "../http";

export default class MessageService {
  static async addMessage(
    text: string,
    to: number,
    readStatus: boolean
  ): Promise<any> {
    const { data } = await $api.post(`message/${to}`, { text, readStatus });
    return data;
  }

  static async getChatMessages(to: number): Promise<IMessage[]> {
    const { data } = await $api.get(`message/${to}`);
    return data;
  }

  static async getChatRooms(): Promise<IContact[]> {
    const { data } = await $api.get(`message/`);
    data.forEach((i: IContact) => {
      i.user.avatar = i.user.avatar ? `${API_URL}/${i.user.avatar}` : no_avatar;
    });
    return data;
  }

  static async updateChatCheckedTime(to: number, date: number): Promise<any> {
    const { data } = await $api.patch(`message/${to}/chat`, { date });
    return data;
  }
}
