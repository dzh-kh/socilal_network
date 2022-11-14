import React, { useEffect, useState } from "react";

import { useTypedSelector, useChat } from "@hooks";
import { IContact } from "@models/IContact";
import { MessageService, UserService } from "@services";
import { useSearchParams } from "react-router-dom";

import ChatContainer from "./chat-container/ChatContainer";
import styles from "./chat.module.scss";
import Contacts from "./contacts/Contacts";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const chat = searchParams.get("chat");
  const [currentChat, setCurrentChat] = useState<number>(Number(chat));
  const [contacts, setContacts] = useState<IContact[] | []>([]);

  const id = useTypedSelector((state) => state.user.user?.id);
  const { messages, sendMessage, updateChatCheckedTime } = useChat(
    currentChat,
    id
  );

  useEffect(() => {
    if (currentChat) {
      updateChatCheckedTime(currentChat);
      MessageService.getChatRooms().then((ct) => {
        if (!ct.filter((i: IContact) => i.user.id === currentChat).length) {
          UserService.getProfile(currentChat).then((res) =>
            setContacts([...ct, { user: res, unreadMessagesCount: 0 }])
          );
        } else {
          setContacts(ct);
        }
      });
    } else {
      MessageService.getChatRooms().then((res) => setContacts(res));
    }
  }, []);

  return (
    <div className={styles.chat_wrapper}>
      <Contacts
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        contacts={contacts}
        updateChatCheckedTime={updateChatCheckedTime}
      />
      <ChatContainer
        messages={messages}
        sendMessage={sendMessage}
        currentChat={currentChat}
      />
    </div>
  );
};

export default Chat;
