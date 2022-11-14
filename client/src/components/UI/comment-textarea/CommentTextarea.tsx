import React, { FC } from "react";

import styles from "./comment-textarea.module.scss";

interface ICommentTextareaProps {
  children: any;
  maxLength: number;
  rows: number;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}
const CommentTextarea: FC<ICommentTextareaProps> = React.forwardRef<
  HTMLTextAreaElement,
  ICommentTextareaProps
>(({ children, maxLength, rows, placeholder, value, onChange }, ref) => {
  return (
    <div className={styles.inputWrapper}>
      <textarea
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        className={styles.textarea}
      />
      {children}
    </div>
  );
});

export default CommentTextarea;
