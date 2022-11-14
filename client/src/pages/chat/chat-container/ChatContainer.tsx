import React, { FC } from "react";

import { IMessage } from "@models/IMessage";

import styles from "./chat-container.module.scss";
import MessageInput from "./message-input/MessageInput";
import MessageList from "./message-list/MessageList";


interface IChatContainerProps {
  currentChat: number;
  messages: IMessage[];
  sendMessage: Function;
}
const ChatContainer: FC<IChatContainerProps> = ({
  currentChat,
  messages,
  sendMessage,
}) => {
  return (
    <div className={styles.chat_container}>
      {currentChat ? (
        <>
          <MessageList messages={messages} />
          <MessageInput sendMessage={sendMessage} />
        </>
      ) : (
        <span className={styles.no_chat__msg}>choose some room</span>
      )}
    </div>
  );
};

export default ChatContainer;
