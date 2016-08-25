import React from 'react';
import Immutable from 'immutable';

const Sidebar = ({ username, accounts }) => (
  <div>
    <div>
      <span>{username}</span>
      <a href="/logout">Log out</a>
    </div>
    <ul>
    {accounts.map(a => {
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

Sidebar.defaultProps = {
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
};

export default Sidebar;
