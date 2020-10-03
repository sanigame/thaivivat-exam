/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_FAILURE,
} from '../Feed/feedAction';

export const SEARCH_FEED_SUCCESS = 'SEARCH_FEED_SUCCESS';

function fetchFeedFailure(error, subreddit) {
  return {
    type: FETCH_FEED_FAILURE,
    payload: error.message,
    subreddit,
  };
}

function fetchFeedSuccess(data, subreddit) {
  return {
    type: SEARCH_FEED_SUCCESS,
    meta: {
      receivedAt: Date.now(),
    },
    subreddit,
    payload: data,
  };
}

function fetchSearchFeed(state, options, axios) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_FEED_REQUEST,
      subreddit: options.subreddit,
    });

    try {
      const res = await axios.get(`https://www.reddit.com/r/all/search.json?q=title:${options.keyword}&sort=new`);
      dispatch(fetchFeedSuccess(res.data, options.subreddit));
    } catch (error) {
      dispatch(fetchFeedFailure(error, options.subreddit));
    }
  };
}

export const fetchFeedSearch = options => (dispatch, getState, axios) => dispatch(fetchSearchFeed(getState(), options, axios));
