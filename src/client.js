import React from 'react';
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import RedBox from 'redbox-react';
import { JssProvider } from 'react-jss';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import configureStore from './redux/store';
import theme from './theme';

// Get initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);
const mountNode = document.getElementById('react-view');

const renderApp = () => {
  const App = require('./App').default;

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  hydrate(
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <AppContainer errorReporter={({ error }) => <RedBox error={error} />}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </Provider>
        </AppContainer>
      </MuiThemeProvider>
    </JssProvider>,
    mountNode,
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      hydrate(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('./App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);
      reRenderApp();
    });
  });
}

renderApp();
