import React, { FC } from "react";

import styles from "./button.module.scss";
import IButtonProps from "./types";
const Button: FC<IButtonProps> = ({
  children,
  type,
  onClick,
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type || "button"}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
