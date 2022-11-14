import React, { useRef, useEffect, useState } from "react";

import { MAIN_PAGE_PATH } from "@consts/paths";
import { useActions, useRequest } from "@hooks";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Input } from "@ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import styles from "./auth.module.scss";

const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { login, registrate } = useActions();

  const {
    fetch: loginFn,
    isLoading,
    error,
  } = useRequest((email: string, password: string) => login(email, password));

  const [isSignup, setIsSignup] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setError("password", { type: "custom", message: error });
      navigate("/auth");
    }
    if (!error && isClicked && !isLoading) {
      navigate(MAIN_PAGE_PATH);
    }
  }, [isLoading]);

  const onSubmit = (data: any) => {
    if (isSignup) {
      loginFn(data.email, data.password);
      setIsClicked(true);
    } else {
      registrate(data.firstName, data.lastName, data.email, data.password);
      navigate(MAIN_PAGE_PATH);
    }
  };

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
    clearErrors("password");
    reset();
  };

  const visibleIconClick = (e: React.MouseEvent<any>): void => {
    e.preventDefault();
    let input = passwordRef.current;
    setIsPasswordVisible(!isPasswordVisible);
    if (input) {
      input.type === "password"
        ? (input.type = "text")
        : (input.type = "password");
      input.focus();
    }
  };

  const { ref, ...rest } = register("password", {
    required: "Password is a required field",
    minLength: {
      value: 6,
      message: "You need to right at least 6 characters",
    },
    maxLength: {
      value: 8,
      message: "Password must be maximum 8 characters",
    },
  });

  const inputsList = AUTH_FORM_INPUTS.map((input, index) => {
    const { type, placeholder, name, validate, isSignInField } = input;
    if (isSignup && !isSignInField) return;
    return (
      <div key={index}>
        <Input
          errors={errors}
          {...register(name, validate)}
          placeholder={placeholder}
          type={type}
        />
      </div>
    );
  });

  return (
    <div className={styles.formWrapper}>
      <LockOutlinedIcon className={styles.lock_icon} />
      <h5>{isSignup ? "Sign in" : "Sign up"}</h5>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        {inputsList}
        <Input
          placeholder="Password"
          type="password"
          errors={errors}
          {...rest}
          ref={(e: any) => {
            ref(e);
            passwordRef.current = e;
          }}
        >
          {!isPasswordVisible ? (
            <VisibilityOffIcon fontSize="small" onClick={visibleIconClick} />
          ) : (
            <VisibilityIcon fontSize="small" onClick={visibleIconClick} />
          )}
        </Input>
        <Button type="submit">{isSignup ? "SIGN IN" : "SIGN UP"}</Button>
      </form>
      <button className={styles.formChangeButton} onClick={handleFormSwitch}>
        {isSignup
          ? "DONT HAVE AN ACCOUNT? SIGN UP"
          : "ALREADY HAVE AN ACCOUNT? SIGN IN"}
      </button>
    </div>
  );
};

export default Auth;

export const AUTH_FORM_INPUTS = [
  {
    name: "firstName",
    isSignInField: false,
    validate: {
      required: "First name is a required field",
      minLength: {
        value: 2,
        message: "You need to right at least 3 characters",
      },
      maxLength: {
        value: 8,
        message: "First name must be maximum 8 characters",
      },
    },
    placeholder: "First name",
    type: "text",
  },
  {
    name: "lastName",
    isSignInField: false,
    validate: {
      required: "Last name is a required field",
      minLength: {
        value: 2,
        message: "You need to right at least 3 characters",
      },
      maxLength: {
        value: 8,
        message: "Last name must be maximum 8 characters",
      },
    },
    placeholder: "Last name",
    type: "text",
  },
  {
    name: "email",
    isSignInField: true,
    validate: {
      required: "Email is a required field",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter valid email",
      },
    },
    placeholder: "Email",
    type: "email",
  },
];
