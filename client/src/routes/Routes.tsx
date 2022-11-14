import React, { FC } from "react";

import { useTypedSelector } from "@hooks";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { routes } from "./list";

const RoutesComponent: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          if (route.auth && !isAuth) {
            return false;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <route.element />
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
