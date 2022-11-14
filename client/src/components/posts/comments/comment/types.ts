import { ICommentResponse } from "@models/IComment";

export interface ICommentProps {
  comment: ICommentResponse;
  activeComment: { id: number; type: string } | null;
  setActiveComment: any;
  replies: ICommentResponse[] | [];
  addComment: any;
  deleteComment: any;
  editComment: any;
}
