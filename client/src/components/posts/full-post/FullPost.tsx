import React, { FC, lazy, Suspense } from "react";

import { MAIN_PAGE_PATH } from "@consts/paths";
import { useActions } from "@hooks";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";

import ContentTop from "../content-top/ContentTop";
import ToggleLike from "../toggle-like/ToggleLike";

import styles from "./full-post.module.scss";
import { IFullPostProps } from "./types";
const Comments = lazy(() => import("../comments/Comments"));

const FullPost: FC<any> = ({
  post,
  commentShowsPost,
  setCommentShowsPost,
}: IFullPostProps) => {
  const {
    title,
    message,
    author,
    tags = [],
    selectedFile,
    likedBy = [],
    createdAt,
    id,
    commentCount = 0,
  } = post;

  const { addPostLike, deletePost } = useActions();
  const navigate = useNavigate();

  return (
    <div className={styles.post__wrapper}>
      <ContentTop
        type="post"
        author={author}
        createdAt={createdAt}
        onDelete={() => deletePost(id)}
      />
      <div className={styles.postContent}>
        <span>
          {tags.map((tag) => (
            <li
              onClick={() => navigate(`${MAIN_PAGE_PATH}?tags=${tag.name}`)}
              key={tag.id}
            >
              #{tag.name}
            </li>
          ))}
        </span>
        <h1>{title}</h1>
        <p className={styles.message}>{message}</p>
        <div>
          <div className={styles.img_wrapper}>
            <img
              onClick={() => window.open(selectedFile)}
              className={styles.post__image_preview}
              src={selectedFile}
              alt=""
            />
          </div>
        </div>
        <div className={styles.post__actions}>
          <div>
            {!(commentShowsPost === id) ? (
              <>
                <ChatBubbleOutlineIcon
                  onClick={() => setCommentShowsPost(id)}
                  fontSize="small"
                />
                <span>{commentCount}</span>
              </>
            ) : (
              <p onClick={() => setCommentShowsPost(null)}>close comments</p>
            )}
          </div>
          <ToggleLike
            contentType="post"
            id={id}
            addLike={() => addPostLike(id)}
            likeCount={likedBy.length}
          />
        </div>

        {commentShowsPost === id && (
          <div className={styles.post__comments}>
            <Suspense>
              <Comments postId={id} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPost;
