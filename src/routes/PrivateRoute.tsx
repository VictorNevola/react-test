import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = ({ component, auth, ...rest }: any) => {
  let ComponentToRender = component;

  return (
    <Route
      {...rest}
      render={props =>
        auth?.isAuthenticated ?
          <ComponentToRender {...props} />
          :
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
      }
    />
  );
}

export default PrivateRoute
