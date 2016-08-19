import { compose } from 'redux';

let enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  enhancers.push(DevTools.instrument());
}

export default compose.apply(null, enhancers);
