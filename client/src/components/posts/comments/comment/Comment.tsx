import React, { FC, lazy, useMemo, Suspense } from "react";

import { useActions } from "@hooks";
import { ICommentRequest } from "@models/IComment";

import ContentTop from "../../content-top/ContentTop";
import ToggleLike from "../../toggle-like/ToggleLike";

import styles from "./comment.module.scss";
import { ICommentProps } from "./types";

const CommentForm = lazy(() => import("../comment-form/CommentForm"));

const Comment: FC<ICommentProps> = ({
  comment,
  activeComment,
  setActiveComment,
  replies,
  addComment,
  deleteComment,
  editComment,
}: ICommentProps) => {
  const { likeComment } = useActions();
  const {
    attachment,
    author,
    createdAt,
    likedBy,
    parentId = null,
    addressee = null,
    postId,
    id,
    text,
  } = comment;

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const replyId = parentId ? parentId : comment.id;
  const commentReplies = useMemo(
    () =>
      replies.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            addComment={addComment}
            deleteComment={deleteComment}
            editComment={editComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            replies={[]}
          />
        );
      }),
    [replies]
  );
  if (isEditing)
    return (
      <Suspense>
        <CommentForm
          initialFile={attachment}
          initialText={text}
          onSubmit={(comment: ICommentRequest) =>
            editComment({ postId, id, ...comment })
          }
          onClose={() => setActiveComment(null)}
          hasCancelButton={true}
        />
      </Suspense>
    );

  return (
    <div className={styles.comment}>
      <ContentTop
        addressee={addressee}
        author={author}
        createdAt={createdAt}
        onDelete={() => deleteComment(id)}
        onEdit={() => setActiveComment({ type: "editing", id })}
        type="comment"
      />
      <p className={styles.comment__text}>{text}</p>
      {attachment && <img width={150} src={attachment} alt={attachment} />}
      <div className={styles.comment__action}>
        <button
          className={styles.comment__action_reply_button}
          onClick={() => setActiveComment({ type: "replying", id })}
        >
          reply
        </button>
        <ToggleLike
          contentType="comment"
          id={id}
          addLike={() => {
            likeComment(postId, id);
          }}
          likeCount={likedBy.length}
        />
      </div>
      {isReplying && (
        <Suspense>
          <CommentForm
            hasCancelButton={true}
            onClose={() => setActiveComment(null)}
            onSubmit={(comment: any) =>
              addComment(postId, replyId, id, comment)
            }
          />
        </Suspense>
      )}
      {replies.length > 0 && (
        <div className={styles.comment__replies}> {commentReplies} </div>
      )}
    </div>
  );
};

export default Comment;
