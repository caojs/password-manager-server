import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Immutable from 'immutable';

import Sidebar from './Sidebar'
import { graphPost } from '../../api';
import { deleteAccounts } from '../../actionCreators';
import { argsify } from '../../helpers/qlHelpers';

@asyncConnect(
  [{
    key: 'accounts',
    promise: ({ store: { getState }}) => {
      const state = getState();
      const accountsLoadState = state.getIn(['reduxAsyncConnect', 'loadState', 'accounts'], Immutable.Map());
      return accountsLoadState.get('loaded') ?
        state.getIn(['reduxAsyncConnect', 'accounts']) :
        graphPost(`
          {
            accounts {
              id,
              title,
              info,
              account,
              password
            }
          }`
        )
        .then(json => {
          const { data } = json;
          if (data) json.data = data.accounts;
          return json;
        });
    }
  }],
  state => ({
    username: state.getIn(['user', 'data', 'username'])
  }),
  (dispatch) => ({
    deleteAccounts: (ids) => dispatch(deleteAccounts(`
      mutation {
        deleteAccounts(${argsify({ ids })}) {
          id
        }
      }
    `))
  })
)
export default class SidebarContainer extends Sidebar {}
