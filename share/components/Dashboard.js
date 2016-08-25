import React from 'react';

const Dashboard = ({ sidebar, main }) => (
  <div>
    {sidebar}
    {main}
  </div>
);

Dashboard.onEnter = (nextState, replace, store) => {
  const user = store.getState().get('user');
  if (!user) {
    replace('/login');
  }
};

export default Dashboard;
