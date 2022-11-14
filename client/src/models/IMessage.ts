import IProfile from "./IProfile";

export interface IMessage {
  id: number;
  text: string;
  createdAt: Date;
  fromId: number;
  toId: number;
  chatId: number;
  from: IProfile;
  readStatus: boolean;
}
