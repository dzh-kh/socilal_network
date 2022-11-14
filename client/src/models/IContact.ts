import IProfile from "./IProfile";

export interface IContact {
  unreadMessagesCount: number;
  user: IProfile;
}
