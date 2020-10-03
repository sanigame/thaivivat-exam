/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedItem from './FeedItem';

class FeedList extends Component {
  static propTypes = {
    list: PropTypes.object,
    // nextPage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    list: {
      value: [],
    },
  }

  renderList = () => {
    const { isFetching, value } = this.props.list;

    return (
      <div>
        {
          isFetching ?
            <div>loading</div> :
            value.map(feed => (
              <FeedItem key={feed.data.id} detail={feed.data} />
            ))
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

export default FeedList;
