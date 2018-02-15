const UNIVERSE_WIDTH = 3;
const UNIVERSE_HEIGHT = 3;
var universeSize = UNIVERSE_WIDTH * UNIVERSE_HEIGHT;

var population = {
    alive: [],
    dead: [],
    layout: [1,1,1,0,1,0,0,0,1],
}

document.addEventListener('DOMContentLoaded', function(){
    createUniverse(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);
    //createRandomLife(5);
    populateUniverse();
}, false);

/**
 * Drawing the grid with specified width and height.
 * @param {int} universeWidth - number of cells in a row
 * @param {int} universeHeight - number of cells in a column
 */
function createUniverse(universeWidth = 30, universeHeight = 30) {
    var universe = document.createElement('table');
    universe.setAttribute('id', 'universe');
    for (var i = 0; i < universeHeight; i++) {
        var universeRow = document.createElement('tr');
        for (var j = 0; j < universeWidth; j++) {
            var universeCell= document.createElement('td');
            universeCell.setAttribute('class', 'cell');
            universeRow.appendChild(universeCell);
        }
        universe.appendChild(universeRow);
    }
    document.body.appendChild(universe)
}

/** 
 * Adding population to the grid. 
 */
function populateUniverse() {
    if (population.layout.length > universeSize) {
        throw "Univers is overpopulated! Exiting simpulation.";
    }
    else {
        for (var i = 0; i < population.layout.length; i++) {
            if (population.layout[i] == 1) {
                document.getElementsByTagName("td")[i].classList.add('alive');
            }
            /*
            else {
                document.getElementsByTagName("td")[i].classList.remove('alive');
            }
            */
        }
    }
}

/**
 * Adding fixed number of alive cells randomly to the grid.
 * @param {int} numOfCells - number of alive cells to create 
 */
function createRandomLife(numOfCells = 10) {
    if (numOfCells > universeSize) return false; // no infinite loop
    else {
        for (var i = 0; i < numOfCells; i++) {
            randNum = getRandomNumberBetweenZeroAndN(universeSize);
            while (document.getElementsByTagName("td")[randNum].classList.contains('alive')) {
                randNum = getRandomNumberBetweenZeroAndN(universeSize);
            }
            document.getElementsByTagName("td")[randNum].classList.add('alive');
        }
    }
}

/**
 * Returns random number between 0 and a positive number (0 included, max excluded).
 * @param {int} max - positive number
 */
function getRandomNumberBetweenZeroAndN(max = 10) {
    return Math.floor(Math.random() * max);
}
