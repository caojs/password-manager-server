import React from 'react';

const Dashboard = ({ sidebar, main }) => (
  <div>
    {sidebar}
    {main}
  </div>
);

Dashboard.onEnter = (nextState, replace, { getState }) => {
  const user = getState().get('user');
  if (!user) {
    replace('/login');
  }
};

export default Dashboard;
