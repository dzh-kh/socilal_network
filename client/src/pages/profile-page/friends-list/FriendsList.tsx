import React, { FC, useEffect, useState } from "react";

import { PROFILE_PAGE_PATH } from "@consts/paths";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { UserService } from "@services";
import { Link, useParams } from "react-router-dom";

import styles from "./friends-list.module.scss";
import { IFriend, IFriendProps } from "./types";

const FriendsList: FC<{ isOwner: boolean }> = ({ isOwner }) => {
  const id = Number(useParams().id);
  const [friendsList, setFriendsList] = useState<[] | IFriend[]>([]);
  useEffect(() => {
    UserService.getFriends(id).then((res) => setFriendsList(res));
  }, []);
  const handleDeleteFriend = (id: number) => {
    UserService.removeFriend(id);
    setFriendsList(friendsList.filter((f) => f.id !== id));
  };

  const handleAddFriend = (id: number) => {
    UserService.accessFriendship(id);
    setFriendsList(
      friendsList.map((f) => {
        if (f.id === id) {
          f.accepted = true;
          return f;
        }
        return f;
      })
    );
  };
  const acceptedFriends = friendsList
    .filter((e) => e.accepted)
    .map((friend) => (
      <Friend
        isOwner={isOwner}
        key={friend.id}
        friend={friend}
        onDeleteFriend={() => handleDeleteFriend(friend.id)}
      />
    ));
  const requestedFriend = friendsList
    .filter((e) => !e.accepted)
    .map((friend) => (
      <Friend
        isOwner={isOwner}
        key={friend.id}
        friend={friend}
        onAddFriend={() => handleAddFriend(friend.id)}
        onDeleteFriend={() => handleDeleteFriend(friend.id)}
      />
    ));
  return (
    <div className={styles.friends}>
      <div>
        <h4>Friends</h4>{" "}
        {acceptedFriends.length ? acceptedFriends : "No friends"}
      </div>
      {isOwner && (
        <div>
          <h4>Friend requests</h4>{" "}
          {requestedFriend.length ? requestedFriend : "No requests"}
        </div>
      )}
    </div>
  );
};

export default FriendsList;

const Friend: FC<IFriendProps> = ({
  onAddFriend,
  onDeleteFriend,
  friend,
  isOwner,
}) => {
  const { avatar, firstName, lastName, id, isOnline, accepted } = friend;
  return (
    <div>
      <div key={id} className={styles.friend}>
        <Link
          style={{ textDecorationLine: "none" }}
          to={`${PROFILE_PAGE_PATH}/${id}`}
        >
          <div className={styles.info}>
            <img width="50" height="50" src={avatar} alt={avatar} />
            <span>{firstName + " " + lastName}</span>
            <div className={isOnline ? styles.online : styles.offline} />
          </div>
        </Link>
        {isOwner && (
          <div className={styles.actions}>
            {accepted ? (
              <PersonRemoveIcon onClick={onDeleteFriend} />
            ) : (
              <>
                <PersonAddIcon onClick={onAddFriend} />
                <CloseIcon onClick={onDeleteFriend} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
