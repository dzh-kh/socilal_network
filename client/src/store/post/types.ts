import { IPostResponse } from "@models/IPost";

export interface PostState {
  totalCount: number;
  posts: IPostResponse[] | [];
}

export enum PostActionTypes {
  ADD_POST = "ADD_POST",
  EDIT_POST = "EDIT_POST",
  DELETE_POST = "DELETE_POST",
  ADD_POST_LIKE = "ADD_POST_LIKE",
  FETCH_POSTS = "FETCH_POSTS",
  RESET_STORE = "RESET_STORE",
}

interface deletePost {
  type: PostActionTypes.DELETE_POST;
  payload: number;
}
interface addPost {
  type: PostActionTypes.ADD_POST;
  payload: IPostResponse;
}

interface editPost {
  type: PostActionTypes.EDIT_POST;
  payload: IPostResponse;
}
interface addPostLike {
  type: PostActionTypes.ADD_POST_LIKE;
  payload: { postId: number; likedBy: {}[] };
}

interface fetchPosts {
  type: PostActionTypes.FETCH_POSTS;
  payload: { result: IPostResponse[]; totalCount: number };
}

interface resetStore {
  type: PostActionTypes.RESET_STORE;
}

export type PostAction =
  | addPost
  | addPostLike
  | fetchPosts
  | deletePost
  | editPost
  | resetStore;
