import React from 'react';

function Sidebar({ username, accounts }) {
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

export default Sidebar;
