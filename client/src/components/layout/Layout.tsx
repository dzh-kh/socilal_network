import React, { FC, useEffect } from "react";

import { useActions } from "@hooks";

import Header from "./header/Header";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkAuth } = useActions();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ maxWidth: "1000px", margin: "1rem auto" }}>{children}</div>
    </div>
  );
};

export default Layout;
