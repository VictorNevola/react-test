import React, { Suspense, lazy } from 'react';
import { Router, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from '@contexts/auth';
import history from '@resources/history';

const Home = lazy(() => import("@pages/"));
const SignUp = lazy(() => import("@pages/User/SignUp"));
const SignIn = lazy(() => import("@pages/User/SignIn"));
const Dashboard = lazy(() => import("@pages/Admin-Init"));
const Products = lazy(() => import("@pages/Products"));

export default function RouteWrapper() {

  return (
    <Suspense fallback={<h1>Rendering...</h1>} >
        <AuthProvider> 
          <Router history={history} >
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute exact path="/admin" component={Dashboard} />
            <PrivateRoute exact path="/Products" component={Products} />
          </Router>
        </AuthProvider>
    </Suspense>
  )
}