import AuthResponse from "@models/AuthResponse";
import { AxiosResponse } from "axios";

import $api from "../http";

export default class AuthService {
  static async registrate(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const res = await $api.post<AuthResponse>("user/registration", {
      firstName,
      lastName,
      email,
      password,
    });
    return res;
  }
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const res = await $api.post<AuthResponse>("/user/login", {
      email,
      password,
    });
    return res;
  }
  static async logout() {
    const response = await $api.post("/user/logout");
    return response;
  }
}
