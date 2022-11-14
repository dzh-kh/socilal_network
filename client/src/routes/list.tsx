import {
  AUTH_PAGE_PATH,
  MAIN_PAGE_PATH,
  PAGE_NOT_FOUND,
  PROFILE_PAGE_PATH,
  CHAT_PAGE_PATH,
} from "@consts/paths";

import Auth from "../pages/auth-form/Auth";
import Chat from "../pages/chat/Chat";
import Main from "../pages/main/Main";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import ProfilePage from "../pages/profile-page/ProfilePage";

export const routes = [
  {
    path: AUTH_PAGE_PATH,
    element: Auth,
    auth: false,
  },
  {
    path: MAIN_PAGE_PATH,
    element: Main,
    auth: false,
  },
  {
    path: CHAT_PAGE_PATH,
    element: Chat,
    auth: true,
  },
  {
    path: PAGE_NOT_FOUND,
    element: PageNotFound,
    auth: false,
  },
  {
    path: PROFILE_PAGE_PATH + "/:id/*",
    element: ProfilePage,
    auth: false,
  },
];
