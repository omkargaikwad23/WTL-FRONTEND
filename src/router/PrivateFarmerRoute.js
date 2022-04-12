import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PrivateFarmerRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);
  const isAuthenticated = user.type === "farmers";
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateFarmerRoute;
