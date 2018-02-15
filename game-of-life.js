const UNIVERSE_WIDTH = 3;
const UNIVERSE_HEIGHT = 3;
var universeSize = UNIVERSE_WIDTH * UNIVERSE_HEIGHT;

var population = {
    alive: [],
    dead: [],
    layout: [],
}

document.addEventListener('DOMContentLoaded', function() {
    createUniverse(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);
    addTimeController();
    populateUniverse();
    console.log(population.layout);

    nextGenButton.onclick = function(){
        createNextGeneration();
    };

}, false);

/**
 * Drawing the grid with specified width and height.
 * @param {int} universeWidth - number of cells in a row
 * @param {int} universeHeight - number of cells in a column
 */
function createUniverse(universeWidth = 30, universeHeight = 30) {
    let universe = document.createElement('table');
    universe.id = 'universe';
    for (let i = 0; i < universeHeight; i++) {
        let universeRow = document.createElement('tr');
        for (let j = 0; j < universeWidth; j++) {
            let universeCell= document.createElement('td');
            universeCell.classList.add('cell');
            universeRow.appendChild(universeCell);
        }
        universe.appendChild(universeRow);
    }
    document.body.appendChild(universe)
}

/**
 * Generating random population layout. 
 */
function createRandomPopulationLayout() {
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        population.layout.push([]);
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            population.layout[i].push(getRandomNumberBetweenZeroAndN(2)); // 0 or 1
        }
    }
}

/** 
 * Adding population to the grid. 
 */
function populateUniverse() {
    createRandomPopulationLayout();
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            if (population.layout[i][j] == 1) {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].classList.add('alive');
            }
        }
    }
}

/**
 * Returns random number between 0 and a positive number (0 included, max excluded).
 * @param {int} max - positive number
 */
function getRandomNumberBetweenZeroAndN(max = 2) {
    return Math.floor(Math.random() * max);
}

function addTimeController() {
    let timeControllerDiv = document.createElement('div');
    timeControllerDiv.id = 'timeControllerDiv';
    let nextGenButton = document.createElement('input');
    nextGenButton.type = 'button';
    nextGenButton.id = 'nextGenButton';
    nextGenButton.value = 'nextGen()';
    timeControllerDiv.appendChild(nextGenButton);
    document.body.appendChild(timeControllerDiv);
}

function createNextGeneration() {
    let neighbourCount = 0; // num of living cells surrounding the current cell
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            try {
                console.log(i - 1 + ', ' + j + ' : ' + population.layout[i - 1][j]);
            } catch(e) {
                console.log(i);
            }
            
        }
    }
}
