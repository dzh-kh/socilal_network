import React, { FC } from "react";

import { useActions } from "@hooks";
import { IPostRequest } from "@models/IPost";
import { Button, Input } from "@ui";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./post-add-form.module.scss";

const PostAddForm: FC = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
  } = useForm<IPostRequest>({ mode: "onBlur" });
  const { addPost } = useActions();
  const onSubmit: SubmitHandler<IPostRequest> = (data: IPostRequest) => {
    const formData: FormData = new FormData();
    const { title, message, tags, selectedFile } = data;
    formData.append("title", title);
    formData.append("message", message);
    formData.append("tags", tags);
    formData.append("selectedFile", selectedFile[0]);
    addPost(formData);
    reset();
  };

  const inputsList = POST_FORM_INPUTS.map((input: any, index: number) => {
    const { type, placeholder, name, validate } = input;
    return (
      <Input
        key={index}
        errors={errors}
        {...register(name, validate)}
        placeholder={placeholder}
        type={type}
      />
    );
  });

  return (
    <div className={styles.postForm}>
      <h3>Creating a Memory</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputsList}
        <Button type="submit" disabled={!isValid}>
          SUBMIT
        </Button>
        <Button onClick={() => reset()} type="reset">
          CLEAR
        </Button>
      </form>
    </div>
  );
};

export default PostAddForm;

const POST_FORM_INPUTS: any = [
  {
    name: "title",
    validate: { required: "Title is a required field" },
    placeholder: "Title",
    type: "text",
  },
  {
    name: "message",
    validate: {
      required: "Message is a required field",
      minLength: {
        value: 2,
        message: "You need to right at least 2 characters",
      },
      maxLength: {
        value: 100,
        message: "Message must be maximum 100 characters",
      },
    },
    placeholder: "Message",
    type: "text",
  },
  {
    name: "tags",
    validate: { required: "Tags is a required field" },
    placeholder: "Tags",
    type: "text",
  },
  {
    name: "selectedFile",
    validate: {},
    placeholder: "file",
    type: "file",
  },
];
