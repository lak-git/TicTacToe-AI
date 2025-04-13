const cells = document.querySelectorAll(".cell");

class Game
{
    X = "X";
    O = "O";
    EMPTY = "";

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
    }
}

let g = new Game();
g.checkWinner(g.initialState())
