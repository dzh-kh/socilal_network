import { IPostResponse } from "@models/IPost";

export interface IFullPostProps {
  post: IPostResponse;
  commentShowsPost: number;
  setCommentShowsPost: React.Dispatch<React.SetStateAction<number | null>>;
}
