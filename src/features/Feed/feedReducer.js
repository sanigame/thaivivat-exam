/* eslint-disable max-len */
import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
} from './feedAction';

import { SEARCH_FEED_SUCCESS } from '../Search/action';

function feed(state = {}, action) {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return Object.assign({}, state, {
        [action.subreddit]: {
          ...state[action.subreddit],
          isFetching: true,
          error: false,
        },
      });
    case FETCH_FEED_SUCCESS:
      return Object.assign({}, state, {
        [action.subreddit]: {
          ...state[action.subreddit],
          isFetching: false,
          error: false,
          after_current: (action.payload.data.after === null) ? 'first' : action.payload.data.after,
          after_all: (state.after_all instanceof Array) ? state.after_all.concat(state.after_current) : [],
          value: (state[action.subreddit].value instanceof Array) ? state[action.subreddit].value.concat(action.payload.data.children) : action.payload.data.children,
        },
      });
    case FETCH_FEED_FAILURE:
      return Object.assign({}, state, {
        [action.subreddit]: {
          ...state[action.subreddit],
          isFetching: false,
          error: action.payload,
        },
      });
    case SEARCH_FEED_SUCCESS:
      return Object.assign({}, state, {
        [action.subreddit]: {
          ...state[action.subreddit],
          isFetching: false,
          error: false,
          after_current: (action.payload.data.after === null) ? 'first' : action.payload.data.after,
          after_all: (state.after_all instanceof Array) ? state.after_all.concat(state.after_current) : [],
          value: action.payload.data.children,
        },
      });
    default:
      return state;
  }
}

export default feed;
