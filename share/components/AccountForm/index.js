import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import { argsify } from '../../helpers/qlHelpers';
import { addAccount, updateAccount } from '../../actionCreators';
import AccountForm from './AccountForm';
import { graphPost } from '../../api';

@asyncConnect([
  {
    key: 'accountForm',
    promise: ({ params }) => {
      const { id } = params || {};

      if (!id) return;

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
        const { data, errors } = json;
        return data ?
          { data: data.account } :
          { errors };
      });
    }
  }
])
@connect(state => ({
  initialValues: state.getIn(['reduxAsyncConnect', 'accountForm', 'data'], Immutable.Map())
}))
@reduxForm({
  form: 'accountForm',
  onSubmit: (form, dispatch, props) => {
    const {
      params: { id } = {}
    } = props;

    const actCreator = id ?
      updateAccount :
      addAccount;

    dispatch(actCreator(
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
