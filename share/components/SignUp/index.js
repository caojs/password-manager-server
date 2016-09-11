import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import Immutable from 'immutable';

import redirectTo from '../redirectTo';
import SignUp from './SignUp';
import { post } from '../../api';

@connect(state => {
  const user = state.get('user') || Immutable.Map();
  return {
    userData: user.get('data'),
    errors: user.get('errors')
  };
})
@redirectTo('/', ({ userData }) => userData && userData.size)
@reduxForm({
  form: 'signup',
  onSubmit: (form, dispatch) => post('/signup', form.toJS()).then(dispatch)
})
export default class SignUpContainer extends SignUp {}
