import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAlive: props.isAlive};
  }

  cellClicked = () => {
    this.setState({isAlive: !this.state.isAlive});
  };

  render() {
    return (
      <span
        className={`cell${this.state.isAlive ? ' alive' : ''}`}
        onClick={this.cellClicked}
      ></span>
    );
  }
}
