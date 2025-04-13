class Game
{
    X = "X";
    O = "O";
    EMPTY = "";
    RealBoard;
    
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
        this.RealBoard = [
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

    syncBoards(board)
    {
        for (let i=0; i<board.length; i++) {
            for (let j=0; j<board[0].length; j++) {
                board[i][j] = this.RealBoard[i][j].textContent;
            }
        }
    }

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

    terminal(board)
    {
        let winner = this.checkWinner(board);
        if (winner === this.X || winner == this.O) {
            disableClick();
            return true;
        }
        for (const row of board) {
            for (const cell of row) {
                if (cell === this.EMPTY) {
                    return false;
                }
            }
        }
        disableClick();
        return true;
    }

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
}

const ttt = new Game("0", "1", "2", "3", "4", "5", "6", "7", "8");
const cells = document.querySelectorAll(".cell");
let currentBoard = ttt.initialState();

cells.forEach(cell => {
    cell.addEventListener("click", turnClick.bind(null, cell));
});


function turnClick(cell) {
    let emptyCell = cell.textContent === ttt.EMPTY
    if (emptyCell) {
        cell.textContent = ttt.player(currentBoard);   
    }
    ttt.syncBoards(currentBoard);
    ttt.terminal(currentBoard);
}

function disableClick() {
    cells.forEach(cell => {
        let emptyCell = cell.textContent === ttt.EMPTY
        if (emptyCell) {
            cell.textContent = " ";   
        }
    });
}