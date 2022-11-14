import IUser from "./IUser";
export default interface AuthResponse {
  user: IUser;
  refreshToken: string;
  accessToken: string;
}
