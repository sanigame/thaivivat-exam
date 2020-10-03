import {
  FETCH_SUBREDDIT_REQUEST,
  FETCH_SUBREDDIT_SUCCESS,
  FETCH_SUBREDDIT_FAILURE,
} from './subredditDetailAction';

function subreddit(state = {}, action) {
  switch (action.type) {
    case FETCH_SUBREDDIT_REQUEST:
      return Object.assign({}, state, {
        [action.name]: {
          isFetching: true,
          error: false,
        },
      });
    case FETCH_SUBREDDIT_SUCCESS:
      return Object.assign({}, state, {
        [action.name]: {
          isFetching: false,
          error: false,
          value: action.payload.data,
        },
      });
    case FETCH_SUBREDDIT_FAILURE:
      return Object.assign({}, state, {
        [action.name]: {
          isFetching: false,
          error: action.payload,
        },
      });
    default:
      return state;
  }
}

export default subreddit;
