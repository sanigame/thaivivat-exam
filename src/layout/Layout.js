import React from 'react';
import PropTypes from 'prop-types';
// import PermanentDrawerLeft from './PermanentDrawerLeft';
import ResponsiveDrawer from './ResponsiveDrawer';

export default function Layout({ children }) {
  return (
    <ResponsiveDrawer>
      {children}
    </ResponsiveDrawer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
