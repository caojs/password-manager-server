import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Immutable from 'immutable';

import Sidebar from './Sidebar'
import { graphPost } from '../../api';
import { deleteAccounts } from '../../actionCreators';
import { argsify } from '../../helpers/qlHelpers';

@asyncConnect([
  {
    key: 'accounts',
    promise: (props) => {
      return graphPost(`
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
  }
])
@connect(
  state => ({
    username: state.getIn(['user', 'data', 'username']),
    accounts: state.getIn(['reduxAsyncConnect', 'accounts'], Immutable.Map())
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
