import IRoute from './type';
import Home from '@pages/';
import Dashboard from '@pages/Dashboard';
import SignUp from '@pages/User/SignUp';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
    isPrivate: false
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    exact: true,
    isPrivate: false
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    isPrivate: false
  }
]

export default routes;