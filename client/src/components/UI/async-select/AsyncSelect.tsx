import React from "react";

import AsyncSelect from "react-select/async";
import "./async-select.scss";

const AsyncSelectUI = (props: any) => {
  return <AsyncSelect classNamePrefix="react-async_select" {...props} />;
};

export default AsyncSelectUI;
