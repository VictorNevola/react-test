import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from '@contexts/auth';

const Home = lazy(() => import("@pages/"));
const SignUp = lazy(() => import("@pages/User/SignUp"));
const SignIn = lazy(() => import("@pages/User/SignIn"));
const Dashboard = lazy(() => import("@pages/Dashboard/"));

export default function RouteWrapper() {

  return (
    <Suspense fallback={<h1>Rendering...</h1>} >
        <AuthProvider> 
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Router>
        </AuthProvider>
    </Suspense>
  )
}