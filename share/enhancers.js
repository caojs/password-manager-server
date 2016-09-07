import { compose, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import fromServer from './middlewares/fromServer';

let enhancers = [
  applyMiddleware(fromServer, reduxPromise)
];

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;

  const checkActionType = (createStore) => (reducer, initialState, enhancer) => {
    return createStore((state, action) => {
      const type = typeof action === 'string' ?
        action :
        action.type;

      if (!type) {
        throw new Error('There is a typo in action type name.');
      }

      return reducer(state, action);
    }, initialState, enhancer);
  };

  enhancers.push(checkActionType, DevTools.instrument());
}

export default compose.apply(null, enhancers);
