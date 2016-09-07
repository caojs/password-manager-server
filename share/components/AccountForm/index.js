import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import { argsify } from '../../helpers/qlHelpers';
import { addAccount } from '../../actionCreators';
import AccountForm from './AccountForm';

const enhance = compose(
  reduxForm({
    form: 'accountForm',
    onSubmit: (form, dispatch) => dispatch(addAccount(
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
    )),
  }),
);

const AccountFormContainer = enhance(AccountForm);

export default AccountFormContainer;
