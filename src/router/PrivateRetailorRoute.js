import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PrivateRetailorRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);
  const isAuthenticated = user.type === "retailors";
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRetailorRoute;
