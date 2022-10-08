import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {alive: false};
  }

  cellClicked = () => {
    this.setState({alive: !this.state.alive});
  };

  render() {
    return (
      <span
        className={`cell${this.state.alive ? ' alive' : ''}`}
        onClick={this.cellClicked}
      ></span>
    );
  }
}
