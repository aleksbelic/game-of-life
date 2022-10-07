const GRID_WIDTH = 20; // cells
const GRID_HEIGHT = 20; // cells
const AUTOPLAY_INTERVAL = 300; // ms

export class Gol {
  #autoplayIntervalObj = null;
  #elem;
  #width;
  #height;
  #container;
  #population = {
    genCount: 0,
    neighbourhood: [], // living neighbours layout
    layout: [],
    nextGenLayout: [],
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
    this.#population.genCount++;
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
    let dataAndControlsContainerElem = document.createElement('div');
    dataAndControlsContainerElem.id = 'dataAndControlsContainer';

    let dataContainerElem = document.createElement('div');
    dataContainerElem.id = 'dataContainer';

    let genDataContainerElem = document.createElement('div');

    let genLabelElem = document.createElement('label');
    genLabelElem.innerHTML = 'Generation:&nbsp;';

    let genCountElem = document.createElement('span');
    genCountElem.id = 'genCount';
    genCountElem.innerHTML = this.#population.genCount;

    genDataContainerElem.appendChild(genLabelElem);
    genDataContainerElem.appendChild(genCountElem);

    dataContainerElem.appendChild(genDataContainerElem);

    let statsContainerElem = document.createElement('div');
    let statsLabel = document.createElement('label');
    statsLabel.innerHTML = 'Living cells:&nbsp;';

    let livingCellsCountElem = document.createElement('span');
    livingCellsCountElem.id = 'livingCellsCount';
    livingCellsCountElem.innerHTML = this.#getLivingCellsCount();

    statsContainerElem.appendChild(statsLabel);
    statsContainerElem.appendChild(livingCellsCountElem);

    let timeControlContainerElem = document.createElement('div');
    timeControlContainerElem.id = 'timeControlContainer';

    let nextGenBtn = document.createElement('button');
    nextGenBtn.id = 'nextGenBtn';
    nextGenBtn.title = 'Next Generation';
    nextGenBtn.innerHTML = '&#9654;'; // play

    let autoplayBtn = document.createElement('button');
    autoplayBtn.id = 'autoplayBtn';
    autoplayBtn.title = 'Autoplay';
    autoplayBtn.innerHTML = '&#9654;&#9654;'; // fast-forward

    timeControlContainerElem.appendChild(nextGenBtn);
    timeControlContainerElem.appendChild(autoplayBtn);

    dataContainerElem.appendChild(statsContainerElem);

    dataAndControlsContainerElem.appendChild(dataContainerElem);
    dataAndControlsContainerElem.appendChild(timeControlContainerElem);

    this.#container.appendChild(dataAndControlsContainerElem);

    // add control event listeners
    const self = this;
    document.getElementById('nextGenBtn').onclick = function () {
      self.#createNextGeneration();
    };

    document.getElementById('autoplayBtn').onclick = function () {
      if (self.#autoplayIntervalObj === null) {
        document.getElementById('autoplayBtn').innerHTML = '&#9724;'; // stop
        self.#setAutoplayInterval();
      } else {
        clearInterval(self.#autoplayIntervalObj);
        self.#autoplayIntervalObj = null;
        document.getElementById('autoplayBtn').innerHTML = '&#9654;&#9654;'; // fast-forward
      }
    };
  }

  #getLivingCellsCount() {
    let livingCellsCount = 0;
    for (let i = 0; i < this.#height; i++) {
      for (let j = 0; j < this.#width; j++) {
        if (this.#population.layout[i][j] === 1) {
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
    this.#population.genCount++;
    document.getElementById('genCount').innerHTML = this.#population.genCount;
    document.getElementById('livingCellsCount').innerHTML =
      this.#getLivingCellsCount();
  }

  setPopulation(newPopulation) {
    this.#population = newPopulation;
  }

  #setAutoplayInterval() {
    this.#autoplayIntervalObj = setInterval(() => {
      this.#createNextGeneration();
    }, AUTOPLAY_INTERVAL);
  }
}
