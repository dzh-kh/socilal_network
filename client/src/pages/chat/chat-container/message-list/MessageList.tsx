import React, { useEffect, useRef, FC } from "react";

import { IMessage } from "@models/IMessage";

import MessageItem from "./message-item/MessageItem";
import styles from "./message-list.module.scss";

const MessageList: FC<{ messages: IMessage[] }> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesList = messages.map((message: IMessage) => {
    return (
      <MessageItem scrollRef={scrollRef} message={message} key={message.id} />
    );
  });

  return (
    <div className={styles.wrapper}>
      {messagesList.length ? (
        messagesList
      ) : (
        <span>No messages yet. Be first!</span>
      )}
    </div>
  );
};

export default MessageList;
