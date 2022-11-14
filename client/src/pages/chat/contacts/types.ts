import { IContact } from "@models/IContact";

export interface IContactsProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<number>>;
  currentChat: number;
  contacts: IContact[];
  updateChatCheckedTime: Function;
}

export interface IContactProps {
  contact: IContact;
  handleClick: Function;
  currentChat: number;
}
