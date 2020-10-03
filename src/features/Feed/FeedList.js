/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import CircularProgress from '@material-ui/core/CircularProgress';

import FeedItem from './FeedItem';

class FeedList extends Component {
  static propTypes = {
    list: PropTypes.object,
    nextPage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    list: {
      value: [],
    },
  }

  renderList = () => {
    const { error, value } = this.props.list;

    return (
      <div>
        {error ? error.message : null}
        {value ?
          value.map(feed => (
            <FeedItem key={feed.data.id} detail={feed.data} />
          )) : null
        }
      </div>
    );
  }

  renderWaypoint = () => {
    const { value } = this.props.list;
    if (value && value.length > 0) {
      return (
        <Waypoint
          onEnter={() => this.props.nextPage()}
        />
      );
    }
    return null;
  }

  render() {
    const { isFetching } = this.props.list;
    return (
      <div>
        {this.renderList()}
        {this.renderWaypoint()}
        { isFetching ? <CircularProgress style={{ display: 'block', margin: 'auto' }} color="secondary" /> : ''}
      </div>
    );
  }
}

export default FeedList;
