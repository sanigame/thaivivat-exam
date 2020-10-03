/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchSubredditsIfNeeded } from './action';

export class SubredditList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    subreddits: PropTypes.object,
  }

  static defaultProps = {
    subreddits: {
      value: [],
    },
  }

  static fetchData({ dispatch }) {
    return dispatch(fetchSubredditsIfNeeded());
  }

  componentDidMount() {
    this.loadSubreddit();
  }

  loadSubreddit = () => {
    const { dispatch } = this.props;
    SubredditList.fetchData({ dispatch });
  }

  renderSidebarMenu = () => {
    const { error, value } = this.props.subreddits;
    return (
      <div>
        { error ? <p>error</p> : null }
        {
          value ?
          value.map(subreddit => (
            <Link component={RouterLink} to={`/subreddit/${subreddit.data.display_name}`} title={subreddit.data.display_name} key={subreddit.data.id}>
              <ListItem button>
                <ListItemText primary={subreddit.data.display_name} />
              </ListItem>
            </Link>
          )) : null
        }
      </div>
    );
  }

  renderWaypoint = () => {
    const { value } = this.props.subreddits;

    if (value && value.length > 0) {
      return (<Waypoint
        onEnter={() => this.loadSubreddit()}
      />);
    }
    return null;
  }

  render() {
    const { isFetching } = this.props.subreddits;
    return (
      <List>
        <Link component={RouterLink} to="/" title="all">
          <ListItem button>
            <ListItemText primary="all" />
          </ListItem>
        </Link>
        {this.renderSidebarMenu()}
        {this.renderWaypoint()}
        { isFetching ? <CircularProgress style={{ display: 'block', margin: 'auto' }} color="secondary" /> : ''}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
});

export default connect(mapStateToProps)(SubredditList);
