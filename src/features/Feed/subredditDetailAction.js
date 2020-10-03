export const FETCH_SUBREDDIT_REQUEST = 'FETCH_SUBREDDIT_REQUEST';
export const FETCH_SUBREDDIT_SUCCESS = 'FETCH_SUBREDDIT_SUCCESS';
export const FETCH_SUBREDDIT_FAILURE = 'FETCH_SUBREDDIT_FAILURE';

function fetchSubredditFailure(error, name) {
  return {
    type: FETCH_SUBREDDIT_FAILURE,
    userId: name,
    payload: error.message,
  };
}

function fetchSubredditSuccess(data, name) {
  return {
    type: FETCH_SUBREDDIT_SUCCESS,
    meta: {
      receivedAt: Date.now(),
    },
    name,
    payload: data,
  };
}

function fetchSubreddit(name) {
  return async (dispatch, axios) => {
    dispatch({
      type: FETCH_SUBREDDIT_REQUEST,
      name,
    });

    try {
      const res = await axios.get(`https://www.reddit.com/r/${name}/about.json`);
      dispatch(fetchSubredditSuccess(res.data, name));
    } catch (error) {
      dispatch(fetchSubredditFailure(error, name));
    }
  };
}

function shouldFetchSubreddit(state, name) {
  const subreddit = state.subreddit[name];
  if (!subreddit || subreddit.error) {
    return true;
  }
  return false;
}

export const fetchSubredditIfNeeded = name => (dispatch, getState, axios) => {
  if (shouldFetchSubreddit(getState(), name)) {
    return dispatch(fetchSubreddit(name, axios));
  }
  return null;
};
