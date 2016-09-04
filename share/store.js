import { fromJS } from 'immutable';
import { createStore, combineReducers } from 'redux';
import {
  reducer as formReducer
} from 'redux-form/immutable';
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
    const reduxForm = state.get('form');
    state = state.set('reduxAsyncConnect', reduxAsyncConnect(reduxConnectState, action));
    state = state.set('form', formReducer(reduxForm, action));
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
