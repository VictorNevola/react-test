import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "@contexts/auth";

const PrivateRoute = ({ component, ...rest }: any) => {
  let ComponentToRender = component;

  const { signed, isLoading } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        !isLoading ?
          (signed ? <ComponentToRender {...props} /> : <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)
          :
          <h1>Carregando context</h1>
      }
    />
  );
}

export default PrivateRoute
