/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import FeedList from './FeedList';
import { fetchFeedIfNeeded } from './feedAction';

export class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
    match: PropTypes.shape(),
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: {
      params: {
        subreddit: 'all',
      },
    },
  }

  static fetchData({ dispatch }, params) {
    return dispatch(fetchFeedIfNeeded(params, { listing: 'hot' }));
  }


  componentDidMount() {
    const { feed } = this.props;
    if (!feed[this.props.match.params.subreddit]) {
      this.loadFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.subreddit !== this.props.match.params.subreddit) {
      this.loadFeed(nextProps.match.params.subreddit);
    }
  }

  loadFeed = (subreddit = false) => {
    const { dispatch } = this.props;
    const params = {
      subreddit: this.props.match.params.subreddit,
      listing: 'top',
    };
    console.log('params', params);

    if (subreddit) {
      params.subreddit = subreddit;
    }

    Feed.fetchData({ dispatch }, params);
  }

  render() {
    const { feed } = this.props;
    console.log('this.props.match.params.subreddit', this.props.match.params.subreddit);
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            {feed[this.props.match.params.subreddit] ? <FeedList list={feed[this.props.match.params.subreddit]} /> : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.feed || {},
  subreddit: state.subreddit,
});

export default connect(mapStateToProps)(Feed);
