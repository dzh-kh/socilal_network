import { IAuhtor } from "./IPost";

export interface ICommentResponse {
  id: number;
  postId: number;
  profileId: number;
  parentId: number | null;
  addressee: { id: number; author: IAuhtor } | null;
  likedBy: {}[];
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  attachment?: string;
  createdAt: Date;
  text?: string;
}

export interface ICommentRequest {
  parentId?: number | null;
  adreseeId?: number | null;
  attachment?: File;
  text?: string;
}
