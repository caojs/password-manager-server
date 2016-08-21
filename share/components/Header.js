import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <div>
        <span>{this.props.username}</span>
        <a href="/logout">Log out</a>
      </div>
    )
  }
}

export default Header;
