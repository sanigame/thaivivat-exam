import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { subreddits, selected } from '../features';

export default combineReducers({
  router,
  subreddits,
  selected,
});
