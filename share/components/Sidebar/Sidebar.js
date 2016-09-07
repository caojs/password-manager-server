import React from 'react';
import { injectProps } from '../../helpers/decorators';

class Sidebar extends React.Component {

  @injectProps
  render({ username, accounts }) {
    return (
      <div>
        <div>
          <span>{username}</span>
          <a href="/logout">Log out</a>
        </div>

        <ul>
          {accounts && accounts.map(a => {
            return (
              <li key={a.id}>
              <span>{a.title}</span>
              <span>{a.account}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
