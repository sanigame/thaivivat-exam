import { Home, FeedDetail, Feed, NotFound } from './features';
import { fetchFeedDetailIfNeeded } from './features/FeedDetail/action';

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
    loadData: (dispatch, params) => Promise.all([
      dispatch(fetchFeedDetailIfNeeded(params.name)),
    ]),
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
