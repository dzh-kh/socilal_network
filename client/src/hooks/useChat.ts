import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

import MessageService from "../api/services/MessageService";
import { IContact } from "../models/IContact";
import { IMessage } from "../models/IMessage";

import useActions from "./useActions";

export default function useChat(to: number, from?: number) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const { getNotifications } = useActions();
  const [addresseeIsInRoom, setAddresseeIsInRoom] = useState(false);
  const { current: socket } = useRef(
    io("http://localhost:5000", {
      query: {
        from,
        to,
      },
    })
  );

  const getMessages = async (to: number) => {
    const messages = await MessageService.getChatMessages(to);
    socket.emit("message:get", messages);
  };

  const sendMessage = (text: string): void => {
    MessageService.addMessage(text, to, addresseeIsInRoom).then((res) => {
      setMessages([...messages, res]);
      socket.emit("message:add", [...messages, res]);
    });
  };
  const updateChatCheckedTime = (to: number) => {
    MessageService.updateChatCheckedTime(to, Date.now());
    getNotifications();
  };

  useEffect(() => {
    if (to) {
      socket.emit("user:add");
      getMessages(to);
      socket.on("message_list:update", (messages) => {
        setMessages(messages);
      });
      socket.on("adressee:in_room", (res) => {
        setAddresseeIsInRoom(res);
      });
    }
  }, [to]);

  return {
    messages,
    sendMessage,
    contacts,
    setContacts,
    updateChatCheckedTime,
  };
}
