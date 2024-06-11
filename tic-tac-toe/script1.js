let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.getElementById('message').textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (isBoardFull()) {
            document.getElementById('message').textContent = `It's a tie!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').textContent = `${currentPlayer}'s turn`;
        }
    }
}

function checkWin(player) {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('message').textContent = `${currentPlayer}'s turn`;
    Array.from(document.getElementById('board').children).forEach(cell => {
        cell.textContent = '';
    });
}
