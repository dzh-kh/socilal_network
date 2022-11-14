interface ITag {
  name: string;
  id: number;
}

export interface IPostResponse {
  id: number;
  title: string;
  message: string;
  author: IAuhtor;
  tags: ITag[];
  selectedFile: string;
  likedBy: {}[];
  createdAt: Date;
  commentCount: number;
}

export interface IPostRequest {
  title: string;
  message: string;
  author: string;
  tags: string;
  selectedFile: string;
  userId: number;
}

export interface IAuhtor {
  id?: number;
  avatar: string;
  firstName: string;
  lastName: string;
}
