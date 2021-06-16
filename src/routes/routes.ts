import { lazy } from 'react';
import IRoute from './type';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: lazy(() => import("@pages/")),
    exact: true,
    isPrivate: false
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: lazy(() => import("@pages/User/SignUp")),
    exact: true,
    isPrivate: false
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: lazy(() => import("@pages/Dashboard")),
    exact: true,
    isPrivate: false
  }
]

export default routes;