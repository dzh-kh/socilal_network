export default interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  userId?: number;
  avatar: any;
  background?: any;
  isOnline?: boolean;
  gender?: "female" | "male";
  bio?: string;
}
