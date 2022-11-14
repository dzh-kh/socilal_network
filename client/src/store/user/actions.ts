import { Dispatch } from "react";

import { API_URL_BASE } from "@consts/paths";
import IProfile from "@models/IProfile";
import { AuthService, UserService } from "@services";
import axios from "axios";

import { UserAction } from "./types";
import { UserActionTypes } from "./types";

export const registrate =
  (firstName: string, lastName: string, email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    const { data } = await AuthService.registrate(
      firstName,
      lastName,
      email,
      password
    );
    localStorage.setItem("token", data.accessToken);
    return dispatch({
      type: UserActionTypes.FETCH_REGISTRATION,
      payload: data.user,
    });
  };

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserAction>) => {
    const { data } = await AuthService.login(email, password);
    localStorage.setItem("token", data.accessToken);
    return dispatch({
      type: UserActionTypes.FETCH_LOGIN,
      payload: data.user,
    });
  };

export const checkAuth = () => async (dispatch: Dispatch<UserAction>) => {
  const res = await axios.get(`${API_URL_BASE}/user/refresh`, {
    withCredentials: true,
  });
  const userData = res.data;
  localStorage.setItem("token", userData.accessToken);
  dispatch({
    type: UserActionTypes.CHECK_AUTH,
    payload: userData.user,
  });
};

export const logout = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("token");
    dispatch({ type: UserActionTypes.LOGOUT });
  } catch (e) {
    console.log(e);
  }
};

export const getOwnerProfile =
  (id: number) => async (dispatch: Dispatch<UserAction>) => {
    try {
      const profile = await UserService.getProfile(id);
      dispatch({ type: UserActionTypes.GET_OWNER_PROFILE, payload: profile });
    } catch (e) {
      console.log(e);
    }
  };

export const editProfile =
  (id: number, profile: IProfile) => async (dispatch: Dispatch<UserAction>) => {
    try {
      const profileInfo = await UserService.editProfile(id, profile);
      dispatch({ type: UserActionTypes.EDIT_PROFILE, payload: profileInfo });
    } catch (e) {
      console.log(e);
    }
  };
