import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../share/routes';
import createRootElement from '../share/createRootElement.js';

const initState = typeof _INIT_STATE_ !== 'undefined' && _INIT_STATE_ || {};
const root = createRootElement(
  initState,
  <Router history={browserHistory} routes={routes}/>
);
ReactDOM.render(root, document.getElementById('app'));
