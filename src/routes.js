import { Home, FeedDetail, Feed, NotFound } from './features';

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
    path: '/subreddit/:subreddit',
    exact: true,
    component: Feed,
  },
  {
    path: '*',
    component: NotFound,
  },
];
