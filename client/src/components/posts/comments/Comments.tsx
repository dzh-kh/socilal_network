import React, { useState, useEffect, FC } from "react";

import { useTypedSelector, useActions, useRequest } from "@hooks";
import { ICommentRequest, ICommentResponse } from "@models/IComment";
import { LoadingSpinner } from "@ui";

import CommentForm from "./comment-form/CommentForm";
import Comment from "./comment/Comment";
import styles from "./comments.module.scss";
import { ICommentsProps } from "./types";

const Comments: FC<ICommentsProps> = ({ postId }) => {
  const { getComments, addComment, editComment, deleteComment } = useActions();
  const { isLoading, fetch } = useRequest(() => getComments(postId));
  useEffect(() => {
    fetch();
  }, []);
  const { comments } = useTypedSelector((state) => state.comment);
  const [activeComment, setActiveComment] = useState<null | {
    id: number;
    type: string;
  }>(null);

  const rootComments = comments
    ? comments.filter((comment) => !comment.parentId)
    : [];
  const getReplies = (commentId: number) =>
    comments
      ? comments.filter((comment) => comment.parentId === commentId)
      : [];
  const handleAddComment = (
    postId: number,
    parentId: number | null,
    adresseeId: number | null,
    comment: ICommentRequest
  ) => {
    const { text, attachment } = comment;
    const formData: FormData = new FormData();
    formData.append("text", text as any);
    formData.append("attachment", attachment as any);
    formData.append("parentId", parentId as any);
    formData.append("adresseeId", adresseeId as any);
    addComment(postId, formData);
    setActiveComment(null);
  };
  const handleEditComment = (comment: ICommentResponse) => {
    const { id, postId, text, attachment } = comment;
    const formData: FormData = new FormData();
    formData.append("text", text as any);
    formData.append("attachment", attachment as any);
    editComment(postId, id, formData);
    setActiveComment(null);
  };

  const commentsList = rootComments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        addComment={handleAddComment}
        deleteComment={(commentId: number) => deleteComment(postId, commentId)}
        editComment={handleEditComment}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        replies={getReplies(comment.id)}
      />
    );
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className={styles.comments_wrapper}>
        <div className={styles.comments_list}>
          {commentsList.length ? (
            commentsList
          ) : (
            <div className={styles.no_comments}>No comments yet</div>
          )}
        </div>
        {!activeComment && (
          <CommentForm
            onSubmit={(comment: ICommentRequest) =>
              handleAddComment(postId, null, null, comment)
            }
          />
        )}
      </div>
    </>
  );
};

export default Comments;
