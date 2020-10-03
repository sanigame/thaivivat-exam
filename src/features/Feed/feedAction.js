
import { fetchSubredditIfNeeded } from './subredditDetailAction';

export const FETCH_FEED_REQUEST = 'FETCH_FEED_REQUEST';
export const FETCH_FEED_SUCCESS = 'FETCH_FEED_SUCCESS';
export const FETCH_FEED_FAILURE = 'FETCH_FEED_FAILURE';

function serialize(obj) {
  return `?${Object.keys(obj).reduce((a, k) => { a.push(`${k}=${ encodeURIComponent(obj[k])}`); return a; }, []).join('&')}`;
}

function fetchFeedFailure(error, subreddit) {
  return {
    type: FETCH_FEED_FAILURE,
    payload: error.message,
    subreddit,
  };
}

function fetchFeedSuccess(data, subreddit) {
  return {
    type: FETCH_FEED_SUCCESS,
    meta: {
      receivedAt: Date.now(),
    },
    subreddit,
    payload: data,
  };
}

function fetchFeed(state, options, axios) {
  const feed = state.feed[options.subreddit];
  let queryString = '';

  if (feed) {
    queryString = serialize({ after: feed.after_current });
  }


  return async (dispatch) => {
    dispatch({
      type: FETCH_FEED_REQUEST,
      subreddit: options.subreddit,
    });

    if (options.subreddit !== undefined) {
      dispatch(fetchSubredditIfNeeded(options.subreddit));
    }

    try {
      const res = await axios.get(`https://www.reddit.com/r/${options.subreddit}/${options.listing}.json${queryString}`);
      dispatch(fetchFeedSuccess(res.data, options.subreddit));
    } catch (error) {
      dispatch(fetchFeedFailure(error, options.subreddit));
    }
  };
}

const shouldFetchFeed = (state, options) => {
  const feed = state.feed[options.subreddit];
  if (!feed || feed.error || (feed.after_all.indexOf(feed.after_current) === -1)) {
    return true;
  }
  return false;
};

export const fetchFeedIfNeeded = (options = {}) => (dispatch, getState, axios) => {
  if (shouldFetchFeed(getState(), options)) {
    return dispatch(fetchFeed(getState(), options, axios));
  }
  return null;
};
