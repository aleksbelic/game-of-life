document.addEventListener('DOMContentLoaded', function(){
    createUniverse(50, 50);
}, false);

/**
 * Drawing the grid with specified width and height.
 * @param {int} universeWidth 
 * @param {int} universeHeight 
 */
function createUniverse(universeWidth = 30, universeHeight = 30) {
    var universe = document.createElement('table');
    universe.setAttribute('id', 'universe');
    for (var i = 0; i < universeHeight; i++) {
        var universeRow = document.createElement('tr');
        for (var j = 0; j < universeWidth; j++) {
            var universeColumn = document.createElement('td');
            universeRow.appendChild(universeColumn)
        }
        universe.appendChild(universeRow);
    }
    document.body.appendChild(universe)
}
