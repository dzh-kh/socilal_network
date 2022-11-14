import React from "react";

import spinner from "@assets/sprites/spinner.svg";
const LoadingSpinner = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "fit-content",
      }}
    >
      {" "}
      <img src={spinner} alt="" />
    </div>
  );
};

export default LoadingSpinner;
