import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import redirectTo from '../redirectTo';
import SignUp from './SignUp';
import { post } from '../../api';

@connect(state => ({
  user: state.get('user')
}))
@redirectTo('/', ({ user }) => user && user.size)
@reduxForm({
  form: 'signup',
  onSubmit: (form, dispatch) => post('/signup', form.toJS()).then(dispatch)
})
export default class SignUpContainer extends SignUp {}
