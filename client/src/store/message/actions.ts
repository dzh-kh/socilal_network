import { Dispatch } from "react";

import { MessageService } from "@services";

import { MessageActionTypes } from "./types";

export const getNotifications = () => async (dispatch: Dispatch<any>) => {
  let data = await MessageService.getChatRooms();
  const notifications =
    data.filter((i) => i.unreadMessagesCount > 0).length > 0;
  dispatch({
    type: MessageActionTypes.GET_NOTIFICATIONS,
    payload: notifications,
  });
};
