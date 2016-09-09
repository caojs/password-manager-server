import React from 'react';
import { injectProps } from '../../helpers/decorators';

function Item({ label, value }) {
  return (
    <li>
      <span>{label}</span>
      <span>{value}</span>
    </li>
  );
}

class AccountInfo extends React.Component {

  @injectProps
  render({ errors, data }) {
    let component;

    if (errors && errors.size) {
      component = (
        <ul className="error">
          {errors.map(e => (
            <Item label="Error:" value={e.get('message')}/>
          ))}
        </ul>
      );
    }
    else {
      component = (
        <ul>
          <Item label="Title:" value={data.get('title')}/>
          <Item label="Account:" value={data.get('account')}/>
          <Item label="Password:" value={data.get('password')}/>
          <Item label="Info:" value={data.get('info')}/>
        </ul>
      );
    }

    return React.Children.only(component);
  }
}

export default AccountInfo;
