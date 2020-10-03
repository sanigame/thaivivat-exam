import { Home, FeedDetail, Feed, NotFound, feedDetailAction } from './features';

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
      dispatch(feedDetailAction.fetchFeedDetailIfNeeded(params.name)),
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
