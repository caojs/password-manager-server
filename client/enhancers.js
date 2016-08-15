import { compose } from 'redux';

let enhancers;
if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  enhancers = compose(DevTools.instrument());
}
else {
  enhancers = compose();
}

export default enhancers;
