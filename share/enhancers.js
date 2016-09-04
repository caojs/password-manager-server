import { compose, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

let enhancers = [
  applyMiddleware(reduxPromise)
];

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./components/DevTools.js').default;
  const actionConstants = require('./actionCreators/constants');

  const checkActionType = (createStore) => (reducer, initialState, enhancer) => {
    const stringActionTypes = Object
      .keys(actionConstants)
      .map(k => actionConstants[k]);

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
