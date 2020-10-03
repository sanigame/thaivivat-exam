import {
  FETCH_FEED_DETAIL_REQUEST,
  FETCH_FEED_DETAIL_SUCCESS,
  FETCH_FEED_DETAIL_FAILURE,
} from './action';

function feedDetail(state = {}, action) {
  switch (action.type) {
    case FETCH_FEED_DETAIL_REQUEST:
      return Object.assign({}, state, {
        [action.name]: {
          isFetching: true,
          error: false,
        },
      });
    case FETCH_FEED_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        [action.name]: {
          isFetching: false,
          error: false,
          value: action.payload,
        },
      });
    case FETCH_FEED_DETAIL_FAILURE:
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

export default feedDetail;

export const getDetailByName = (state, name) => (
  state.feedDetail[name] || {}
);
