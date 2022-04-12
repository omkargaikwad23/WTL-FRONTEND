import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);
  const isAuthenticated = user.type === "farmers" || user.type === "retailors";
  return (
    <Route
      {...rest}
      component={(props) => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/`} />;
        }
      }}
    />
  );
};

export default PublicRoute;
