import no_avatar from "@assets/images/no_avatar.jpeg";
import { API_URL } from "@consts/paths";
import { ICommentResponse } from "@models/IComment";

import $api from "../http";

export default class CommentService {
  static async addComment(
    postId: number,
    comment: FormData
  ): Promise<ICommentResponse> {
    const { data } = await $api.post(`post/${postId}/comment`, comment);
    data.author.avatar = data.author.avatar
      ? `${API_URL}/${data.author.avatar}`
      : no_avatar;
    data.attachment = data.attachment && `${API_URL}/${data.attachment}`;
    return {
      ...data,
    };
  }
  static async likeComment(
    postId: number,
    commentId: number
  ): Promise<string[]> {
    const { data } = await $api.post(
      `post/like/${postId}/comment/${commentId}`
    );

    return data;
  }
  static async getComments(id: number): Promise<ICommentResponse[]> {
    const { data } = await $api.get(`post/${id}/comment`);
    return data.map((comment: ICommentResponse) => {
      comment.author.avatar = comment.author.avatar
        ? `${API_URL}/${comment.author.avatar}`
        : no_avatar;
      comment.attachment =
        comment.attachment && `${API_URL}/${comment.attachment}`;
      return comment;
    });
  }

  static async deleteComment(
    postId: number,
    commentId: number
  ): Promise<string[]> {
    const { data } = await $api.delete(`post/${postId}/comment/${commentId}`);
    return data;
  }

  static async editComment(
    postId: number,
    commentId: number,
    comment: any
  ): Promise<ICommentResponse> {
    const { data } = await $api.patch(
      `post/${postId}/comment/${commentId}`,
      comment
    );
    data.attachment = data.attachment && `${API_URL}/${data.attachment}`;
    return { ...data };
  }
}
