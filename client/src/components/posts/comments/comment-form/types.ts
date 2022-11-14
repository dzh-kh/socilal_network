import { ChangeEventHandler } from "react";

export interface ICommentFormProps {
  initialText?: string;
  initialFile?: string;
  onSubmit: any;
  hasCancelButton?: boolean;
  onClose?: ChangeEventHandler<any>;
}
