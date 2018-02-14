const UNIVERSE_WIDTH = 5;
const UNIVERSE_HEIGHT = 5;
var universeSize = UNIVERSE_WIDTH * UNIVERSE_HEIGHT;

document.addEventListener('DOMContentLoaded', function(){
    createUniverse(UNIVERSE_WIDTH, UNIVERSE_HEIGHT);
    createRandomLife(5);
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
