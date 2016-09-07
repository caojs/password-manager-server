import { compose } from 'redux';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import Sidebar from './Sidebar'
import { graphPost } from '../../api';

const enhance = compose(
  connect(
    state => ({
      username: state.getIn(['user', 'username'])
    })
  ),
  asyncConnect([
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
);

const SidebarContainer = enhance(Sidebar);

export default SidebarContainer;
