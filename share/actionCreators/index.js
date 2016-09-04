import createAction from 'redux-actions/lib/createAction';
import {
  SIGNUP,
  LOGIN,
  ADD_ACCOUNT_LIST
} from './constants';

function post(url, data) {
  return fetch('http://localhost:3000' + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(res => res.json())
  .catch(err => ({ errors: [err] }));
}

function graphFetch(query) {
  return post('/graphql', { query });
}

export const signup = createAction(SIGNUP, data => post('/signup', data));
export const login = createAction(LOGIN, data => post('/login', data));
export const addAccount = createAction(ADD_ACCOUNT_LIST, query => graphFetch(query));
