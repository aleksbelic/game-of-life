const GRID_WIDTH = 100; // cells
const GRID_HEIGHT = 80; // cells
const AUTOPLAY_INTERVAL = 100; // ms

export class GolGrid {
  #width;
  #height;
  #container;
  #population = {
    generation: 0,
    neighbourhood: [], // living neighbours layout
    layout: [],
  };

  constructor(gridWidth = GRID_WIDTH, gridHeight = GRID_HEIGHT) {
    this.#width = gridWidth;
    this.#height = gridHeight;
  }

  append(container) {
    this.#container = container;

    const golGridElem = document.createElement('table');
    golGridElem.setAttribute('id', 'golGrid');

    for (let i = 0; i < this.#height; i++) {
      let gridRow = document.createElement('tr');
      for (let j = 0; j < this.#width; j++) {
        let gridCell = document.createElement('td');
        gridCell.classList.add('cell');
        gridRow.appendChild(gridCell);
      }
      golGridElem.appendChild(gridRow);
    }
    this.#container.appendChild(golGridElem);
  }

  /*
  generateRandomPopulationLayout() {
    for (let i = 0; i < this.#height; i++) {
      this.#population.neighbourhood.push([]);
      this.#population.layout.push([]);
      for (let j = 0; j < this.#width; j++) {
        this.#population.layout[i].push(getRandomNumberBetweenZeroAndN(2)); // 0 or 1 == dead or alive
      }
    }
    population.generation++;
  }
  */
}
