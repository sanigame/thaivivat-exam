export const FETCH_FEED_DETAIL_REQUEST = 'FETCH_FEED_DETAIL_REQUEST';
export const FETCH_FEED_DETAIL_SUCCESS = 'FETCH_FEED_DETAIL_SUCCESS';
export const FETCH_FEED_DETAIL_FAILURE = 'FETCH_FEED_DETAIL_FAILURE';

const fetchFeedDetailFailure = (error, name) => ({
  type: FETCH_FEED_DETAIL_FAILURE,
  name,
  payload: error.message,
});

const fetchFeedDetailSuccess = (data, name) => ({
  type: FETCH_FEED_DETAIL_SUCCESS,
  meta: {
    receivedAt: Date.now(),
  },
  name,
  payload: data.data.children[0].data,
});

const fetchFeedDetail = (name, axios) => async (dispatch) => {
  dispatch({
    type: FETCH_FEED_DETAIL_REQUEST,
    name,
  });

  try {
    const res = await axios.get(`https://www.reddit.com/by_id/${name}.json`);
    dispatch(fetchFeedDetailSuccess(res.data, name));
  } catch (error) {
    dispatch(fetchFeedDetailFailure(error, name));
  }
};

function shouldFetchFeedDetail(state, name) {
  const feedDetail = state.feedDetail[name];
  if (!feedDetail || feedDetail.error) {
    return true;
  }
  return false;
}

export const fetchFeedDetailIfNeeded = name => (dispatch, getState, axios) => {
  if (shouldFetchFeedDetail(getState(), name)) {
    return dispatch(fetchFeedDetail(name, axios));
  }
  return null;
};
