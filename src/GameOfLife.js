import React, {useState} from 'react';
import Cell from './Cell';

// default board size
const GAME_OF_LIFE_WIDTH = 20;
const GAME_OF_LIFE_HEIGHT = 20;

export default function GameOfLife(props) {
  const [width, setWidth] = useState(GAME_OF_LIFE_WIDTH);
  const [height, setHeight] = useState(GAME_OF_LIFE_HEIGHT);
  const [cells, setCells] = useState(generateRandomCells());
  const [generationCounter, setGenerationCounter] = useState(0);

  function generateRandomCells() {
    let randomCells = Array(height).fill(Array(width).fill(false));
    randomCells = randomCells.map(cellRow => {
      return cellRow.map(cellIsAlive => (Math.random() >= 0.5 ? true : false));
    });
    return randomCells;
  }

  return (
    <div id="game-of-life">
      <div id="cells-container">
        {cells.map((cellRow, rowIndex) => (
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
