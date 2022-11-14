import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import * as CommentActions from "../store/comment/actions";
import * as MessageActions from "../store/message/actions";
import * as PostActions from "../store/post/actions";
import * as UserActions from "../store/user/actions";

const useActions = () => {
  const dispatch: any = useDispatch();
  return bindActionCreators(
    { ...UserActions, ...PostActions, ...CommentActions, ...MessageActions },
    dispatch
  );
};

export default useActions;
