import React from 'react';
import { injectProps } from '../../helpers/decorators';

class Sidebar extends React.Component {

  @injectProps
  render({ username, accounts }) {
    const {
      data,
      errors
    } = accounts;

    return (
      <div>
        <div>
          <span>{username}</span>
          <a href="/logout">Log out</a>
        </div>

        <ul>
          {errors && errors.map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>

        <ul>
          {data && data.map(a => (
            <li key={a.id}>
              <span>{a.title}</span>
              <span>{a.account}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
