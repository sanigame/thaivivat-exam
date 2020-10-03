export const SET_SUBREDDIT_SELECTED = 'SET_SUBREDDIT_SELECTED';
export const SET_PATH_TYPE_VALUE = 'SET_PATH_TYPE_VALUE';

export const subredditSelected = subreddit => dispatch => dispatch({
  type: SET_SUBREDDIT_SELECTED,
  payload: subreddit,
});

export const setPathValue = (type, value) => dispatch => dispatch({
  type: SET_PATH_TYPE_VALUE,
  pathType: type,
  pathValue: value,
});
