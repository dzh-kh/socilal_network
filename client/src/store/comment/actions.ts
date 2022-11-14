import { Dispatch } from "react";

import { CommentService } from "@services";

import { CommentAction, CommentActionTypes } from "./types";

export const getComments =
  (postId: number) => async (dispatch: Dispatch<CommentAction>) => {
    const comments = await CommentService.getComments(postId);
    dispatch({
      type: CommentActionTypes.FETCH_COMMENT,
      payload: comments,
    });
  };

export const addComment =
  (postId: number, comment: FormData) =>
  async (dispatch: Dispatch<CommentAction>) => {
    const newComment = await CommentService.addComment(postId, comment);
    dispatch({
      type: CommentActionTypes.ADD_COMMENT,
      payload: newComment,
    });
  };

export const likeComment =
  (postId: number, id: number) => async (dispatch: Dispatch<CommentAction>) => {
    try {
      const likedBy = await CommentService.likeComment(postId, id);
      dispatch({
        type: CommentActionTypes.LIKE_COMMENT,
        payload: { id, likedBy },
      });
    } catch (e) {
      console.log(e);
    }
  };

export const editComment =
  (postId: number, commentId: number, comment: any) =>
  async (dispatch: Dispatch<CommentAction>) => {
    try {
      const newComment = await CommentService.editComment(
        postId,
        commentId,
        comment
      );
      dispatch({
        type: CommentActionTypes.EDIT_COMMENT,
        payload: newComment,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const deleteComment =
  (postId: number, commentId: number) =>
  async (dispatch: Dispatch<CommentAction>) => {
    try {
      dispatch({
        type: CommentActionTypes.DELETE_COMMENT,
        payload: commentId,
      });
      await CommentService.deleteComment(postId, commentId);
    } catch (e) {
      console.log(e);
    }
  };
