import React from 'react';
import Immutable from 'immutable';
import Header from './Header';
import AccountList from './AccountList';

class Dashboard extends React.Component {
  static preLoad({ store, params }) {
    //TODO: load data
    //- username
    //- accounts
  }

  static defaultProps = {
    username: 'User',
    accounts: Immutable.fromJS([{
      id: '1',
      title: 'github',
      account: 'abc',
      password: 'def'
    }, {
      id: '2',
      title: 'gmail',
      account: 'def',
      password: 'defere'
    }])
  }

  render() {
    return(
      <div>
        <div>
          <Header username={this.props.username}/>
          <AccountList accounts={this.props.accounts}/>
        </div>
        <div>
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dashboard;
