import {
  SET_SUBREDDIT_SELECTED,
  SET_PATH_TYPE_VALUE,
} from './action';

function selected(state = {
  subreddit: '',
}, action) {
  switch (action.type) {
    case SET_SUBREDDIT_SELECTED:
      return Object.assign({}, state, {
        ...state,
        subreddit: action.payload,
      });
    case SET_PATH_TYPE_VALUE:
      return Object.assign({}, state, {
        ...state,
        pathType: action.pathType,
        pathValue: action.pathValue,
      });
    default:
      return state;
  }
}
export default selected;
