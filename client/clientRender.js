import React, { createElement } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

import routes from '../share/routes.js';
import createStore from '../share/store.js';
import Root from '../share/Root.js';

const initState = typeof _INIT_STATE_ !== 'undefined' && _INIT_STATE_ || {};
const store = createStore(initState);

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

function renderAll(store, routes) {
  const root = (
    <Root store={store}>
      <Router
        history={browserHistory}
        routes={routes}
        render={(props) => <ReduxAsyncConnect {...props}/>}/>
    </Root>
  );
  const app = document.getElementById('app');
  unmountComponentAtNode(app);
  render(root, app);

  console.group('%cApp:', 'color: orange');
  console.info('Unmount and rerender app.');
  console.warn('Store still remains.');
  console.groupEnd();
}

featuresDetect()
  .then(function() {
    renderAll(store, routes);

    if (module.hot) {
      module.hot.accept();

      // React-router doesn't accept to change routes props.
      // Everytime routes module changes, we will force full rerender.
      module.hot.accept('../share/routes.js', () => {
        renderAll(store, require('../share/routes.js').default);
      });
    }
  });
