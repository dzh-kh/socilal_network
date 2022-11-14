import React, { useEffect, FC } from "react";

import Button from "../button/Button";

import { IModalProps } from "./types";
import "./modal.scss";

const Modal: FC<IModalProps> = ({
  active,
  setActive,
  children,
  onApply,
}: IModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return function () {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-body">
          {onApply && <Button onClick={onApply}>Upload</Button>}
          <Button onClick={() => setActive(false)}>Close</Button>
        </div>
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
