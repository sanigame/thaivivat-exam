/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { MediaCard } from '../../commons';

function FeedItem({ detail }) {
  return (<MediaCard detail={detail} />);
  // return (<div>{detail.title}</div>);
}

FeedItem.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default FeedItem;
