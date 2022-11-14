export default interface IUser {
  email: string;
  id: number;
  profile: {
    id: number;
    avatar: string;
    background: string;
    lastName: string;
    firstName: string;
    gender: string | null;
    bio: string | null;
  };
  // likes?: any;
}
