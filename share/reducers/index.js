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
  SIGNUP,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNTS
} = require('../actionCreators/constants');

function reducers(state, action) {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case LOGIN:
    case SIGNUP:
      const {
        data: { user } = {},
        errors
      } = payload;
      if (user) payload.data = user;
      return state.set('user', fromJS(payload));

    case ADD_ACCOUNT: {
      const {
        data: { upsertAccount } = {},
        errors
      } = payload;

      state = state.updateIn(
        ['reduxAsyncConnect', 'accounts'],
        l => {
          if (errors) l = l.set('errors', fromJS(errors));
          if (upsertAccount) l = l.update('data', data => data.push(fromJS(upsertAccount)));
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
          if (errors) l = l.set('errors', fromJS(errors));
          if (upsertAccount) {
            const index = l
              .get('data', [])
              .findIndex(a => a.get('id') === upsertAccount.id);
            l = l.setIn(['data', index], fromJS(upsertAccount));
          }
          return l;
        }
      );

      return state;
    }

    case DELETE_ACCOUNTS: {
      const {
        data = {}
      } = payload;

      const accountDataPath = ['reduxAsyncConnect', 'accounts', 'data'];
      let deleteAccounts = (data.deleteAccounts || [])
        .map(a => +a.id);

      const accounts = state
        .getIn(accountDataPath, Immutable.Map())
        .filter(a => !~deleteAccounts.indexOf(+a.get('id')));

      state = state.setIn(accountDataPath, accounts);

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
