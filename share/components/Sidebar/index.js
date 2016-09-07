import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Sidebar from './Sidebar'
import { graphPost } from '../../api';

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
      .then(json => (json.data || {}).accounts)
      .catch(err => console.log(err.stack));
    }
  }
])
@connect(
  state => ({
    username: state.getIn(['user', 'username'])
  })
)
export default class SidebarContainer extends Sidebar {}
