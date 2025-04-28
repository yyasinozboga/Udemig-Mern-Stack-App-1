import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protect = () => {
  if (!localStorage.getItem("jwt")) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default Protect;
