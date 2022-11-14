import React, { FC, useEffect } from "react";

import logo from "@assets/images/logo.jpeg";
import {
  AUTH_PAGE_PATH,
  MAIN_PAGE_PATH,
  PROFILE_PAGE_PATH,
  CHAT_PAGE_PATH,
} from "@consts/paths";
import { useActions, useRequest, useTypedSelector } from "@hooks";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@ui";
import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";
import SearchBar from "./search-bar/SearchBar";

const Header: FC = () => {
  const { getNotifications } = useActions();

  const { isAuth, user } = useTypedSelector((state) => state.user);
  const { notifications } = useTypedSelector((state) => state.message);
  const { isLoading, fetch } = useRequest((id: number) => getOwnerProfile(id));
  const { getOwnerProfile } = useActions();

  useEffect(() => {
    if (isAuth) getNotifications();
  }, [isAuth]);

  useEffect(() => {
    if (user) {
      fetch(user.id);
    }
  }, [isAuth]);
  const navigate = useNavigate();
  const { logout } = useActions();
  const handleClick = () => {
    !isAuth ? navigate(AUTH_PAGE_PATH) : logout();
  };
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div onClick={() => navigate(MAIN_PAGE_PATH)} className={styles.logo}>
          <img src={logo} alt="logo" width="50" height="60" />
        </div>
        <SearchBar />
        <div className={styles.right}>
          {isAuth && !isLoading && user?.profile && (
            <>
              <div className={styles.user_msg}>
                <EmailIcon onClick={() => navigate(CHAT_PAGE_PATH)} />
                {notifications && <span className={styles.msg_notification} />}
              </div>
              <div
                className={styles.user_info}
                onClick={() => navigate(`${PROFILE_PAGE_PATH}/${user?.id}`)}
              >
                <span>
                  {user?.profile?.firstName + " " + user?.profile?.lastName}
                </span>
                <div className={styles.avatar}>
                  <img
                    src={`${user?.profile?.avatar}`}
                    alt="avatar"
                    width="30"
                    height="30"
                  />
                </div>
              </div>
            </>
          )}
          <Button onClick={handleClick}>{isAuth ? "Logout" : "Login"}</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
