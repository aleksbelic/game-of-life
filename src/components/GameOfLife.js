import {useState} from 'react';
import Cell from './Cell';

// default board size
const GAME_OF_LIFE_WIDTH = 10;
const GAME_OF_LIFE_HEIGHT = 10;

export default function GameOfLife() {
  const [width, setWidth] = useState(GAME_OF_LIFE_WIDTH);
  const [height, setHeight] = useState(GAME_OF_LIFE_HEIGHT);
  const [cells, setCells] = useState(generateRandomCells());
  const [generationCounter, setGenerationCounter] = useState(1);

  /**
   * Randomly generates 2D array of living & dead cells.
   * @returns {Array(Array(boolean))}
   */
  function generateRandomCells() {
    let randomCells = Array(height).fill(Array(width).fill(null));
    randomCells = randomCells.map(cellRow => {
      return cellRow.map(cellIsAlive => (Math.random() >= 0.5 ? true : false));
    });
    return randomCells;
  }

  /**
   * TODO
   * @returns {void}
   */
  function generateNextGeneration() {
    let updatedCells = Array(height).fill(Array(width).fill(null));

    cells.forEach((cellRow, currentCellRowIndex) => {
      cellRow.forEach((cell, currentCellColumnIndex) => {
        let aliveNeighboursCount = 0;

        [-1, 0, 1].forEach(neighbourCellRowIndex => {
          [-1, 0, 1].forEach(neighbourCellColumnIndex => {
            if (
              cells[currentCellRowIndex + neighbourCellRowIndex] !==
                undefined &&
              cells[currentCellRowIndex + neighbourCellRowIndex][
                currentCellColumnIndex + neighbourCellColumnIndex
              ] !== undefined &&
              cells[currentCellRowIndex + neighbourCellRowIndex][
                currentCellColumnIndex + neighbourCellColumnIndex
              ] === true
            )
              aliveNeighboursCount++;
          });
        });

        // applying Game of Life rules to generate next generation cells
        if (cell === true) {
          updatedCells[currentCellRowIndex][currentCellColumnIndex] =
            aliveNeighboursCount < 2 || aliveNeighboursCount > 3 ? false : true;
        } else {
          updatedCells[currentCellRowIndex][currentCellColumnIndex] =
            aliveNeighboursCount === 3 ? true : false;
        }
      });
    });
    setCells(updatedCells);
    setGenerationCounter(currentGenCount => currentGenCount + 1);
  }

  /**
   * TODO
   * @param {string} clickedCellDataId
   * @returns {void}
   */
  function updateCellsOnCellClick(clickedCellDataId) {
    let updatedCells = Array.from(cells);
    let [rowIndex, columnIndex] = clickedCellDataId.split('_');
    updatedCells[rowIndex][columnIndex] = !cells[rowIndex][columnIndex];
    setCells(updatedCells);
  }

  return (
    <div id="game-of-life">
      <div id="cell-container">
        {cells.map((cellRow, rowIndex) => (
          <div className="row" key={`cell_row_${rowIndex}`}>
            {cellRow.map((cellIsAlive, columnIndex) => (
              <Cell
                dataId={`${rowIndex}_${columnIndex}`}
                key={`${rowIndex}_${columnIndex}`}
                isAlive={cellIsAlive}
                updateCellsOnCellClick={updateCellsOnCellClick}
              />
            ))}
          </div>
        ))}
      </div>
      <label id="gen-counter">Generation:&nbsp;{generationCounter}</label>
      <div id="controls-container">
        <button
          id="next-gen-button"
          title="Next Generation"
          onClick={generateNextGeneration}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}
