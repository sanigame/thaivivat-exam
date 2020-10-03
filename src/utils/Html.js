import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import _ from 'lodash/fp';

const Html = ({ store, htmlContent, css }) => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic();
  const attrs = head.htmlAttributes.toComponent();
  const { lang, ...rest } = attrs || {};
  const assets = webpackIsomorphicTools.assets();

  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        {/* Styles will be presented in production with webpack extract text plugin */}
        {_.keys(assets.styles).map(style => (
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div
          id="react-view"
          // Rendering the route, which passed from server-side
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // Store the initial state into window
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: store && `window.__INITIAL_STATE__=${serialize(store.getState())};`,
          }}
        />
        {
          // Reverse the order of scripts for accessing vendor.js first
          _.keys(assets.javascript).reverse().map(script =>
            <script key={_.uniqueId()} src={assets.javascript[script]} />,
          )
        }
        {head.script.toComponent()}
      </body>
    </html>
  );
};

Html.propTypes = {
  store: PropTypes.shape().isRequired,
  htmlContent: PropTypes.string,
  css: PropTypes.string.isRequired,
};

Html.defaultProps = {
  htmlContent: '',
};

export default Html;
