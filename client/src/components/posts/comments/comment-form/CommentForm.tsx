import React, { FC, useState, useEffect, useRef } from "react";

import { API_URL } from "@consts/paths";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { CommentTextarea } from "@ui";

import styles from "./comment-form.module.scss";
import { ICommentFormProps } from "./types";

const CommentForm: FC<ICommentFormProps> = ({
  initialText = "",
  initialFile,
  onSubmit,
  onClose,
  hasCancelButton = false,
}) => {
  const [text, setText] = useState(initialText);
  const [attachment, setAttachment] = useState<
    null | File | string | undefined
  >(initialFile);
  const uploadInputRef = useRef<any>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setAttachment(null);
      return;
    }
    setAttachment(e.target.files[0]);
  };
  const handleClick = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (typeof attachment === "string") {
      onSubmit({ text, attachment: attachment.substring(API_URL.length + 1) });
    } else {
      onSubmit({ text, attachment });
    }
    setText("");
    setAttachment(null);
  };
  return (
    <div className={styles.comment_form}>
      <CommentTextarea
        rows={1}
        maxLength={200}
        placeholder="Your comment..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
      >
        <div className={styles.comment_form__actions}>
          <input
            ref={uploadInputRef}
            type="file"
            id="attachment"
            onChange={handleFileChange}
            className={styles.attachment_input}
          />
          <label className={styles.attachment_label} htmlFor="attachment">
            <AttachmentIcon sx={{ transform: "rotate(-45deg)" }} />
          </label>
          <input
            className={styles.submit_input}
            id="submit"
            onClick={handleClick}
          />
          <label className={styles.submit_label} htmlFor="submit">
            <KeyboardArrowUpIcon />
          </label>
          {hasCancelButton && <CloseIcon onClick={onClose} />}
        </div>
      </CommentTextarea>
      <UploadedFilePreview
        initialFile={initialFile}
        uploadInputRef={uploadInputRef}
        attachment={attachment}
        setAttachment={setAttachment}
      />
    </div>
  );
};

const UploadedFilePreview = ({
  attachment,
  setAttachment,
  uploadInputRef,
  initialFile,
}: any) => {
  const [preview, setPreview] = useState<null | string>(null);
  useEffect(() => {
    if (typeof attachment === "string") {
      setPreview(attachment);
      return;
    }
    if (!attachment) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(attachment);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [attachment]);
  return (
    <div className={styles.file_preview}>
      {preview && (
        <>
          <CloseIcon
            onClick={() => {
              setAttachment(null);
              setPreview(null);
              uploadInputRef.current.value = null;
            }}
          />
          <img src={preview} alt={preview} width="50" height="50" />
        </>
      )}
    </div>
  );
};

export default CommentForm;
