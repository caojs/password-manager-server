import createAction from 'redux-actions/lib/createAction';
import {
  GRAPHQL,
  ADD_ACCOUNT_LIST
} from './constants';

export const addAccount = createAction(GRAPHQL, null, () => ADD_ACCOUNT_LIST);
