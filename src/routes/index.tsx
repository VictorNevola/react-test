import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import Routes from './routes';

export default function RouteWrapper() {
  return (
    <>
      {Routes.map((route, index) => {
        if(route.isPrivate){
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
    </>
  )
}