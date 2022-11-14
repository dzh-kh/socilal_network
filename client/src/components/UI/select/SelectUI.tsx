import React, { FC } from "react";

import "./selectUI.scss";
import Select from "react-select";

const SelectUI: FC<any> = (props) => {
  return (
    <Select
      {...props}
      classNamePrefix="react-select"
      defaultValue={props.options[0]}
    />
  );
};

export default SelectUI;
