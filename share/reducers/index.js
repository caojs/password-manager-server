import Immutable from 'immutable';
import { ADD_ACCOUNT_LIST } from '../actionCreators/constants';

export default (state, action) => {
  const {
    type,
    payload,
    error
  } = action;

  switch (type) {
    case ADD_ACCOUNT_LIST:
      if (error) { return state; }
      const account = payload.account;
      return state.updateIn(
        ['reduxAsyncConnect', 'accounts'],
        l => l.push(Immutable.Map(account))
      );

    default:
      return state;
  }
};
