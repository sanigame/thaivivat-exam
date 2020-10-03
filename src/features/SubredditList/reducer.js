import {
  FETCH_SUBREDDITS_REQUEST,
  FETCH_SUBREDDITS_SUCCESS,
  FETCH_SUBREDDITS_FAILURE,
} from './action';

const subreddits = (state = {
  isFetching: false,
  error: false,
  lastUpdated: 0,
  after_all: [],
  after_current: 'first',
  value: [],
}, action) => {
  switch (action.type) {
    case FETCH_SUBREDDITS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case FETCH_SUBREDDITS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        after_current: (action.payload.data.after === null) ? 'first' : action.payload.data.after,
        after_all: state.after_all.concat(state.after_current),
        value: state.value.concat(action.payload.data.children),
      };
    case FETCH_SUBREDDITS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subreddits;
