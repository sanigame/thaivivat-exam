/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { fetchFeedIfNeeded } from './feedAction';

export class Feed extends Component {
  static propTypes = {
    feed: PropTypes.object.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    params: {
      subreddit: 'all',
    },
  }

  static fetchData({ dispatch }, params) {
    return dispatch(fetchFeedIfNeeded(params));
  }


  componentDidMount() {
    const { feed } = this.props;
    if (!feed[this.props.params.subreddit]) {
      this.loadFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.subreddit !== this.props.params.subreddit) {
      this.loadFeed(nextProps.params.subreddit);
    }
  }

  loadFeed = (subreddit = false) => {
    const { dispatch } = this.props;
    const params = {
      subreddit: this.props.params.subreddit,
      listing: 'hot',
    };

    if (subreddit) {
      params.subreddit = subreddit;
    }

    Feed.fetchData({ dispatch }, params);
  }


  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
                x
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.feed,
  subreddit: state.subreddit,
});

export default connect(mapStateToProps)(Feed);
