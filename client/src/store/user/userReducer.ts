import { UserState, UserActionTypes, UserAction } from "./types";

const initialState: UserState = {
  user: null,
  isAuth: false,
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_REGISTRATION:
      return { ...state, user: action.payload, isAuth: true };

    case UserActionTypes.FETCH_LOGIN:
      return { ...state, user: action.payload, isAuth: true };

    case UserActionTypes.LOGOUT: {
      return { ...state, user: null, isAuth: false };
    }

    case UserActionTypes.CHECK_AUTH:
      return { ...state, user: action.payload, isAuth: true };

    case UserActionTypes.GET_OWNER_PROFILE:
      if (state.user) state.user.profile = action.payload;
      return { ...state, user: state.user };
    default:
      return state;
  }
};

export default userReducer;
