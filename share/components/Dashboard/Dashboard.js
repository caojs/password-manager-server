import React from 'react';
import style from './Dashboard.css';

const Dashboard = ({ children, sidebar }) => {
  return (
  <div className={style.dashboard}>
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
