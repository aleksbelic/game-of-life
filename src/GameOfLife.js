import React from 'react';
import Cell from './Cell';

// default board size
const GAME_OF_LIFE_WIDTH = 20;
const GAME_OF_LIFE_HEIGHT = 20;

export default class GameOfLife extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: GAME_OF_LIFE_WIDTH,
      height: GAME_OF_LIFE_HEIGHT,
      cells: [],
      genCounter: 0,
    };
  }

  componentDidMount() {
    this.generateRandomCells();
  }

  generateRandomCells() {
    let newGen = Array(this.state.height).fill(
      Array(this.state.width).fill(false)
    );
    newGen = newGen.map(cellRow => {
      return cellRow.map(cellIsAlive => (Math.random() >= 0.5 ? true : false));
    });
    this.setState({cells: newGen});
  }

  render() {
    return (
      <div id="game-of-life">
        <div id="cells-container">
          {this.state.cells.map((cellRow, rowIndex) => (
            <div className="row">
              {cellRow.map((cellIsAlive, columnIndex) => (
                <Cell
                  key={`c_${rowIndex}_${columnIndex}`}
                  isAlive={cellIsAlive}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
