import React, { ReactNode } from "react";

export default interface IButtonProps {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
