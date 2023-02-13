const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "";
let gameState = ["", "", "", "", "", "", "", "", ""];
//variable to hold the values of the winning locations on the board
let trueWinCondition;
//added variable declarations for xwin owin and draw count
let draws = 0;
let owin = 0;
let xwin = 0;
//variable to computer to randomize who gets picked
let computer = 'O'
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

if (Math.random() > 0.5){
    currentPlayer = "X";
}else{
    //loops through gamestate to select a spot to put O
    while(true){
        var m = Math.round(Math.random()*9)
        if(gameState[m] == ''){
            break;
        }
    }

    gameState[m] = computer;
    currentPlayer = "O";
    document.getElementById(m).innerHTML = computer;
    handlePlayerChange();
}

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    //this.firstPlayer = Math.random() > 0.5 ? "X" : "O";
    //currentPlayer = this.firstPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin(){
    let roundWon = false;
    //let trueWinCondition;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            trueWinCondition = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        document.getElementById(trueWinCondition[0]).style.backgroundColor = "Green";
        document.getElementById(trueWinCondition[1]).style.backgroundColor = "Green";
        document.getElementById(trueWinCondition[2]).style.backgroundColor = "Green";
        gameActive = false;
        //let xwin = 0;
        //let owin = 0;
        //if statement branch keeps track of o and x wins
        if (currentPlayer == "X" && gameActive == false ){
            xwin += 1;
            document.getElementById('xwin').innerHTML = xwin;
        }else if(currentPlayer == "O" && gameActive == false){
            owin += 1;
            document.getElementById('owin').innerHTML = owin;
        }
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        //let draws = 0;
        //if statement keeps track of draws
        if (gameActive == false){
            draws += 1;
            document.getElementById('draws').innerHTML = draws;
        }
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundDraw;
    }
    return false;
}

function handleResultValidation() {
    /* let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    } */

    checkWin();
    if(gameActive){
        handlePlayerChange();
        setTimeout(() => {
        handleComputerMove();
        },1000)
    }
}

function handleComputerMove(){
    //setTimeout(pickComputerMove,500);
    pickComputerMove();
    if (!checkWin())
        handlePlayerChange();
}

function pickComputerMove(){

    while(true){
        //iterate through to find and randomly find available slot
        var m = Math.round(Math.random()*9);
        if (gameState[m] == '')//searching for empty spot on game board
            break;
    }
        gameState[m] = currentPlayer
        document.getElementById(m).innerHTML = currentPlayer;
        //document.querySelectorAll('.cell').getAttributeNode(m).value=currentPlayer;
    //m holds the the computer move

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    //currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(255, 255, 255)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    //randomly choose first move player
    if (Math.random() > 0.5){
        currentPlayer = "X";
    }else{
        //loops through gamestate to select a spot to put O
        while(true){
            var m = Math.round(Math.random()*9)
            if(gameState[m] == ''){
                break;
            }
        }
    
        gameState[m] = computer;
        currentPlayer = "O";
        document.getElementById(m).innerHTML = computer;
        handlePlayerChange();
    }
        document.getElementById(trueWinCondition[0]).style.backgroundColor = "Black";
        document.getElementById(trueWinCondition[1]).style.backgroundColor = "Black";
        document.getElementById(trueWinCondition[2]).style.backgroundColor = "Black";
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);