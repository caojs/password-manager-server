import React, { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../share/routes.js';
import createStore from '../share/store.js';
import Root from '../share/Root.js';
import reducers from '../share/reducers.js';

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

function renderAll(key) {
  const root = (
    <Root store={store}>
      <Router
        history={browserHistory}
        key={key}
        routes={routes}/>
    </Root>
  )
  render(root, document.getElementById('app'));
}

featuresDetect()
  .then(function() {
    renderAll(0);
    if (module.hot) {
      module.hot.accept(() => renderAll(Math.random()));
    }
  });
