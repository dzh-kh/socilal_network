import IUser from "@models/IUser";

export interface UserState {
  user: IUser | null;
  isAuth: boolean;
}
export enum UserActionTypes {
  FETCH_REGISTRATION = "FETCH REGISTRATION",
  FETCH_LOGIN = "FETCH LOGIN",
  CHECK_AUTH = "CHECK_AUTH",
  LOGOUT = "LOGOUT",
  GET_USER_LIKES = "GET_USER_LIKES",
  GET_OWNER_PROFILE = "GET_OWNER_PROFILE",
  EDIT_PROFILE = "EDIT_PROFILE",
}

interface FetchRegistration {
  type: UserActionTypes.FETCH_REGISTRATION;
  payload: IUser;
}

interface FetchLogin {
  type: UserActionTypes.FETCH_LOGIN;
  payload: IUser;
}

interface checkAuth {
  type: UserActionTypes.CHECK_AUTH;
  payload: IUser;
}

interface logout {
  type: UserActionTypes.LOGOUT;
}

interface getUserLikes {
  type: UserActionTypes.GET_USER_LIKES;
  payload: any;
}

interface getOwnerProfile {
  type: UserActionTypes.GET_OWNER_PROFILE;
  payload: any;
}

interface editProfile {
  type: UserActionTypes.EDIT_PROFILE;
  payload: any;
}

export type UserAction =
  | FetchLogin
  | FetchRegistration
  | checkAuth
  | logout
  | getUserLikes
  | getOwnerProfile
  | editProfile;
