import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { subreddits } from '../features';

export default combineReducers({
  router,
  subreddits,
});
