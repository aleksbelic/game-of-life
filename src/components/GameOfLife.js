import {useState} from 'react';
import Cell from './Cell';

// default board size
const GAME_OF_LIFE_WIDTH = 10;
const GAME_OF_LIFE_HEIGHT = 10;
const AUTOPLAY_SPEED = 1000; // ms

export default function GameOfLife() {
  const [width, setWidth] = useState(GAME_OF_LIFE_WIDTH);
  const [height, setHeight] = useState(GAME_OF_LIFE_HEIGHT);
  const [cells, setCells] = useState(generateRandomCells);
  const [generationCounter, setGenerationCounter] = useState(1);
  const [autoplayInterval, setAutoplayInterval] = useState(null);

  /**
   * Randomly generates 2D array of living & dead cells.
   * @returns {[boolean[]]}
   */
  function generateRandomCells() {
    let randomCells = [...Array(height)].map(() => Array(width).fill(null));
    return randomCells.map(row =>
      row.map(() => (Math.random() >= 0.5 ? true : false))
    );
  }

  /**
   * Generates next generation of cells and replaces the old ones based on "Game of Life" rules.
   * @returns {void}
   */
  function generateNextGeneration() {
    setGenerationCounter(currentGeneration => currentGeneration + 1);

    setCells(cells => {
      let updatedCells = [...Array(height)].map(() => Array(width).fill(null));

      cells.forEach((row, rowIndex) => {
        row.forEach((isAlive, columnIndex) => {
          let livingNeighboursCount = 0;

          [-1, 0, 1].forEach(neighbourRowIndex => {
            [-1, 0, 1].forEach(neighbourColumnIndex => {
              if (neighbourRowIndex === 0 && neighbourColumnIndex === 0) return;
              else if (
                cells[rowIndex + neighbourRowIndex] !== undefined &&
                cells[rowIndex + neighbourRowIndex][
                  columnIndex + neighbourColumnIndex
                ] !== undefined &&
                cells[rowIndex + neighbourRowIndex][
                  columnIndex + neighbourColumnIndex
                ] === true
              ) {
                livingNeighboursCount++;
              }
            });
          });

          // applying Game of Life rules to generate next generation cells
          if (isAlive) {
            updatedCells[rowIndex][columnIndex] =
              livingNeighboursCount < 2 || livingNeighboursCount > 3
                ? false
                : true;
          } else {
            updatedCells[rowIndex][columnIndex] =
              livingNeighboursCount === 3 ? true : false;
          }
        });
      });

      return updatedCells;
    });
  }

  /**
   * TODO
   * @returns
   */
  function runOrPauseAutoplay(e) {
    let nextGenBtn = document.getElementById('next-gen-button');
    let newAutoplayInterval = null;

    if (autoplayInterval === null) {
      nextGenBtn.setAttribute('disabled', 'true');
      newAutoplayInterval = setInterval(generateNextGeneration, AUTOPLAY_SPEED);
      e.target.innerHTML = '&#9724;'; // "stop" symbol
    } else {
      clearInterval(autoplayInterval);
      e.target.innerHTML = '&#9654;&#9654;'; // "fast-forward" symbol
      nextGenBtn.removeAttribute('disabled');
    }

    setAutoplayInterval(newAutoplayInterval);
  }

  /**
   * Chagnes clicked cell's living state: gives life to the dead cell or kills the living cell.
   * @param {string} clickedCellDataId data-ID attr used for locating cell's position (composed of cell's row & column indexes separated by underscore, e.g. "2_1" (3rd row, 2nd column).
   * @returns {void}
   */
  function updateCellsOnCellClick(clickedCellDataId) {
    let updatedCells = Array.from(cells);
    let [rowIndex, columnIndex] = clickedCellDataId.split('_');
    updatedCells[rowIndex][columnIndex] = !cells[rowIndex][columnIndex];
    setCells(updatedCells);
  }

  /**
   * Generates JSX for a row of cells.
   * @param {boolean[]} row array of cells in a row
   * @param {number} rowIndex index of the row in a grid
   * @returns {JSX}
   */
  function renderRow(row, rowIndex) {
    return (
      <div className="row" key={rowIndex}>
        {row.map((isAlive, columnIndex) =>
          renderCell(rowIndex, columnIndex, isAlive)
        )}
      </div>
    );
  }

  /**
   * Generates JSX for a single cell.
   * @param {number} rowIndex index of the row in a grid
   * @param {number} columnIndex index of the column in a grid
   * @param {boolean} isAlive if cell is alive or not
   * @returns {JSX}
   */
  function renderCell(rowIndex, columnIndex, isAlive) {
    const rowIndexColumnIndex = `${rowIndex}_${columnIndex}`;
    return (
      <Cell
        dataId={rowIndexColumnIndex}
        key={rowIndexColumnIndex}
        isAlive={isAlive}
        updateCellsOnCellClick={() =>
          updateCellsOnCellClick(rowIndexColumnIndex)
        }
      />
    );
  }

  return (
    <div id="game-of-life">
      <div id="cells-container">
        {cells.map((row, rowIndex) => renderRow(row, rowIndex))}
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
        <button
          id="autoplay-button"
          title="Autoplay"
          onClick={e => runOrPauseAutoplay(e)}
        >
          &#9654;&#9654;
        </button>
      </div>
    </div>
  );
}
