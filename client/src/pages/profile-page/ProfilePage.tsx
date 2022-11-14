import React, { FC, Suspense, lazy, useEffect, useState } from "react";

import { CHAT_PAGE_PATH, PROFILE_PAGE_PATH } from "@consts/paths";
import { useTypedSelector, useRequest } from "@hooks";
import IProfile from "@models/IProfile";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { UserService } from "@services";
import { LoadingSpinner } from "@ui";
import { Link, Route, Routes, useParams } from "react-router-dom";

import Posts from "../../components/posts/Posts";

import styles from "./profile-page.module.scss";

const FriendsList = lazy(() => import("./friends-list/FriendsList"));
const ProfileSettings = lazy(
  () => import("./profile-settings/ProfileSettings")
);
const Bio = lazy(() => import("./bio/Bio"));

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<IProfile>();
  const [isOwner, setIsOwner] = useState(true);
  const id = Number(useParams().id);
  const userId = useTypedSelector((state) => state.user.user?.id);
  const { isLoading, fetch: getProfile } = useRequest(() =>
    UserService.getProfile(id).then((res) => setProfile(res))
  );
  useEffect(() => {
    if (id) setIsOwner(userId === id);
    getProfile();
  }, [id, userId]);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <img
          className={styles.background}
          src={profile?.background}
          alt="background"
        />
        <div className={styles.user_info}>
          <img src={profile?.avatar} alt="" width="150" height="150" />
          <span>{profile?.firstName + " " + profile?.lastName}</span>
          {!isOwner && (
            <div className={styles.actions_panel}>
              <FriendshipPanel userId={userId} id={id} />
              <Link to={CHAT_PAGE_PATH + `?chat=${id}`}>
                <EmailIcon />
              </Link>
            </div>
          )}
        </div>
        <div className={styles.tab_panel}>
          <TabPanel isOwner={isOwner} userId={id} id={id} />
        </div>
      </div>
      <div className={styles.tab_container}>
        <Routes>
          <Route
            path="friends"
            element={
              <Suspense>
                <FriendsList isOwner={isOwner} />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense>
                <ProfileSettings />{" "}
              </Suspense>
            }
          />
          <Route path="" element={<Posts isFullPost={true} />} />
          <Route
            path="bio"
            element={
              <Suspense>
                <Bio bio={profile?.bio} />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;

const TAB_PANEL_ITEMS = [
  {
    title: "friends",
    path: "friends",
    isOwnerOption: false,
  },
  {
    title: "settings",
    path: "settings",
    isOwnerOption: true,
  },
  {
    title: "bio",
    path: "bio",
    isOwnerOption: false,
  },
  {
    title: "posts",
    path: "",
    isOwnerOption: false,
  },
];

const TabPanel: FC<{ userId: number; id: number; isOwner: boolean }> = ({
  userId,
  id,
  isOwner,
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const basePath = `${PROFILE_PAGE_PATH}/${id}`;
  const tabs = TAB_PANEL_ITEMS.filter((i) =>
    !i.isOwnerOption ? i : isOwner && i
  ).map((item) => {
    return (
      <Link
        onClick={() => setActiveTab(item.title)}
        className={
          activeTab === item.title ? styles.active_tab : styles.unactive_tab
        }
        to={`${basePath}/${item.path}`}
        key={item.title}
      >
        {item.title}
      </Link>
    );
  });
  return <>{tabs}</>;
};

const FriendshipPanel: FC<{ userId: number; id: number }> = ({
  userId,
  id,
}) => {
  const [friendshipStatus, setFriendshipStatus] = useState<
    "accepted" | "pending"
  >();
  const handleDeleteFriend = async (id: number) =>
    await UserService.removeFriend(id);
  const handleAddFriend = async (id: number) => await UserService.addFriend(id);
  useEffect(() => {
    UserService.getFriends(id).then((res) => {
      res.forEach((i) => {
        const friendship = i.friendships[0];
        if (friendship?.requesterId === userId) {
          friendship.accepted
            ? setFriendshipStatus("accepted")
            : setFriendshipStatus("pending");
        }
        if (friendship.adresseeId === userId && friendship.accepted === true) {
          setFriendshipStatus("accepted");
        }
      });
    });
  }, []);
  return (
    <div className={styles.friendship_panel__container}>
      {" "}
      {friendshipStatus === "accepted" && (
        <PersonRemoveIcon onClick={() => handleDeleteFriend(id)} />
      )}
      {!friendshipStatus && (
        <PersonAddIcon onClick={() => handleAddFriend(id)} />
      )}
      {friendshipStatus === "pending" && <PersonAddIcon />}
    </div>
  );
};
