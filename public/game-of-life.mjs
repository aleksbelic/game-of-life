const GRID_WIDTH = 100; // cells
const GRID_HEIGHT = 80; // cells
const AUTOPLAY_INTERVAL = 100; // ms

/**
 * Appends Game of Life grid to specified document element.
 * @param {number} gridWidth - number of cells per row
 * @param {number} gridHeight - number of cells per column
 */
export function createGrid(
  gameContainerElem,
  gridWidth = GRID_WIDTH,
  gridHeight = GRID_HEIGHT
) {
  const golGrid = document.createElement('table');
  golGrid.setAttribute('id', 'golGrid');

  for (let i = 0; i < gridHeight; i++) {
    const gridRow = document.createElement('tr');
    for (let j = 0; j < gridWidth; j++) {
      let gridCell = document.createElement('td');
      gridCell.classList.add('cell');
      gridRow.appendChild(gridCell);
    }
    golGrid.appendChild(gridRow);
  }
  gameContainerElem.appendChild(golGrid);
}
