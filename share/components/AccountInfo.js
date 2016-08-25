import React from 'react';

const AccountInfo = ({ title, account, password, info }) => (
  <div>
    <div>
      <span>Title:</span>
      <span>{title}</span>
    </div>
    <div>
      <span>Account:</span>
      <span>{account}</span>
    </div>
    <div>
      <span>Password:</span>
      <span>{password}</span>
    </div>
    <div>
      <span>Info:</span>
      <span>{info}</span>
    </div>
  </div>
);

export default AccountInfo;
