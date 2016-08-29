import React from 'react';
import { asyncConnect } from 'redux-connect';
import Immutable from 'immutable';

const Sidebar = ({ username, accounts }) => (
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

export default asyncConnect([
  {
    //TODO: need consider because of the duplication of data.
    key: 'username',
    promise: ({ store: { getState }}) => getState().getIn(['user', 'username'])
  },
  {
    key: 'accounts',
    promise: (props) => {
      return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            {
              accounts {
                id,
                title,
                info,
                account,
                password
              }
            }`
        }),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors) throw new Error(json.errors);
        return json.data.accounts;
      })
      .catch(err => console.log(err.stack));
    }
  }
])
(Sidebar);
