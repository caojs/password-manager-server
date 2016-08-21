import React from 'react';

class AccountList extends React.Component {
  render() {
    return (
      <div>
        {this.props.accounts.map(a => {
          return (
            <div key={a.get('id')}>
              <span>{a.get('title')}</span>
              <span>{a.get('account')}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AccountList;
