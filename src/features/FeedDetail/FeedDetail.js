/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { fetchFeedDetailIfNeeded } from './action';
import { getDetailByName } from './reducer';
import { MediaCard } from '../../commons';

export class FeedDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    feedDetail: PropTypes.object,
    fetchDetail: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    feedDetail: {
      value: {
        title: '',
        selftext: '',
      },
    },
  }

  componentDidMount() {
    const { fetchDetail, match: { params } } = this.props;
    fetchDetail(params.name);
  }

  render() {
    const { isFetching, error, value } = this.props.feedDetail;
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            {isFetching ? <p>loading</p> : ''}
            {error ? <p>error</p> : ''}
            {value ? <MediaCard detail={value} /> : ''}
          </Grid>
        </Grid>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  feedDetail: getDetailByName(state, ownProps.match.params.name),
});

const mapDispatchToProps = dispatch => ({
  fetchDetail: (name) => {
    dispatch(fetchFeedDetailIfNeeded(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedDetail);
