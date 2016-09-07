import { fromJS } from 'immutable';
import { createStore, combineReducers } from 'redux';
import enhancers from './enhancers';
import reducers from './reducers';

export default function(initialState) {
  const store = enhancers(createStore)(reducers, fromJS(initialState));

  if (module.hot) {
    module.hot.accept('./reducers',
      () => store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}
