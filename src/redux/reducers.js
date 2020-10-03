import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { subreddits, selected, feedReducer, feedDetailReducer, subredditDetailReducer } from '../features';

export default combineReducers({
  router,
  subreddits,
  selected,
  form: formReducer,
  feed: feedReducer,
  subreddit: subredditDetailReducer,
  feedDetail: feedDetailReducer,
});
