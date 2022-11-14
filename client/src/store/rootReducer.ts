import { combineReducers } from "redux";

import CommentReducer from "./comment/commentReducer";
import messageReducer from "./message/messageReducer";
import postReducer from "./post/postReducer";
import userReducer from "./user/userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  comment: CommentReducer,
  message: messageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
