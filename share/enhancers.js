import { compose, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import graphqlware from './middlewares/graphqlware';

let enhancers = [
  applyMiddleware(graphqlware, reduxPromise)
];

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  enhancers.push(DevTools.instrument());
}

export default compose.apply(null, enhancers);
