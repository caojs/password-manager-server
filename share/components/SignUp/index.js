import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import SignUp from './SignUp';
import { post } from '../../api';

const enhance = compose(
  connect(state => ({
    error: state.getIn(['flash', 'error'], Immutable.List())
  })),
  reduxForm({
    form: 'signup',
    onSubmit: (form, dispatch) => post('/signup', form.toJS()).then(dispatch)
  })
);

const SignUpContainer = enhance(SignUp);

export default SignUpContainer;
