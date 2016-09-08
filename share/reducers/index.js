import Immutable, { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import {
  setToImmutableStateFunc,
  setToMutableStateFunc,
  immutableReducer as reduxAsyncConnect
} from 'redux-connect';

setToImmutableStateFunc((mutableState) => fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

const {
  LOGIN,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT
} = require('../actionCreators/constants');

function reducers(state, action) {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case LOGIN:
      const {
        data: { user } = {},
        errors
      } = payload;

      if (errors) { console.log(errors); return state; }
      return state.set('user', fromJS(user));

    case ADD_ACCOUNT: {
      const {
        data: { upsertAccount } = {},
        errors
      } = payload;

      state = state.updateIn(
        ['reduxAsyncConnect', 'accounts'],
        l => {
          if (errors) l = l.set('errors', errors);
          if (upsertAccount) l = l.update('data', data => data.push(upsertAccount));
          return l;
        }
      );

      return state;
    }

    case UPDATE_ACCOUNT: {
      const {
        data: { upsertAccount } = {},
        errors
      } = payload;

      state = state.updateIn(
        ['reduxAsyncConnect', 'accounts'],
        l => {
          if (errors) l = l.set('errors', errors);
          if (upsertAccount) {
            const index = l
              .get('data', [])
              .findIndex(a => a.get('id') === upsertAccount.id);
            l = l.setIn(['data', index], upsertAccount);
          }
          return l;
        }
      );

      return state;
    }


    default:
      return state;
  }
}

function enhanceReducers(reducers) {
  return (state, action) => {
    const reduxConnectState = state.get('reduxAsyncConnect');
    const reduxForm = state.get('form');
    state = state.set('reduxAsyncConnect', reduxAsyncConnect(reduxConnectState, action));
    state = state.set('form', formReducer(reduxForm, action));
    return reducers(state, action);
  };
}

export default enhanceReducers(reducers);
