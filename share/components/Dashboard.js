import React from 'react';

class Dashboard extends React.Component {
  render() {
    let {
      sidebar,
      main
    } = this.props;

    return(
      <div>
        {sidebar}
        {main}
      </div>
    );
  }
}

export default Dashboard;
