/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

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
    const { value } = this.props.subreddits;
    return (
      value.map(subreddit => (
        <Link component={RouterLink} to={`/subreddit/${subreddit.data.display_name}`} title={subreddit.data.display_name} key={subreddit.data.id}>
          {subreddit.data.display_name}
        </Link>
      ))
    );
  }

  render() {
    return (
      <div>
        subreddit
        {this.renderSidebarMenu()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
});

export default connect(mapStateToProps)(SubredditList);
