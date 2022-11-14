import React, { useState, FC, Suspense } from "react";

import no_avatar from "@assets/images/no_avatar.jpeg";
import no_background from "@assets/images/no_background.jpeg";
import { useTypedSelector } from "@hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { UserService } from "@services";
import { Button, Input } from "@ui";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import styles from "./profile-settings.module.scss";
import { IFileChange, IData } from "./types";

const ImageCrop = React.lazy(
  () => import("../../../components/imageCrop/ImageCrop")
);

const ProfileSettings: FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      avatar: null,
      background: null,
      gender: user?.profile?.gender,
      bio: user?.profile?.bio,
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.profile?.avatar);
  const [backPreview, setBackPreview] = useState(user?.profile?.background);

  const id = Number(useParams().id);

  const onSubmit = async (data: IData) => {
    let { bio, lastName, firstName, avatar, background, gender } = data;
    const formData: FormData = new FormData();
    if (avatar) {
      avatar = await fetch(avatar).then((r) => r.blob());
      formData.append("avatar", avatar as any);
    }
    if (!avatar && avatarPreview === no_avatar) {
      formData.append("avatar", avatar as any);
    }

    if (background) {
      background = await fetch(background).then((r) => r.blob());
      formData.append("background", background as any);
    }
    if (!background && backPreview === no_background) {
      formData.append("background", background as any);
    }

    formData.append("gender", gender as any);
    formData.append("bio", bio as any);
    formData.append("lastName", lastName as any);
    formData.append("firstName", firstName as any);

    await UserService.editProfile(id, formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FileChange
            cropWidth={200}
            cropHeight={200}
            name="avatar"
            isRound={true}
            register={register}
            setValue={setValue}
            preview={avatarPreview}
            setPreview={setAvatarPreview}
          />
          <FileChange
            cropWidth={1000}
            cropHeight={320}
            name="background"
            isRound={false}
            register={register}
            setValue={setValue}
            preview={backPreview}
            setPreview={setBackPreview}
          />
        </div>
        <div>
          <h4>Change name</h4>
          <Input
            {...register("firstName", VALIDATORS.firstName)}
            placeholder="First name"
            errors={errors}
          />
          <Input
            {...register("lastName", VALIDATORS.lastName)}
            placeholder="Last name"
            errors={errors}
          />
        </div>
        <div className={styles.bio_textarea}>
          <h4>Change bio</h4>
          <textarea
            {...register("bio", VALIDATORS.bio)}
            placeholder="type your bio.."
            name="bio"
            id="bio"
            cols={30}
            rows={10}
          />
        </div>
        <div className={styles.gender_select}>
          <h4>Change gender</h4>
          <select {...register("gender")} name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default ProfileSettings;

const VALIDATORS = {
  firstName: {
    required: "First name is required field",
    minLength: {
      value: 2,
      message: "You need to right at least 2 characters",
    },
    maxLength: {
      value: 8,
      message: "First Name must be maximum 8 characters",
    },
  },
  lastName: {
    required: "Last name is required field",
    minLength: {
      value: 2,
      message: "You need to right at least 2 characters",
    },
    maxLength: {
      value: 8,
      message: "Last name must be maximum 8 characters",
    },
  },
  bio: {
    maxLength: {
      value: 500,
      message: "Bio must be maximum 500 characters",
    },
  },
};

const FileChange: FC<IFileChange> = ({
  cropWidth,
  cropHeight,
  name,
  isRound,
  register,
  setValue,
  preview,
  setPreview,
}: IFileChange) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<null | string>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setFile(objectUrl);
      setShowModal(true);
    }
  };
  const handleFileDelete = () => {
    setPreview(name === "avatar" ? no_avatar : no_background);
    setValue(name, null);
  };

  return (
    <div className={styles[name]}>
      <h4>Change {name}</h4>
      <div className={styles.preview}>
        <img
          className={styles[name + "_img"]}
          height={100}
          src={preview}
          alt={name}
        />

        <input
          {...register(name)}
          onChange={handleFileUpload}
          className={styles.preview_input}
          type="file"
          id={name}
        />
        <label htmlFor={name}>
          <div className={styles.upload_container}>
            <UploadIcon />
          </div>
        </label>
        <div onClick={handleFileDelete}>
          <DeleteIcon />
        </div>
      </div>
      {showModal && file && (
        <Suspense>
          <ImageCrop
            width={cropWidth}
            height={cropHeight}
            isRound={isRound}
            src={file}
            setFile={(file) => {
              setValue(name, file);
              setPreview(file);
              setFile(null);
            }}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </Suspense>
      )}
    </div>
  );
};
