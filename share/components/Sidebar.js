import React from 'react';
import Immutable from 'immutable';

class Sidebar extends React.Component {
  static defaultProps = {
    username: 'User',
    accounts: Immutable.fromJS([{
      id: '1',
      title: 'github',
      account: 'abc',
      password: 'def'
    }, {
      id: '2',
      title: 'gmail',
      account: 'def',
      password: 'defere'
    }])
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.props.username}</span>
          <a href="/logout">Log out</a>
        </div>
        <ul>
        {this.props.accounts.map(a => {
          return (
            <li key={a.get('id')}>
              <span>{a.get('title')}</span>
              <span>{a.get('account')}</span>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
