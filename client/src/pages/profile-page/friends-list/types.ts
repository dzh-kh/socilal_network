export interface IFriendProps {
  friend: IFriend;
  onDeleteFriend: any;
  onAddFriend?: any;
  isOwner: boolean;
}

export interface IFriend {
  id: number;
  avatar: string;
  isOnline: boolean;
  lastName: string;
  firstName: string;
  accepted: boolean;
}
