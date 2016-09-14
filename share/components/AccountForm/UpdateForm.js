import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import { argsify } from '../../helpers/qlHelpers';
import { updateAccount } from '../../actionCreators';
import AccountForm from './AccountForm';
import { graphPost } from '../../api';

@asyncConnect([
  {
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
  }
])
@connect(state => {
  const res = state.getIn(['reduxAsyncConnect', 'accountData']) || Immutable.Map();
  return {
    errors: res.get('errors'),
    initialValues: res.get('data', Immutable.Map())
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
