const UNIVERSE_WIDTH = 20;
const UNIVERSE_HEIGHT = 20;
var universeSize = UNIVERSE_WIDTH * UNIVERSE_HEIGHT;

var population = {
    generation: 0,
    neighbourhood: [], // living neighbours layout
    layout: [],
}

document.addEventListener('DOMContentLoaded', function() {
    createUniverse(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);
    createRandomPopulationLayout();
    populateUniverse();
    addControls();
    getLivingCellsCount();

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
        population.neighbourhood.push([]);
        population.layout.push([]);
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            population.layout[i].push(getRandomNumberBetweenZeroAndN(2)); // 0 or 1 == dead or alive
        }
    }
    population.generation++;
}

/** 
 * Adding population to the grid according to its layout. 
 */
function populateUniverse() {
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            if (population.layout[i][j] == 1) {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].classList.add('alive');
            }
            else if (population.layout[i][j] == 0) {
                document.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].classList.remove('alive');
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

function addControls() {
    let controlsDiv = document.createElement('div');
    controlsDiv.id = 'controlsDiv';

    let genDiv = document.createElement('div');
    let genLabel = document.createElement('label');
    genLabel.innerHTML = 'Generation: ';
    let genCounterSpan = document.createElement('span');
    genCounterSpan.id = 'genCounterSpan';
    genCounterSpan.innerHTML = population.generation;
    genDiv.appendChild(genLabel);
    genDiv.appendChild(genCounterSpan);

    let statsDiv = document.createElement('div');
    let statsLabel = document.createElement('label');
    statsLabel.innerHTML = 'Living cells: ';
    let livingCellsCounterSpan = document.createElement('span');
    livingCellsCounterSpan.id = 'livingCellsCounterSpan';
    livingCellsCounterSpan.innerHTML = getLivingCellsCount() + ' (' +  + (getLivingCellsCount() * 100 / universeSize) + '%)';
    statsDiv.appendChild(statsLabel);
    statsDiv.appendChild(livingCellsCounterSpan);

    let buttonDiv = document.createElement('div');
    let nextGenButton = document.createElement('input');
    nextGenButton.type = 'button';
    nextGenButton.id = 'nextGenButton';
    nextGenButton.value = 'Next Generation';
    buttonDiv.appendChild(nextGenButton);

    controlsDiv.appendChild(genDiv);
    controlsDiv.appendChild(statsDiv);
    controlsDiv.appendChild(buttonDiv);

    document.body.appendChild(controlsDiv);
}
/**
 * Decision Point, who lives and who dies:
 * - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * - Any live cell with two or three live neighbours lives on to the next generation.
 * - Any live cell with more than three live neighbours dies, as if by overpopulation.
 * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
 function createNextGeneration() {
    checkLivingConditions();
    
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            if (population.neighbourhood[i][j] < 2 || population.neighbourhood[i][j] > 3) { // lonely or too crowded
                population.layout[i][j] = 0;
            }
            else if (population.neighbourhood[i][j] == 3) {
                population.layout[i][j] = 1;
            }
        }
    }

    populateUniverse();
    population.generation++;
    document.getElementById('genCounterSpan').innerHTML = population.generation;
    document.getElementById('livingCellsCounterSpan').innerHTML = getLivingCellsCount() + ' (' +  + (getLivingCellsCount() * 100 / universeSize) + '%)';
}

/** 
 * Checking which cells should live/die:
 */
function checkLivingConditions() {
    let neighbourCount; // num of living cells surrounding the current cell
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            neighbourCount = 0;

            // check for neighbours in the prev row 
            if (typeof population.layout[i-1] !== 'undefined') { 
                if (typeof population.layout[i-1][j-1] !== 'undefined' && population.layout[i-1][j-1] == 1) {
                    neighbourCount++;
                }
                if (population.layout[i-1][j] == 1) {
                    neighbourCount++;
                }
                if (typeof population.layout[i-1][j+1] !== 'undefined' && population.layout[i-1][j+1] == 1) {
                    neighbourCount++;
                }
            }

            // check for neighbours in current row 
            if (typeof population.layout[i][j-1] !== 'undefined' && population.layout[i][j-1] == 1) {
                neighbourCount++;
            }
            if (typeof population.layout[i][j+1] !== 'undefined' && population.layout[i][j+1] == 1) {
                neighbourCount++;
            }

            // check for neighbours in the next row 
            if (typeof population.layout[i+1] !== 'undefined') { 
                if (typeof population.layout[i+1][j-1] !== 'undefined' && population.layout[i+1][j-1] == 1) {
                    neighbourCount++;
                }
                if (population.layout[i+1][j] == 1) {
                    neighbourCount++;
                }
                if (typeof population.layout[i+1][j+1] !== 'undefined' && population.layout[i+1][j+1] == 1) {
                    neighbourCount++;
                }
            }

            population.neighbourhood[i][j] = neighbourCount;
            
        }
    }
}

/**
 * Returns the number of living cells.
 */
function getLivingCellsCount() {
    livingCount = 0;
    for (let i = 0; i < UNIVERSE_HEIGHT; i++) {
        for (let j = 0; j < UNIVERSE_WIDTH; j++) {
            if (population.layout[i][j] == 1) {
                livingCount++;
            }
        }
    }
    return livingCount;
}
