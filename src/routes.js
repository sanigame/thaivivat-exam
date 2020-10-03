import { Home, NotFound } from './features';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '*',
    component: NotFound,
  },
];
