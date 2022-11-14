import React, { FC, memo } from "react";

import { useActions } from "@hooks";
import { IPostResponse } from "@models/IPost";
import { useSearchParams } from "react-router-dom";

import ContentTop from "../content-top/ContentTop";

import styles from "./post-preview.module.scss";

const PostPreview: FC<{ post: IPostResponse }> = memo(({ post }) => {
  const { title, message, author, tags, selectedFile, createdAt, id } = post;
  const { deletePost } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className={styles.postWrapper}>
      <div
        className={styles.imgWrapper}
        style={{ backgroundImage: `url(${selectedFile})` }}
      >
        <ContentTop
          type="post"
          author={author}
          createdAt={createdAt}
          onDelete={() => deletePost(id)}
        />
      </div>
      <div className={styles.postContent}>
        <span>
          {tags.map((tag) => (
            <li
              onClick={() => setSearchParams({ tags: tag.name })}
              key={tag.id}
            >
              #{tag.name}
            </li>
          ))}
        </span>
        <h1>{title}</h1>
        {message}
      </div>
    </div>
  );
});

export default PostPreview;
