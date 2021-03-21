const statusDisplay = document.querySelector('.game--status');

// Put this here to prevent more moves once the game ends
var gameActive = true;
// X will go first, in the next stage we can refactor it to accept user input names.
var currentPlayer = "X";
// The board should be blank
var gameState = ["", "", "", "", "", "", "", "", ""];

var winningMessage = () => `${currentPlayer} wins!`;
var drawMessage = () => `Draw!`;
var currentPlayerTurn = () => `${currentPlayer} to move.`;

statusDisplay.innerHTML = currentPlayerTurn();

//within our cells, 0-8 these are all of the possible win conditions.
//instead of checking all rows, columns, and diagonals I've hardcoded all conditions in our 3x3 game
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

//algorithm for figuring out if a victory occurs
function handleResultValidation() {
    let roundWon = false;
    //iterate through all possible win conditions
    for (let i = 0; i <= 7; i++) {
        //check to see if the win condition is true. Define 3 variables to be the spaces on the board for each win condition.
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //if any of the values are blank, then there is no win, loop to next.
        if (a === '' || b === '' || c === '') {
            continue;
        }
        //if all of the same win condition exists, then a win is confirmed
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    //It will always be the turn winner's victory you can't lose if its not your turn in tictactoe
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //if the board is full without the conclusion of a win, then its a draw.
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    //reset back to X being first to go.
    handlePlayerChange();
}

//handle the events
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// restart the game back to an empty board
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);