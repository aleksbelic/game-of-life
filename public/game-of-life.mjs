const GRID_WIDTH = 100; // cells
const GRID_HEIGHT = 80; // cells
const AUTOPLAY_INTERVAL = 100; // ms

export class Gol {
  #autoplayIntervalObj;
  #elem;
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
    this.#generateRandomPopulation();
  }

  append(container) {
    this.#container = container;

    this.#elem = document.createElement('table');
    this.#elem.setAttribute('id', 'gol');

    for (let i = 0; i < this.#height; i++) {
      let gridRow = document.createElement('tr');
      for (let j = 0; j < this.#width; j++) {
        let gridCell = document.createElement('td');
        gridCell.classList.add('cell');
        gridRow.appendChild(gridCell);
      }
      this.#elem.appendChild(gridRow);
    }
    this.#container.appendChild(this.#elem);

    this.#populateGrid();
    this.#appendControls();
  }

  #generateRandomPopulation() {
    for (let i = 0; i < this.#height; i++) {
      this.#population.neighbourhood.push([]);
      this.#population.layout.push([]);
      for (let j = 0; j < this.#width; j++) {
        let status = Math.floor(Math.random() * 2); // 0 = dead, 1 = alive
        this.#population.layout[i].push(status);
      }
    }
    this.#population.generation++;
  }

  #populateGrid() {
    for (let i = 0; i < this.#height; i++) {
      for (let j = 0; j < this.#width; j++) {
        const cell =
          this.#elem.getElementsByClassName('cell')[i * this.#width + j];
        cell.classList.toggle('alive', this.#population.layout[i][j] === 1);
      }
    }
  }

  #appendControls() {
    let controlsDiv = document.createElement('div');
    controlsDiv.id = 'controlsDiv';

    let genDiv = document.createElement('div');
    let genLabel = document.createElement('label');
    genLabel.innerHTML = 'Generation: ';
    let genCounterSpan = document.createElement('span');
    genCounterSpan.id = 'genCounterSpan';
    genCounterSpan.innerHTML = this.#population.generation;
    genDiv.appendChild(genLabel);
    genDiv.appendChild(genCounterSpan);

    let statsDiv = document.createElement('div');
    let statsLabel = document.createElement('label');
    statsLabel.innerHTML = 'Living cells: ';
    let livingCellsCounterSpan = document.createElement('span');
    livingCellsCounterSpan.id = 'livingCellsCounterSpan';
    livingCellsCounterSpan.innerHTML =
      this.#getLivingCellsCount() +
      ' (' +
      (this.#getLivingCellsCount() * 100) / (this.#width * this.#height) +
      ' %)';
    statsDiv.appendChild(statsLabel);
    statsDiv.appendChild(livingCellsCounterSpan);

    let timeControlDiv = document.createElement('div');

    let nextGenButton = document.createElement('button');
    nextGenButton.id = 'nextGenButton';
    nextGenButton.innerHTML = 'Next Generation';

    let autoplayButton = document.createElement('button');
    autoplayButton.id = 'autoplayButton';
    autoplayButton.innerHTML = '&#9654;'; // play

    timeControlDiv.appendChild(nextGenButton);
    timeControlDiv.appendChild(autoplayButton);

    controlsDiv.appendChild(genDiv);
    controlsDiv.appendChild(statsDiv);
    controlsDiv.appendChild(timeControlDiv);

    this.#container.appendChild(controlsDiv);

    // add control event listeners
    const self = this;
    document.getElementById('nextGenButton').onclick = function () {
      self.#createNextGeneration();
    };

    document.getElementById('autoplayButton').onclick = function () {
      if (!self.#autoplayIntervalObj) {
        // autoplay is not running
        document.getElementById('autoplayButton').innerHTML = '&#9724'; // stop

        // setting interval for autoplay
        self.#autoplayIntervalObj = setInterval(function () {
          self.#createNextGeneration();
        }, AUTOPLAY_INTERVAL);
      } else {
        clearInterval(self.#autoplayIntervalObj);
        self.#autoplayIntervalObj = null;
        document.getElementById('autoplayButton').innerHTML = '&#9654;'; // play
      }
    };
  }

  #getLivingCellsCount() {
    let livingCellsCount = 0;
    for (let i = 0; i < this.#height; i++) {
      for (let j = 0; j < this.#width; j++) {
        if (this.#population.layout[i][j] == 1) {
          livingCellsCount++;
        }
      }
    }
    return livingCellsCount;
  }

  #checkLivingConditions() {
    let neighbourCount; // num of living cells surrounding the current cell
    for (let i = 0; i < this.#height; i++) {
      for (let j = 0; j < this.#width; j++) {
        neighbourCount = 0;

        // check for neighbours in the prev row
        if (typeof this.#population.layout[i - 1] !== 'undefined') {
          if (
            typeof this.#population.layout[i - 1][j - 1] !== 'undefined' &&
            this.#population.layout[i - 1][j - 1] == 1
          ) {
            neighbourCount++;
          }
          if (this.#population.layout[i - 1][j] == 1) {
            neighbourCount++;
          }
          if (
            typeof this.#population.layout[i - 1][j + 1] !== 'undefined' &&
            this.#population.layout[i - 1][j + 1] == 1
          ) {
            neighbourCount++;
          }
        }

        // check for neighbours in current row
        if (
          typeof this.#population.layout[i][j - 1] !== 'undefined' &&
          this.#population.layout[i][j - 1] == 1
        ) {
          neighbourCount++;
        }
        if (
          typeof this.#population.layout[i][j + 1] !== 'undefined' &&
          this.#population.layout[i][j + 1] == 1
        ) {
          neighbourCount++;
        }

        // check for neighbours in the next row
        if (typeof this.#population.layout[i + 1] !== 'undefined') {
          if (
            typeof this.#population.layout[i + 1][j - 1] !== 'undefined' &&
            this.#population.layout[i + 1][j - 1] == 1
          ) {
            neighbourCount++;
          }
          if (this.#population.layout[i + 1][j] == 1) {
            neighbourCount++;
          }
          if (
            typeof this.#population.layout[i + 1][j + 1] !== 'undefined' &&
            this.#population.layout[i + 1][j + 1] == 1
          ) {
            neighbourCount++;
          }
        }

        this.#population.neighbourhood[i][j] = neighbourCount;
      }
    }
  }

  #createNextGeneration() {
    this.#checkLivingConditions();

    for (let i = 0; i < this.#height; i++) {
      for (let j = 0; j < this.#width; j++) {
        if (
          this.#population.neighbourhood[i][j] < 2 ||
          this.#population.neighbourhood[i][j] > 3
        ) {
          // lonely or too crowded
          this.#population.layout[i][j] = 0;
        } else if (this.#population.neighbourhood[i][j] == 3) {
          this.#population.layout[i][j] = 1; // IT'S ALIVE!!! ^.^
        }
      }
    }

    this.#populateGrid();
    this.#population.generation++;
    document.getElementById('genCounterSpan').innerHTML =
      this.#population.generation;
    document.getElementById('livingCellsCounterSpan').innerHTML =
      this.#getLivingCellsCount() +
      ' (' +
      (this.#getLivingCellsCount() * 100) / (this.#width * this.#height) +
      ' %)';
  }
}
