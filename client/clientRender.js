import React, { createElement } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer } from 'react-hot-loader';

import getRoutes from '../share/routes.js';
import createStore from '../share/store.js';
import Root from '../share/Root.js';

const initState = typeof _INIT_STATE_ !== 'undefined' && _INIT_STATE_ || {};
const store = createStore(initState);
const routes = getRoutes(store);

function featuresDetect() {
  return new Promise(function(resolve) {
    if (!window.fetch) {
      require.ensure(['isomorphic-fetch'], function(require) {
        require('isomorphic-fetch');
        resolve();
      });
    }
    else {
      resolve();
    }
  });
}

function createApp(store, routes) {
  return (
    <AppContainer>
      <Root store={store}>
        <Router
          history={browserHistory}
          routes={routes}
          render={(props) => <ReduxAsyncConnect {...props}/>}/>
      </Root>
    </AppContainer>
  )
}

featuresDetect()
  .then(function() {

    render(createApp(store, routes), document.getElementById('app'));

    if (module.hot) {
      module.hot.accept([ '../share/routes.js' ], () => {
        const getRoutes = require('../share/routes.js').default;
        const newRoutes = getRoutes(store);
        render(createApp(store, newRoutes), document.getElementById('app'));
      });
    }
  });
