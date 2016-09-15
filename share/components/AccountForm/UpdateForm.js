import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import AccountForm from './AccountForm';
import redirectTo from '../redirectTo';
import { argsify } from '../../helpers/qlHelpers';
import { updateAccount } from '../../actionCreators';
import { graphPost } from '../../api';

@asyncConnect(
  [{
    key: 'accountData',
    promise: ({ params }) => {
      const { id } = params || {};

      return graphPost(`
        {
          account(${argsify({ id })}) {
            id,
            title,
            info,
            account,
            password
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
  }],
  state => {
    const accountData = state.getIn(['reduxAsyncConnect', 'accountData']) || Immutable.Map();
    return {
      accounts: state.getIn(['reduxAsyncConnect', 'accounts', 'data'], Immutable.List()),
      errors: accountData.get('errors'),
      initialValues: accountData.get('data', Immutable.Map())
    }
  }
)
@redirectTo('/', (newProps, oldProps) => {
  const {
    params: { id } = {},
    accounts,
  } = newProps;

  if (!Immutable.is(accounts, oldProps.accounts)) {
    const index = accounts.findIndex(a => a.get('id') === id);
    return index < 0;
  }
})
@reduxForm({
  form: 'accountForm',
  enableReinitialize: true,
  onSubmit: (form, dispatch, props) => {
    const {
      params: { id } = {}
    } = props;

    dispatch(updateAccount(
      `mutation {
        upsertAccount(${argsify(form.toJS())}) {
          id,
          title,
          account,
          password,
          info,
          userId
        }
      }`
    ));
  },
})
export default class AccountFormContainer extends AccountForm {}
