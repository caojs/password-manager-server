import { createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect';

import enhancers from './enhancers';
import reducers from './reducers';

setToImmutableStateFunc((mutableState) => fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

const reducersCreator = (reducers) => {
  return (state, action) => {
    const reduxConnectState = state.get('reduxAsyncConnect');
    state = state.set('reduxAsyncConnect', reduxAsyncConnect(reduxConnectState, action));
    state = reducers(state, action);
    return state;
  };
};

export default function(initialState) {
  const store = enhancers(createStore)(reducersCreator(reducers), fromJS(initialState));

  if (module.hot) {
    module.hot.accept('./reducers',
      () => store.replaceReducer(reducersCreator(require('./reducers').default))
    );
  }

  return store;
}
