import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { subreddits, selected, feedReducer, feedDetailReducer, subredditDetailReducer } from '../features';

export default combineReducers({
  router,
  subreddits,
  selected,
  feed: feedReducer,
  subreddit: subredditDetailReducer,
  feedDetail: feedDetailReducer,
});
