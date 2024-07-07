import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { Navigation, UserNav } from "../../components";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

function RouterConfiguration({ children }: IPrivateRouteProps) {
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={isAuthenticated ? <UserNav /> : null}>{children}</Route>
      </Route>
    </Routes>
  );
}

export default RouterConfiguration;
