import {useState, useRef, useEffect, useCallback} from 'react';
import Cell from './Cell';

const GRID_WIDTH = 30;
const GRID_HEIGHT = 15;
const AUTOPLAY_SPEED = 100; // ms

export default function GameOfLife() {
  const [cells, setCells] = useState(generateRandomCells);
  const [generationCount, setGenerationCount] = useState(1);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  // controls
  const nextGenBtnRef = useRef();
  const autoplayBtnRef = useRef();
  const reloadBtnRef = useRef();

  /**
   * Randomly generates 2D array of living & dead cells.
   * @returns {[boolean[]]}
   */
  function generateRandomCells() {
    let randomCells = [...Array(GRID_HEIGHT)].map(() =>
      Array(GRID_WIDTH).fill(null)
    );
    return randomCells.map(row =>
      row.map(() => (Math.random() >= 0.5 ? true : false))
    );
  }

  /**
   * Returns count of living cells.
   * @returns {number}
   */
  const getLivingCellCount = useCallback(() => {
    return cells
      .map(row => row.filter(isAlive => isAlive === true).length)
      .reduce(
        (livingCellsCount, livingCellsCountInCurrentRow) =>
          livingCellsCount + livingCellsCountInCurrentRow,
        0
      );
  }, [cells]);

  /**
   * Processes stopping-autoplay tasks.
   * @returns {void}
   */
  const stopAutoplay = useCallback(() => {
    clearInterval(autoplayInterval);
    setAutoplayInterval(null);
    autoplayBtnRef.current.innerHTML = '&#9654;&#9654;'; // "fast-forward" symbol
    nextGenBtnRef.current.removeAttribute('disabled');
  }, [autoplayInterval]);

  useEffect(() => {
    if (getLivingCellCount() === 0) {
      stopAutoplay();
      nextGenBtnRef.current.setAttribute('disabled', 'true');
      autoplayBtnRef.current.setAttribute('disabled', 'true');
    }
  }, [getLivingCellCount, stopAutoplay]);

  /**
   * Returns next generation of cells following the "Game of Life" rules.
   * @param {[boolean[]]} currentCells 2D array of living & dead cells
   * @returns {[boolean[]]} next generation of cells
   */
  const getNextGeneration = currentCells => {
    let updatedCells = [...Array(GRID_HEIGHT)].map(() =>
      Array(GRID_WIDTH).fill(null)
    );

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
  };

  /**
   * Generates next generation of cells and replaces the old ones based on "Game of Life" rules.
   * @returns {void}
   */
  const implementNextGeneration = () => {
    setGenerationCount(currentGeneration => currentGeneration + 1);
    setCells(currentCells => getNextGeneration(currentCells));
  };

  /**
   * Processes starting-autoplay tasks.
   * @returns {void}
   */
  const startAutoplay = () => {
    nextGenBtnRef.current.setAttribute('disabled', 'true');
    setAutoplayInterval(setInterval(implementNextGeneration, AUTOPLAY_SPEED));
    autoplayBtnRef.current.innerHTML = '&#9724;'; // "stop" symbol
  };

  /**
   * Chagnes clicked cell's living state: gives life to the dead cell or kills the living cell.
   * @param {string} clickedCellKey unique key used for locating cell's position (composed of cell's row & column indexes separated by underscore, e.g. "2_1" (3rd row, 2nd column)
   * @returns {void}
   */
  const updateCellsOnCellClick = clickedCellKey => {
    let updatedCells = Array.from(cells);
    let [rowIndex, columnIndex] = clickedCellKey.split('_');
    updatedCells[rowIndex][columnIndex] = !cells[rowIndex][columnIndex];
    setCells(updatedCells);
  };

  /**
   * Generates JSX for a row of cells.
   * @param {boolean[]} row array of cells in a row
   * @param {number} rowIndex index of the row in a grid
   * @returns {JSX}
   */
  const renderRow = (row, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {row.map((isAlive, columnIndex) =>
          renderCell(rowIndex, columnIndex, isAlive)
        )}
      </div>
    );
  };

  /**
   * Generates JSX for a single cell.
   * @param {number} rowIndex index of the row in a grid
   * @param {number} columnIndex index of the column in a grid
   * @param {boolean} isAlive if cell is alive or not
   * @returns {JSX}
   */
  const renderCell = (rowIndex, columnIndex, isAlive) => {
    const rowIndexColumnIndex = `${rowIndex}_${columnIndex}`;
    return (
      <Cell
        key={rowIndexColumnIndex}
        isAlive={isAlive}
        updateCellsOnCellClick={() =>
          updateCellsOnCellClick(rowIndexColumnIndex)
        }
      />
    );
  };

  return (
    <div id="game-of-life">
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
            onClick={() => {
              if (autoplayInterval === null) startAutoplay();
              else stopAutoplay();
            }}
          >
            &#9654;&#9654;
          </button>
          <button
            ref={reloadBtnRef}
            id="reload-button"
            title="Reload"
            onClick={() => {
              setGenerationCount(1);
              setCells(generateRandomCells());
              nextGenBtnRef.current.removeAttribute('disabled');
              autoplayBtnRef.current.removeAttribute('disabled');
            }}
          >
            &#8635;
          </button>
        </div>
      </div>

      <div id="cells-container">
        {cells.map((row, rowIndex) => renderRow(row, rowIndex))}
      </div>
    </div>
  );
}
