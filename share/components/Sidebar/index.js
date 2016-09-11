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
      .then(json => {
        const { data, errors } = json;
        return errors ?
          { errors } :
          { data: data.accounts };
      });
    }
  }
])
@connect(
  state => ({
    username: state.getIn(['user', 'data', 'username'])
  })
)
export default class SidebarContainer extends Sidebar {}
