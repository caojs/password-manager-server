import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import SignUp from './SignUp';
import { post } from '../../api';

@reduxForm({
  form: 'signup',
  onSubmit: (form, dispatch) => post('/signup', form.toJS()).then(dispatch)
})
@connect(state => ({
  error: state.getIn(['flash', 'error'], Immutable.List())
}))
export default class SignUpContainer extends SignUp {}
