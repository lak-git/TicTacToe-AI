class Game
{
    X = "X";
    O = "O";
    EMPTY = "";
    REAL_BOARD;
    
    constructor(tl, tc, tr, ml, mc, mr, bl, bc, br) {
        let cell_tl = document.getElementById(tl);
        let cell_tc = document.getElementById(tc);
        let cell_tr = document.getElementById(tr);
        let cell_ml = document.getElementById(ml);
        let cell_mc = document.getElementById(mc);
        let cell_mr = document.getElementById(mr);
        let cell_bl = document.getElementById(bl);
        let cell_bc = document.getElementById(bc);
        let cell_br = document.getElementById(br);
        this.REAL_BOARD = [
            [cell_tl, cell_tc, cell_tr],
            [cell_ml, cell_mc, cell_mr],
            [cell_bl, cell_bc, cell_br]
        ]
    }

    initialState()
    {
        return [
            [this.EMPTY, this.EMPTY, this.EMPTY],
            [this.EMPTY, this.EMPTY, this.EMPTY],
            [this.EMPTY, this.EMPTY, this.EMPTY],
        ];
    }

    getIndex(i, j)
    {
        return i*3 + j;
    }

    //Syncs the HTML board and the logical board in the script
    syncBoards(board)
    {
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[0].length; j++) {
                board[i][j] = this.REAL_BOARD[i][j].textContent;
            }
        }
    }

    //Returns the current player
    player(board)
    {
        let xCount = 0;
        let oCount = 0;
        for (const row of board) {
            for (const cell of row) {
                if (cell === this.X) {
                    xCount++;
                } else if (cell === this.O) {
                    oCount++;
                }
            }
        }
        if (xCount == oCount) {
            return this.X;
        } else if (xCount > oCount) {
            return this.O;
        }
        throw new Error("Invalid Player State");
    }

    //Returns list of possible actions/moves
    actions(board)
    {
        let moves = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === this.EMPTY) {
                    moves.push([i, j]);
                }                
            }
        }
        return moves;
    }

    result(board, action)
    {
        //Check valid moves
        let allMoves = this.actions(board);
        let isInvalid = !allMoves.some(move => move[0] == action[0] && move[1] == action[1])
        if (isInvalid) {
            throw new Error("Invalid Action");
        }
        let newBoard = JSON.parse(JSON.stringify(board));
        newBoard[action[0]][action[1]] = this.player(board);
        return newBoard;
    }

    checkWinner(board)
    {
        //Check rows
        for (const row of board) {
            if (row[0] === row[1]&&row[1] === row[2] && row[0] != this.EMPTY) {
                return row[0];
            }
        }
        // Check columns
        for (let i=0; i<board.length; i++) {
            if (board[0][i] === board[1][i]&&board[1][i] === board[2][i] && board[0][i] != this.EMPTY){
                return board[0][i];
            }
        }
        // Check diagonals
        if (board[0][0] === board[1][1]&&board[1][1] === board[2][2] && board[0][0] != this.EMPTY) {
            return board[0][0];
        }
        if (board[0][2] === board[1][1]&&board[1][1] === board[2][0] && board[0][2] != this.EMPTY) {
            return board[0][2];
        }
        return null;
    }

    //Checks if the game is in an end state or not
    terminal(board)
    {
        let winner = this.checkWinner(board);
        if (winner === this.X || winner == this.O) {
            return true;
        }
        for (const row of board) {
            for (const cell of row) {
                if (cell === this.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    //Returns the value based on who won
    utility(board)
    {
        switch (this.checkWinner(board)) {
            case this.X:
                return 1;
            case this.O:
                return -1;
            default:
                return 0;
        }
    }

    minimax(board)
    {
        if (this.player(board) === this.X) {
            let best_value = -Infinity
            let best_move = null;
            for (const move of this.actions(board)) {
                let value = this.min_value(this.result(board, move));
                if (value > best_value) {
                    best_move = move;
                    best_value = value;
                }
            }
            return best_move;
        }
        else{
            let best_value = Infinity;
            let best_move = null;
            for (const move of this.actions(board)) {
                let value = this.max_value(this.result(board, move));
                if (value < best_value) {
                    best_move = move;
                    best_value = value;
                }
            }
            return best_move;
        }
    }
    min_value(board)
    {
        if (this.terminal(board)) {
            let value = this.utility(board);
            return value;
        }
        let v = Infinity
        for (const action of this.actions(board)) {
            let value = this.max_value(this.result(board, action));
            if (value < v) {
                v = value;
            }
        }
        return v;
    }
    max_value(board)
    {
        if (this.terminal(board)) {
            let value = this.utility(board);
            return value;
        }
        let v = -Infinity
        for (const action of this.actions(board)) {
            let value = this.min_value(this.result(board, action));
            if (value > v) {
                v = value;
            }
        }
        return v;
    }
}
//  ----    //


const ttt = new Game("0", "1", "2", "3", "4", "5", "6", "7", "8");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById('reset');
const statusBox = document.getElementById('status');
let currentBoard;
let chosenSign;

cells.forEach(cell => {
    cell.addEventListener("click", playerMove.bind(null, cell));
});
resetBtn.addEventListener("click", ()=>{location.href = ".";});
startGame();


//  ----    //
function startGame() {
    statusBox.innerHTML = "Tic-Tac-Toe!"
    currentBoard = ttt.initialState();
    cells.forEach(cell => {
        cell.textContent = ttt.EMPTY;
    });
    checkFirstMove();
}
function checkFirstMove() {
    chosenSign = JSON.parse(sessionStorage.getItem("PlayerSign"));
    let notChosen = chosenSign === null;
    if (notChosen) {
        alert("Error: You need to choose to play as X or O.");
        location.href = "./";
    }
    if (chosenSign === ttt.O) {
        AIMove();
    }
}

function playerMove(cell) {
    let emptyCell = cell.textContent === ttt.EMPTY
    if (emptyCell) {
        cell.textContent = ttt.player(currentBoard);
        ttt.syncBoards(currentBoard);
        checkGameState();
        AIMove();   
    }
}

async function AIMove() {
    statusBox.innerHTML = "thinking...";
    await new Promise(r => setTimeout(r, 250));
    let move = ttt.minimax(currentBoard);
    let noMove = move === null
    if (noMove) {
        checkGameState();
        return;
    }
    let sign = ttt.player(currentBoard);
    currentBoard[move[0]][move[1]] = sign; 
    cells[ttt.getIndex(move[0], move[1])].textContent = sign;
    statusBox.innerHTML = "Your turn."
    checkGameState();
}

//Checks the current gamestate and updates the status message
function checkGameState() {
    let winner = ttt.checkWinner(currentBoard) ;
    let aiWon = winner === ttt.X && chosenSign === ttt.O || winner === ttt.O && chosenSign === ttt.X;
    let playerWon = winner === chosenSign;
    if (aiWon) {
        statusBox.innerHTML = "You lost!"
        disableClick();
        return;
    } else if (playerWon) {
        statusBox.innerHTML = "You won! what, how?"
        disableClick();
        return;
    }
    let isTie = true;
    cells.forEach(cell => {
        if (cell.textContent === ttt.EMPTY) {
            isTie = false
        }});
    if (isTie) {
        statusBox.innerHTML = "It's a tie."
        return;
    }
}
function disableClick() {
    cells.forEach(cell => {
        let emptyCell = cell.textContent === ttt.EMPTY
        if (emptyCell) {
            cell.textContent = " ";   
        }
    });
}