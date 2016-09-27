import React from 'react';

const Dashboard = ({ children, sidebar }) => {
  return (
  <div>
    {sidebar}
    {children}
  </div>
)
};

Dashboard.onEnter = (nextState, replace, { getState }) => {
  const user = getState().getIn(['user', 'data']);
  if (!user || !user.size) {
    replace('/login');
  }
};

export default Dashboard;
