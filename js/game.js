'use strict'

const MINES = '💣'
const MARKED = '⛳️'
var gLives = 3
var gBoard
var gStartT
var gNumCell
var event
var gIntervalId
var countMine = 0


var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    gLives == 3
    gNumCell = gLevel.size ** 2
    gBoard = createBoard()
    renderBoard(gBoard)
    addMines(gBoard)
    findLocationMines(gBoard)


}

function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        // console.log(gBoard)
        for (var j = 0; j < gLevel.size; j++) {
            const eachCell = {
                minesAroundCount: 0,
                isShowm: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = eachCell
        }
    }
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })
            // if (!currCell.isShowm) cellClass += 'isShowm'

            strHTML += `<td class = "${cellClass}" 
            onclick ="onCellClicked(event,this,${i},${j})" oncontextmenu ="onCellClicked(event,this,${i},${j})">
           
            </td>`


        }
        strHTML += `</tr>`
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

}

function addMines() {
    var count = 0
    while (count < gLevel.mines) {
        console.log(count)
        const emptyPos = getEmptyPos(gBoard)
        gBoard[emptyPos.i][emptyPos.j].isMine = MINES
        count++
    }
}


function getEmptyPos() {
    console.log(gBoard)
    const emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine == false) {
                emptyLocations.push({ i, j }) // {i:1,j:3}
            }
        }
    }

    console.log(emptyLocations)
    if (!emptyLocations.length) return null //בדיקה עם המערך ריק
    var randIdx = getRandomInt(0, emptyLocations.length)

    return emptyLocations[randIdx]

}


function onCellClicked(event, elCell, i, j) {

    if (gGame.shownCount == 0) startTimer()
    event.preventDefault()
    if (event.button === 2) {
        onRighClicked(gBoard, elCell, i, j)
    } else if (event.button === 0) {
        var countMines = gBoard[i][j].minesAroundCount
        if (countMines === 0) {
            elCell.style.backgroundColor = 'pink'
            expandShown(gBoard, elCell, i, j)
        } else {
            gBoard[i][j].isShowm = true
            elCell.innerText = countMines
            elCell.style.backgroundColor = 'pink'
            gGame.shownCount++
        }
        if (gBoard[i][j].isMine === MINES) {
            elCell.innerText = MINES
            gGame.shownCount++
            countMine++
            gLives--
            document.querySelector('h3 span').innerText = gLives

            gameOver()
        }
    }
    victory()

}

function expandShown(board, elCell, rowIdx, colIdx) {
    //  console.log(board, elCell, rowIdx, colIdx)

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        //console.log(i)
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            //console.log(j)
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine != MINES && !board[i][j].isShowm) {
                var currCell = board[i][j]
                currCell.isShowm = true
                gGame.shownCount++
                var cell = { i, j }
                renderCell(cell, gBoard[i][j].minesAroundCount)
            }

        }
    }
}
function openAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine === MINES) {
                console.log(board[i][j].isMine = MINES)
                var currCell = board[i][j].isMine
                gGame.shownCount++
                var cell = { i, j }
                renderCell(cell, gBoard[i][j].isMine)

            }
        }
    }
}


function onRighClicked(board, elCell, i, j) {
    // window.addEventListener = ('contextmanu', (ev) => {

    console.log(elCell, i, j)
    elCell.innerText = MARKED
    // elCell.innerText = MARKED
    board[i][j].isMarked = true
    board[i][j].isMine = false
    board[i][j].isShowm = true
    gGame.shownCount++
    gGame.markedCount++

    console.log(gBoard)
    // })

}

function victory() {
    console.log(gGame.shownCount)
    if (gGame.shownCount === gNumCell && gGame.markedCount === gLevel.mines) {
        var elH3 = document.querySelector('.user-msg')
        elH3.innerText = "You are WINNER!!!!"

        var elbut = document.querySelector('.ison')
        elbut.innerText = "🥳"

        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'

    }

}

function gameOver() {

    if (gLives === 0 || countMine === gLevel.mines) {
        openAllMines(gBoard)
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'
        var elbut = document.querySelector('.start')
        elbut.innerText = "😢"
        stopTimer()
    }

}


function findLocationMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine != MINES) {  //מוצא לי את המקומת בלי הפצצות
                var currCell = board[i][j]
                currCell.minesAroundCount = setMinesNegsCount(i, j, board)
            }
        }
    }
    console.table(board)
    return board
}


function setMinesNegsCount(rowIdx, colIdx, board) {
    // console.log(rowIdx, colIdx, board)
    var countMine = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine === MINES) {
                countMine++
            }
        }
    }
    return countMine
}


function changeDifficulty(size, mines) {
    gLevel.size = size
    gLevel.mines = mines
    gLives === 0
    gNumCell = size ** 2
    // console.log(gNumCell)
    onInit()
}

function onStart() {

    var elbut = document.querySelector('.start')
    elbut.innerText = "😃"
    stopTimer()
    onInit()
}


function isOn() {

    onInit()
    gLives = 3
    document.querySelector('h3 span').innerText = gLives
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

}



function startTimer() {
    gStartT = Date.now();
    gIntervalId = setInterval(updateTimer, 10);
}

function stopTimer() {
    clearInterval(gIntervalId);
}


