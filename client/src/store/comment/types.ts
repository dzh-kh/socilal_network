import { ICommentResponse } from "@models/IComment";

export interface CommentState {
  comments: ICommentResponse[] | [];
}

export enum CommentActionTypes {
  FETCH_COMMENT = "FETCH_COMMENTS",
  ADD_COMMENT = "ADD_COMMENTS",
  LIKE_COMMENT = "LIKE_COMMENT",
  EDIT_COMMENT = "EDIT_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
}

interface fetchComment {
  type: CommentActionTypes.FETCH_COMMENT;
  payload: any;
}

interface addComment {
  type: CommentActionTypes.ADD_COMMENT;
  payload: ICommentResponse;
}

interface likeComment {
  type: CommentActionTypes.LIKE_COMMENT;
  payload: { likedBy: {}[]; id: number };
}

interface editComment {
  type: CommentActionTypes.EDIT_COMMENT;
  payload: ICommentResponse;
}

interface deleteComment {
  type: CommentActionTypes.DELETE_COMMENT;
  payload: number;
}

export type CommentAction =
  | deleteComment
  | editComment
  | likeComment
  | addComment
  | fetchComment;
