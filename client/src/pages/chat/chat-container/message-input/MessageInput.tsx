import React, { useState, useRef, FC } from "react";

import SendIcon from "@mui/icons-material/Send";

import styles from "./message-input.module.scss";

const MessageInput: FC<{ sendMessage: Function }> = ({ sendMessage }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    sendMessage(text);
    setText("");
    inputRef?.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
        type="text"
        value={text}
      />
      <SendIcon onClick={handleClick} />
    </div>
  );
};

export default MessageInput;
