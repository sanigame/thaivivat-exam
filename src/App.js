import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import Layout from './layout';

import config from './config';
import routes from './routes';

const App = () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <Layout>
        <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
      </Layout>
    </div>
  );
};

export default App;
