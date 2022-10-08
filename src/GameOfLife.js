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
      cells: [
        Array(GAME_OF_LIFE_HEIGHT).fill(Array(GAME_OF_LIFE_WIDTH).fill(null)),
      ],
      genCounter: 0,
    };
  }

  generateCells() {}

  render() {
    return (
      <div id="game-of-life">
        <div id="cells-container">
          {[...Array(this.state.height)].map((v, hi) => (
            <div className="row">
              {[...Array(this.state.width)].map((v, wi) => (
                <Cell key={`${hi}-${wi}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
