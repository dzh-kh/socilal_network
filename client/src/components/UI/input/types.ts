import { ReactElement } from "react";
import { ChangeEventHandler, FocusEventHandler } from "react";

import { SvgIconComponent } from "@mui/icons-material";

export default interface IInputProps {
  placeholder?: string;
  name?: string;
  errors?: any;
  type?: string;
  children?: ReactElement<SvgIconComponent>;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  props?: any;
  ref?: any;
}
