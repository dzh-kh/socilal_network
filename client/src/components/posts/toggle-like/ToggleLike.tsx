import React, { FC, useState, useEffect } from "react";

import { useTypedSelector } from "@hooks";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Icon from "@mui/material/Icon";
import { UserService } from "@services";

import styles from "./toggle-like.module.scss";
import { IToggleLikeProps } from "./types";

const ToggleLike: FC<IToggleLikeProps> = ({
  id,
  contentType,
  addLike,
  likeCount,
}: IToggleLikeProps) => {
  const [likes, setLikes] = useState(likeCount);
  const userId = useTypedSelector((state) => state.user.user?.id);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    userId &&
      UserService.getUserLikes(id, contentType)
        .then((res) => (res.length ? setIsLiked(true) : setIsLiked(false)))
        .catch((e) => console.log(e));
  }, [userId]);

  useEffect(() => {}, [isLiked]);
  return (
    <div className={styles.like}>
      <Icon
        component="svg"
        children={
          isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon fontSize="small" />
        }
        fontSize="small"
        onClick={() => {
          addLike();
          setIsLiked(!isLiked);
        }}
      />
      {likeCount}
    </div>
  );
};

export default ToggleLike;
