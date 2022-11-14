import { MessageAction, MessageActionTypes } from "./types";

const initialState = {
  notifications: false,
};

const messageReducer = (state = initialState, action: MessageAction) => {
  switch (action.type) {
    case MessageActionTypes.GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

export default messageReducer;
