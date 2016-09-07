import createAction from 'redux-actions/lib/createAction';
import { post, graphPost } from '../api';

const {
  ACTION_FROM_SERVER,
  SIGNUP,
  LOGIN,
  ADD_ACCOUNT_LIST
} = require('./constants');

export const fromServer = createAction(ACTION_FROM_SERVER, null, (payload, meta) => meta);
export const signup = createAction(SIGNUP, data => post('/signup', data));
export const login = createAction(LOGIN, data => post('/login', data));
export const addAccount = createAction(ADD_ACCOUNT_LIST, query => graphPost(query));
