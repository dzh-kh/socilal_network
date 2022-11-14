import React, { FC, useEffect, useState, useRef } from "react";

import { useObserver, useActions, useTypedSelector, useRequest } from "@hooks";
import { LoadingSpinner } from "@ui";
import { useSearchParams, useParams, useLocation } from "react-router-dom";

import FullPost from "./full-post/FullPost";
import PostPreview from "./post-preview/PostPreview";
import styles from "./posts.module.scss";

const Posts: FC<{ isFullPost: boolean }> = ({ isFullPost = false }) => {
  const { totalCount, posts } = useTypedSelector((state) => state.post);
  const { fetchPosts, resetStore } = useActions();

  const { search } = useLocation();
  const id = Number(useParams().id);
  const lastElement = useRef<HTMLDivElement | null>(null);

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(id);

  const [offset, setOffset] = useState(0);
  const [commentShowsPost, setCommentShowsPost] = useState(null);
  const { isLoading, fetch } = useRequest(
    (
      title: string,
      tags: string[],
      sortBy: string[],
      id: number,
      offset: number
    ) => fetchPosts(title, tags, sortBy, id, offset, 10)
  );

  useObserver(
    lastElement,
    posts.length < totalCount && offset <= totalCount,
    isLoading,
    () => {
      setOffset((prev) => prev + 10);
      setLoading(true);
    }
  );

  useEffect(() => {
    setUserId(id);
  }, [id]);

  useEffect(() => {
    const title = searchParams.get("title");
    let tags: string | string[] | null = searchParams.get("tags");
    tags = tags ? tags.split(",") : tags;
    const sortBy = searchParams.get("sortBy");
    resetStore();
    setOffset(0);
    if (!loading && !userId) {
      fetch(title, tags, sortBy, id, 0);
    }
    if (userId) {
      setLoading(true);
    }
  }, [search, userId]);

  useEffect(() => {
    if (loading) {
      const title = searchParams.get("title");
      let tags: string | string[] | null = searchParams.get("tags");
      tags = tags ? tags.split(",") : tags;
      const sortBy = searchParams.get("sortBy");
      fetch(title, tags, sortBy, id, offset);
      setLoading(false);
    }
  }, [loading]);

  const postsList =
    posts.length > 0
      ? posts.map((post) => {
          return isFullPost ? (
            <div key={post.id}>
              <FullPost
                commentShowsPost={commentShowsPost}
                setCommentShowsPost={setCommentShowsPost}
                post={post}
              />
            </div>
          ) : (
            <div key={post.id} className={styles.post__preview}>
              <PostPreview post={post} />
            </div>
          );
        })
      : "No Post";

  return (
    <>
      {postsList}
      {isLoading && <LoadingSpinner />}
      <div ref={lastElement} />
    </>
  );
};

export default Posts;
