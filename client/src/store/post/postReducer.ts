import { PostState, PostAction, PostActionTypes } from "./types";
const initialState: PostState = {
  posts: [],
  totalCount: 0,
};
const postReducer = (state = initialState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionTypes.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case PostActionTypes.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          action.payload.id === post.id ? action.payload : post
        ),
      };

    case PostActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case PostActionTypes.ADD_POST_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return { ...post, likedBy: action.payload.likedBy };
          }
          return post;
        }),
      };

    case PostActionTypes.FETCH_POSTS:
      return {
        ...state,
        totalCount: action.payload.totalCount,
        posts: [...state.posts, ...action.payload.result],
      };

    case PostActionTypes.RESET_STORE:
      return initialState;

    default:
      return state;
  }
};

export default postReducer;
