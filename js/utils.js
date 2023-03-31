'use strict'



// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateTimer() { // בניה של הטיימר
    var elapsedTime = Date.now() - gStartT;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    var milliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.getElementById('timer').textContent =
        formatTime(minutes) +
        ':' +
        formatTime(seconds) +
        ':' +
        formatTime(milliseconds);
}

function formatTime(time) {
    return (time < 10 ? '0' : '') + time;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}
