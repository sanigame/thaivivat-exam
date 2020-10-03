import Home from './Home';
import NotFound from './NotFound';
import { SubredditList, subreddits } from './SubredditList';
import { Header, selected } from './Header';
import { Feed, feedReducer, subredditDetailReducer } from './Feed';
import { FeedDetail, feedDetailAction, feedDetailReducer } from './FeedDetail';

export {
  Home,
  NotFound,
  SubredditList,
  Header,
  Feed,
  FeedDetail,
  feedDetailAction,
  subreddits,
  selected,
  feedReducer,
  subredditDetailReducer,
  feedDetailReducer,
};
