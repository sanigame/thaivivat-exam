/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */

export const FETCH_SUBREDDITS_REQUEST = 'FETCH_SUBREDDITS_REQUEST';
export const FETCH_SUBREDDITS_SUCCESS = 'FETCH_SUBREDDITS_SUCCESS';
export const FETCH_SUBREDDITS_FAILURE = 'FETCH_SUBREDDITS_FAILURE';

const serialize = obj => `?${Object.keys(obj).reduce((a, k) => { a.push(`${k}=${ encodeURIComponent(obj[k])}`); return a; }, []).join('&')}`;

const fetchSubredditsFailure = error => (
  {
    type: FETCH_SUBREDDITS_FAILURE,
    payload: error.message,
  }
);

const fetchSubredditsSuccess = data => (
  {
    type: FETCH_SUBREDDITS_SUCCESS,
    meta: {
      receivedAt: Date.now(),
    },
    payload: data,
  }
);

const fetchSubreddits = (state, axios) => {
  const subreddits = state.subreddits;
  const queryString = serialize({ after: subreddits.after_current });

  return async (dispatch) => {
    dispatch({ type: FETCH_SUBREDDITS_REQUEST });

    try {
      const res = await axios.get(`https://www.reddit.com/subreddits/default.json${queryString}`);
      dispatch(fetchSubredditsSuccess(res.data));
    } catch (error) {
      dispatch(fetchSubredditsFailure(error));
    }
  };
};

const shouldFetchSubreddits = (state) => {
  const subreddits = state.subreddits;
  if (!subreddits.isFetching && (subreddits.after_all.indexOf(subreddits.after_current) === -1)) {
    return true;
  }

  return false;
};

export const fetchSubredditsIfNeeded = () => (dispatch, getState, axios) => {
  if (shouldFetchSubreddits(getState())) {
    return dispatch(fetchSubreddits(getState(), axios));
  }

  /* istanbul ignore next */
  return null;
};
