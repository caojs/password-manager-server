import React from 'react';

const randomPassword = (length) => {
  let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  let pass = "";
  for (let x = 0; x < length; x++) {
      let i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  }
  return pass;
};

class PasswordGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.randomPassword = this.randomPassword.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  render() {
    const { pass } = this.state;

    return (
      <div>
        <span>{pass}</span>
        <button onClick={this.randomPassword}>Generate</button>
        <button onClick={this.onCopy}>Copy</button>
      </div>
    )
  }

  randomPassword() {
    return this.setState({ pass: randomPassword(15) });
  }

  onCopy() {
    return this.props.onCopy(this.state.pass);
  }
}

PasswordGenerator.propTypes = {
  onCopy: React.PropTypes.func.isRequired
};

export default PasswordGenerator;
