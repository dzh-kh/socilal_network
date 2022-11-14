import React, { FC } from "react";

import { useTypedSelector } from "@hooks";
import { IMessage } from "@models/IMessage";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getPostedDate } from "@utils/functions";

import styles from "./message-item.module.scss";

interface IMessageItemProps {
  message: IMessage;
  scrollRef: any;
}

const MessageItem: FC<IMessageItemProps> = ({ message, scrollRef }) => {
  const id = useTypedSelector((state) => state.user.user?.id);
  const { text, createdAt, from, readStatus } = message;
  const date = getPostedDate(createdAt);
  return (
    <div
      ref={scrollRef}
      className={from.id === id ? styles.own_msg__wrapper : styles.wrapper}
    >
      <div className={styles.message}>
        {text}
        {readStatus ? (
          <DoneAllIcon fontSize="small" />
        ) : (
          <CheckIcon fontSize="small" />
        )}
      </div>

      <span>{date}</span>
    </div>
  );
};

export default MessageItem;
