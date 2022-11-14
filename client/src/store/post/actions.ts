import { Dispatch } from "react";

import { IPostRequest } from "@models/IPost";
import { PostService } from "@services";

import { PostAction, PostActionTypes } from "./types";

export const addPost =
  (newPost: FormData) => async (dispatch: Dispatch<PostAction>) => {
    try {
      const post = await PostService.createPost(newPost);
      dispatch({ type: PostActionTypes.ADD_POST, payload: post });
    } catch (e) {
      console.log(e);
    }
  };

export const editPost =
  (id: number, editedPost: IPostRequest) =>
  async (dispatch: Dispatch<PostAction>) => {
    try {
      const post = await PostService.editPost(id, editedPost);
      dispatch({ type: PostActionTypes.EDIT_POST, payload: post });
    } catch (e) {
      console.log(e);
    }
  };

export const addPostLike =
  (postId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
      const likedBy = await PostService.likePost(postId);
      dispatch({
        type: PostActionTypes.ADD_POST_LIKE,
        payload: { postId, likedBy },
      });
    } catch (e) {
      console.log(e);
    }
  };

export const deletePost =
  (postId: number) => async (dispatch: Dispatch<PostAction>) => {
    try {
      await PostService.deletePost(postId);
      dispatch({ type: PostActionTypes.DELETE_POST, payload: postId });
    } catch (e) {
      console.log(e);
    }
  };

export const fetchPosts =
  (
    title: string,
    tags: string[],
    sortBy: string[],
    userId: number,
    offset: number,
    limit: number
  ) =>
  async (dispatch: Dispatch<PostAction>) => {
    const posts = await PostService.getPosts(
      title,
      tags,
      sortBy,
      userId,
      offset,
      limit
    );
    dispatch({ type: PostActionTypes.FETCH_POSTS, payload: posts });
  };

export const resetStore = () => {
  return { type: PostActionTypes.RESET_STORE };
};
