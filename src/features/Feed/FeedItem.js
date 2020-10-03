/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function FeedItem({ detail }) {
  return (
    <div>
      {detail.title}
    </div>
  );
}

FeedItem.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default FeedItem;
