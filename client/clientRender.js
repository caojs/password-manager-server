import { createElement } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../share/routes';
import createStore from '../share/store.js';
import createRootElement from '../share/createRootElement.js';

const initState = typeof _INIT_STATE_ !== 'undefined' && _INIT_STATE_ || {};
const root = createRootElement(
  createStore(initState),
  createElement(Router, { history: browserHistory, routes })
);

function featuresDetect() {
  return new Promise(function(resolve) {
    if (!window.fetch) {
      require.ensure(['isomorphic-fetch'], function(require) {
        require('isomorphic-fetch');
        resolve();
      });
    }
  });
}

featuresDetect()
  .then(function() {
    render(root, document.getElementById('app'));
  });
