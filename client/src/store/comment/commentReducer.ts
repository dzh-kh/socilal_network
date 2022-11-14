import { CommentActionTypes, CommentAction, CommentState } from "./types";

const initialState: CommentState = {
  comments: [],
};

const CommentReducer = (
  state = initialState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case CommentActionTypes.FETCH_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case CommentActionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case CommentActionTypes.LIKE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            comment.likedBy = action.payload.likedBy;
          }
          return comment;
        }),
      };
    case CommentActionTypes.EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return { ...comment, ...action.payload };
          }
          return comment;
        }),
      };
    case CommentActionTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default CommentReducer;
