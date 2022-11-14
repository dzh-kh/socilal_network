import React, { useState, FC, useCallback } from "react";

import { useSearchParams } from "react-router-dom";

import styles from "./contacts.module.scss";
import { IContactProps, IContactsProps } from "./types";

const Contacts: FC<IContactsProps> = ({
  setCurrentChat,
  currentChat,
  contacts,
  updateChatCheckedTime,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = useCallback(
    (id: number) => {
      setCurrentChat(id);
      setSearchParams({ chat: String(id) });
      updateChatCheckedTime(id);
    },
    [contacts]
  );

  const contactsList =
    contacts &&
    contacts.map((contact) => {
      return (
        <Contact
          key={contact.user.id}
          contact={contact}
          currentChat={currentChat}
          handleClick={() => handleClick(contact.user.id)}
        />
      );
    });
  return (
    <div className={styles.wrapper}>
      <span>{contactsList.length ? contactsList : "No contacts"}</span>
    </div>
  );
};

export default Contacts;

const Contact: FC<IContactProps> = ({ contact, handleClick, currentChat }) => {
  const { user, unreadMessagesCount } = contact;
  let { firstName, lastName, avatar, id } = user;
  const [unreadMsgCount, setUnreadMsgCount] = useState(unreadMessagesCount);

  return (
    <div
      className={
        currentChat !== id ? styles.contact_item : styles.current_contact_item
      }
      onClick={() => {
        handleClick();
        setUnreadMsgCount(0);
      }}
    >
      <img src={avatar} width={50} height={50} alt="" />
      <div className={styles.chat_info}>
        <h3>{firstName + " " + lastName}</h3>
        {unreadMsgCount >= 1 && <span>{unreadMsgCount}</span>}
      </div>
    </div>
  );
};
