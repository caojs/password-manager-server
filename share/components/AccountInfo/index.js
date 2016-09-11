import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Immutable from 'immutable';

import AccountInfo from './AccountInfo';
import { argsify } from '../../helpers/qlHelpers';
import { graphPost } from '../../api';

@asyncConnect([{
  key: 'accountData',
  promise: ({ params, router }) => {
    const { id } = params || {};

    if (!id) {
      throw new Error(`This should not happen.`);
    }

    return graphPost(`
      {
        account(${argsify({ id })}) {
          id,
          account,
          password,
          title,
          info
        }
      }
    `)
    .then(json => {
      const {
        data,
        errors
      } = json;

      if (data) json.data = data.account;
      return json;
    });
  }
}])
@connect(state => {
  const data = state.getIn(['reduxAsyncConnect', 'accountData']) ||
    Immutable.Map();

  return {
    ...data.toObject()
  };
})
export default class AccountInfoContainer extends AccountInfo {}
