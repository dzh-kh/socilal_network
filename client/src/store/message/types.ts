export interface MessageStatev {
  notifications: boolean;
}

export enum MessageActionTypes {
  GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
  SET_NOTIFICATIONS = "SET_NOTIFICATIONS",
}

interface getNotifications {
  payload: boolean;
  type: MessageActionTypes.GET_NOTIFICATIONS;
}

interface setNotifications {
  payload: boolean;
  type: MessageActionTypes.SET_NOTIFICATIONS;
}

export type MessageAction = setNotifications | getNotifications;
