import React from 'react';
import PropTypes from 'prop-types';
import PermanentDrawerLeft from './PermanentDrawerLeft';

export default function Layout({ children }) {
  return (
    <PermanentDrawerLeft>
      {children}
    </PermanentDrawerLeft>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
