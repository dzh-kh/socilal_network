import React, { FC } from "react";

import styles from "./bio.module.scss";

const Bio: FC<{ bio: string }> = ({ bio }) => {
  return (
    <div>
      <h4>Bio</h4>
      <p>{bio}</p>
    </div>
  );
};

export default Bio;
