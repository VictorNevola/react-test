import React, { Suspense } from 'react';
import { Provider } from "react-redux";
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import Routes from './routes';
import store from "@store/"

export default function RouteWrapper() {
  return (
    <Suspense fallback={<h1>Rendering...</h1>} >
      <Provider store={store}>
        {Routes.map((route, index) => {
          if (route.isPrivate) {
            return (<Redirect to="/" />)
          }
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: RouteComponentProps<any>) => (
                <route.component
                  name={route.name}
                  {...props}
                  {...route.props}
                />
              )}
            />
          )
        })}
      </Provider>
    </Suspense>
  )
}