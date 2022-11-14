import no_avatar from "@assets/images/no_avatar.jpeg";
import no_background from "@assets/images/no_background.jpeg";
import { API_URL_BASE, PROFILE_PAGE_PATH, API_URL } from "@consts/paths";

import $api from "../http";

const basePath = `${API_URL_BASE}${PROFILE_PAGE_PATH}/`;

export default class UserService {
  static async getUserLikes(id: number, type: string) {
    if (type === "post") {
      const { data } = await $api.get(
        `${API_URL_BASE}/user/likes?postId=${id}`
      );
      return data;
    }
    if (type === "comment") {
      const { data } = await $api.get(
        `${API_URL_BASE}/user/likes?commentId=${id}`
      );
      return data;
    }
  }

  static async getProfile(id: number) {
    const { data } = await $api.get(`${basePath}/${id}`);
    return {
      ...data,
      avatar: data.avatar ? `${API_URL}/${data.avatar}` : no_avatar,
      background: data.background
        ? `${API_URL}/${data.background}`
        : no_background,
    };
  }
  static async getProfiles(name: string) {
    const query = name ? `query=${name}` : "";
    const { data } = await $api.get(`${basePath}/?${query}`);
    return data;
  }
  static async editProfile(id: number, profile: any) {
    const { data } = await $api.patch(`${basePath}/${id}`, profile);
    return data;
  }

  static async addFriend(id: number) {
    const { data } = await $api.post(`${basePath}/${id}/friend`);
    return data;
  }

  static async removeFriend(id: number) {
    const { data } = await $api.delete(`${basePath}/${id}/friend`);
    return data;
  }

  static async accessFriendship(id: number) {
    const { data } = await $api.patch(`${basePath}/${id}/friend`);
    return data;
  }

  static async getFriends(id: number) {
    const { data } = await $api.get(`${basePath}/${id}/friend`);
    const friends = data.map((friend: any) => {
      friend.accepted = friend.friendship.accepted;
      delete friend.friendship;
      return {
        ...friend,
        avatar: data.avatar ? `${API_URL}/${data.avatar}` : no_avatar,
      };
    });
    return friends;
  }
}
