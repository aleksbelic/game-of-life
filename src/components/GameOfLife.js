import {useState, useRef} from 'react';
import Cell from './Cell';

// default board size
const GAME_OF_LIFE_WIDTH = 10;
const GAME_OF_LIFE_HEIGHT = 10;
const AUTOPLAY_SPEED = 1000; // ms

export default function GameOfLife() {
  const [width, setWidth] = useState(GAME_OF_LIFE_WIDTH);
  const [height, setHeight] = useState(GAME_OF_LIFE_HEIGHT);
  const [cells, setCells] = useState(generateRandomCells);
  const [generationCount, setGenerationCount] = useState(1);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const nextGenBtnRef = useRef();
  const autoplayBtnRef = useRef();

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
   * Returns next generation of cells following the "Game of Life" rules.
   * @param {[boolean[]]} currentCells 2D array of living & dead cells
   * @returns {[boolean[]]} next generation of cells
   */
  function getNextGeneration(currentCells) {
    let updatedCells = [...Array(height)].map(() => Array(width).fill(null));

    currentCells.forEach((row, rowIndex) => {
      row.forEach((isAlive, columnIndex) => {
        let livingNeighboursCount = 0;

        [-1, 0, 1].forEach(neighbourRowIndex => {
          [-1, 0, 1].forEach(neighbourColumnIndex => {
            if (neighbourRowIndex === 0 && neighbourColumnIndex === 0) return;
            else if (
              currentCells[rowIndex + neighbourRowIndex] !== undefined &&
              currentCells[rowIndex + neighbourRowIndex][
                columnIndex + neighbourColumnIndex
              ] !== undefined &&
              currentCells[rowIndex + neighbourRowIndex][
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
  }

  /**
   * Generates next generation of cells and replaces the old ones based on "Game of Life" rules.
   * @returns {void}
   */
  function implementNextGeneration() {
    setGenerationCount(currentGeneration => currentGeneration + 1);
    setCells(currentCells => getNextGeneration(currentCells));
  }

  /**
   * Returns count of living cells.
   * @returns {number}
   */
  function getLivingCellCount() {
    return cells
      .map(row => row.filter(isAlive => isAlive === true).length)
      .reduce(
        (livingCellsCount, livingCellsCountInCurrentRow) =>
          livingCellsCount + livingCellsCountInCurrentRow,
        0
      );
  }

  /**
   * Handles starting & stopping of autoplay.
   * @returns {void}
   */
  function startOrStopAutoplay() {
    if (autoplayInterval === null) startAutoplay();
    else stopAutoplay();
  }

  /**
   * Processes starting-autoplay tasks.
   * @returns {void}
   */
  function startAutoplay() {
    nextGenBtnRef.current.setAttribute('disabled', 'true');
    setAutoplayInterval(setInterval(implementNextGeneration, AUTOPLAY_SPEED));
    autoplayBtnRef.current.innerHTML = '&#9724;'; // "stop" symbol
  }

  /**
   * Processes stopping-autoplay tasks.
   * @returns {void}
   */
  function stopAutoplay() {
    clearInterval(autoplayInterval);
    setAutoplayInterval(null);
    autoplayBtnRef.current.innerHTML = '&#9654;&#9654;'; // "fast-forward" symbol
    nextGenBtnRef.current.removeAttribute('disabled');
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

      <div id="stats-and-controls-container">
        <div id="stats-container">
          <label id="gen-counter">
            Generation:&nbsp;<b>{generationCount}</b>
          </label>
          <label id="living-cells-counter">
            Living cells:&nbsp;<b>{getLivingCellCount()}</b>
          </label>
        </div>

        <div id="controls-container">
          <button
            ref={nextGenBtnRef}
            id="next-gen-button"
            title="Next Generation"
            onClick={implementNextGeneration}
          >
            &#9654;
          </button>
          <button
            ref={autoplayBtnRef}
            id="autoplay-button"
            title="Autoplay"
            onClick={startOrStopAutoplay}
          >
            &#9654;&#9654;
          </button>
        </div>
      </div>
    </div>
  );
}
