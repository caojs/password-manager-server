import React from 'react';

const Dashboard = ({ sidebar, main }) => (
  <div>
    {sidebar}
    {main}
  </div>
);

Dashboard.onEnter = (nextState, replace, { getState }) => {
  const user = getState().getIn(['user', 'data']);
  if (!user || !user.size) {
    replace('/login');
  }
};

export default Dashboard;
