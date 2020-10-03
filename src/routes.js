import { Home, FeedDetail, NotFound } from './features';

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/content/:name',
    exact: true,
    component: FeedDetail,
  },
  {
    path: '*',
    component: NotFound,
  },
];
