'use strict'

const MINES = '💣'
const MARKED = '⛳️'
var gLives = 3
var gBoard
var gPos
var gStartT
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
            if (!currCell.isShowm) cellClass += 'isShowm'

            strHTML += `<td class = "${cellClass}" 
            onclick ="onCellClicked(this,${i},${j})"></td>`

        }
        strHTML += `</tr>`
    }
    strHTML += `</tr>`
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

function changeDifficulty(size, mines) {

    gLevel.size = size
    gLevel.mines = mines
    gLives === 0

    onInit()
}


function onCellClicked(elCell, i, j) {
    var countMines = gBoard[i][j].minesAroundCount
    if (countMines === 0) {
        elCell.style.backgroundColor = 'pink'
        expandShown(gBoard, elCell, i, j)
        gGame.shownCount++
        // expandShown()
    } else {
        elCell.innerText = countMines
        elCell.style.backgroundColor = 'pink'
    }

    if (gBoard[i][j].isMine == MINES) {
        elCell.innerText = MINES
        openAllMines(gBoard)
        gLives--
        document.querySelector('h3 span').innerText = gLives
        if (gLives === 0)
            gameOver()
    }
    onRighClicked(elCell)
}



function gameOver() {
    alert('los')
    stopTimer()

}

function onRighClicked(elCell) {
    window.oncontextmenu = (ev) => {
        ev.preventDefault()



    }

}

function startTimer() {
    gStartT = Date.now();
    gIntervalId = setInterval(updateTimer, 10);

}

function stopTimer() {
    clearInterval(gIntervalId);
}

function expandShown(board, elCell, rowIdx, colIdx) {
    //  console.log(board, elCell, rowIdx, colIdx)
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        //console.log(i)
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            //console.log(j)
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine != MINES) {
                var currCell = board[i][j]
                currCell.isShowm = true
                // console.log(currCell)
                // dom


            }
        }
    }
}
function openAllMines(board) {
    for (var i = 0; i < board.gBoard; i++) {
        for (var j = 0; j < board[0].gBoard; j++) {
            currCell = board[i][j].isMine
            if (currCell === MINES) {
                elCell.innerText = MINES
            }
        }
    }
}


function findLocationMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine != MINES) {  //מוצא לי את המקומת בלי הפצצות
                var currCell = board[i][j]
                currCell.minesAroundCount = setMinesNegsCount(i, j, board)
                //console.log(currCell.minesAroundCount)
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
