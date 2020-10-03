/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    const { isFetching, error, value } = this.props.subreddits;
    return (
      <div>
        { isFetching ? <p>loading...</p> : null }
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

  render() {
    return (
      <List>
        <Link component={RouterLink} to="/" title="all">
          <ListItem button>
            <ListItemText primary="all" />
          </ListItem>
        </Link>
        {this.renderSidebarMenu()}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
});

export default connect(mapStateToProps)(SubredditList);
