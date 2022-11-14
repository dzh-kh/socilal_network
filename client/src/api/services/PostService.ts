import no_avatar from "@assets/images/no_avatar.jpeg";
import { API_URL } from "@consts/paths";
import { IPostRequest, IPostResponse } from "@models/IPost";

import $api from "../http";

export default class PostService {
  static async getPosts(
    title: string,
    tags: string[],
    sortBy: string[],
    userId: number,
    offset: number,
    limit: number
  ): Promise<{ result: IPostResponse[]; totalCount: number }> {
    const titleQuery = title ? `title=${title}` : "";
    const tagsQuery = tags ? `tags=${tags}` : `tags=${[]}`;
    const sortByQuery = sortBy ? `sortBy=${sortBy}` : "";
    const sortByUser = userId ? `userId=${userId}` : "";
    const { data } = await $api.get<{ rows: IPostResponse[]; count: any }>(
      `/post?${titleQuery}&${tagsQuery}&${sortByQuery}&${sortByUser}&offset=${offset}&limit=${limit}`
    );
    let posts: any = {};
    posts.totalCount = data.count.length;
    posts.result = data.rows.map((post) => {
      post.author.avatar = post.author.avatar
        ? `${API_URL}/${post.author.avatar}`
        : no_avatar;
      return {
        ...post,
        selectedFile: `${API_URL}/${post.selectedFile}`,
      };
    });

    return posts;
  }
  static async createPost(newPost: FormData): Promise<IPostResponse> {
    const { data } = await $api.post("/post", newPost);
    data.author.avatar = data.author.avatar
      ? `${API_URL}/${data.author.avatar}`
      : no_avatar;
    return {
      ...data,
      selectedFile: data.selectedFile
        ? `${API_URL}/${data.selectedFile}`
        : null,
    };
  }

  static async likePost(postId: number): Promise<IPostResponse> {
    const { data } = await $api.post("/post/like/" + postId);
    return data;
  }
  static async deletePost(id: number): Promise<void> {
    await $api.delete(`post/${id}`);
  }
  static async editPost(
    id: number,
    editedPost: IPostRequest
  ): Promise<IPostResponse> {
    const { data } = await $api.put(`post/${id}`, editedPost);
    return data;
  }
  static async getTags(tag: string): Promise<string[]> {
    const { data } = await $api.get(`post/tag?query=${tag}`);
    return data;
  }
}
