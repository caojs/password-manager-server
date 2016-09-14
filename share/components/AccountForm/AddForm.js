import React from 'react';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import { argsify } from '../../helpers/qlHelpers';
import { addAccount } from '../../actionCreators';
import AccountForm from './AccountForm';

@reduxForm({
  form: 'accountForm',
  onSubmit: (form, dispatch, props) => {
    dispatch(addAccount(
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
