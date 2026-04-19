class Game
{
    X = "X";
    O = "O";
    EMPTY = "";
    BOARD_SIZE = 6;
    WIN_LENGTH = 4;
    SEARCH_DEPTH = 8;
    TT_MAX_SIZE = 50000;
    REAL_BOARD;
    transposition;
    zobrist;
    zobristSide;

    constructor(...cellIds) {
        this.REAL_BOARD = [];
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            let row = [];
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const idx = this.getIndex(i, j);
                const id = cellIds[idx] ?? String(idx);
                row.push(document.getElementById(id));
            }
            this.REAL_BOARD.push(row);
        }
        this.transposition = new Map();
        this.initZobrist();
    }

    setSearchDepth(depth)
    {
        const parsed = Number(depth);
        if (Number.isFinite(parsed)) {
            this.SEARCH_DEPTH = Math.max(1, Math.floor(parsed));
        }
    }

    clearTransposition()
    {
        this.transposition.clear();
    }

    initZobrist()
    {
        const random64 = () => {
            if (typeof crypto !== "undefined" && crypto.getRandomValues) {
                const arr = new Uint32Array(2);
                crypto.getRandomValues(arr);
                return (BigInt(arr[0]) << 32n) ^ BigInt(arr[1]);
            }
            const hi = Math.floor(Math.random() * 0x100000000);
            const lo = Math.floor(Math.random() * 0x100000000);
            return (BigInt(hi) << 32n) ^ BigInt(lo);
        };

        this.zobrist = [];
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            let row = [];
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                row.push([random64(), random64()]);
            }
            this.zobrist.push(row);
        }
        this.zobristSide = random64();
    }

    hashBoard(board, sideToMove)
    {
        let hash = 0n;
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (board[i][j] === this.X) {
                    hash ^= this.zobrist[i][j][0];
                } else if (board[i][j] === this.O) {
                    hash ^= this.zobrist[i][j][1];
                }
            }
        }
        if (sideToMove === this.X) {
            hash ^= this.zobristSide;
        }
        return hash;
    }

    ttKey(board, sideToMove, depth)
    {
        return `${this.hashBoard(board, sideToMove).toString()}|${sideToMove}|${depth}`;
    }

    initialState()
    {
        let board = [];
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            let row = [];
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                row.push(this.EMPTY);
            }
            board.push(row);
        }
        return board;
    }

    getIndex(i, j)
    {
        return i * 6 + j;
    }

    //Syncs the HTML board and the logical board in the script
    syncBoards(board)
    {
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
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
        if (xCount === oCount) {
            return this.X;
        }
        if (xCount > oCount) {
            return this.O;
        }
        throw new Error("Invalid Player State");
    }

    //Returns list of possible actions/moves
    actions(board)
    {
        let moves = [];
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (board[i][j] === this.EMPTY) {
                    moves.push([i, j]);
                }
            }
        }
        return moves;
    }

    result(board, action)
    {
        let allMoves = this.actions(board);
        let isInvalid = !allMoves.some(move => move[0] === action[0] && move[1] === action[1]);
        if (isInvalid) {
            throw new Error("Invalid Action");
        }
        let newBoard = JSON.parse(JSON.stringify(board));
        newBoard[action[0]][action[1]] = this.player(board);
        return newBoard;
    }

    checkWinner(board)
    {
        const hasLine = (r, c, dr, dc) => {
            const first = board[r][c];
            if (first === this.EMPTY) {
                return null;
            }
            for (let k = 1; k < this.WIN_LENGTH; k++) {
                if (board[r + dr * k][c + dc * k] !== first) {
                    return null;
                }
            }
            return first;
        };

        for (let r = 0; r < this.BOARD_SIZE; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                const winner = hasLine(r, c, 0, 1);
                if (winner) {
                    return winner;
                }
            }
        }
        for (let c = 0; c < this.BOARD_SIZE; c++) {
            for (let r = 0; r <= this.BOARD_SIZE - this.WIN_LENGTH; r++) {
                const winner = hasLine(r, c, 1, 0);
                if (winner) {
                    return winner;
                }
            }
        }
        for (let r = 0; r <= this.BOARD_SIZE - this.WIN_LENGTH; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                const winner = hasLine(r, c, 1, 1);
                if (winner) {
                    return winner;
                }
            }
        }
        for (let r = this.WIN_LENGTH - 1; r < this.BOARD_SIZE; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                const winner = hasLine(r, c, -1, 1);
                if (winner) {
                    return winner;
                }
            }
        }
        return null;
    }

    //Checks if the game is in an end state or not
    terminal(board)
    {
        let winner = this.checkWinner(board);
        if (winner === this.X || winner === this.O) {
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

    terminalScore(board, depth)
    {
        const u = this.utility(board);
        if (u === 1) {
            return 100000 + depth;
        }
        if (u === -1) {
            return -100000 - depth;
        }
        return 0;
    }

    evaluateWindow(xCount, oCount, emptyCount)
    {
        if (xCount > 0 && oCount > 0) {
            return 0;
        }
        if (xCount === this.WIN_LENGTH - 1 && emptyCount === 1) {
            return 120;
        }
        if (oCount === this.WIN_LENGTH - 1 && emptyCount === 1) {
            return -120;
        }
        if (xCount === this.WIN_LENGTH - 2 && emptyCount === 2) {
            return 20;
        }
        if (oCount === this.WIN_LENGTH - 2 && emptyCount === 2) {
            return -20;
        }
        if (xCount === 1 && emptyCount === this.WIN_LENGTH - 1) {
            return 3;
        }
        if (oCount === 1 && emptyCount === this.WIN_LENGTH - 1) {
            return -3;
        }
        return 0;
    }

    evaluate(board)
    {
        let winner = this.checkWinner(board);
        if (winner === this.X) {
            return 100000;
        }
        if (winner === this.O) {
            return -100000;
        }

        let score = 0;
        const centers = [[2, 2], [2, 3], [3, 2], [3, 3]];
        for (const [i, j] of centers) {
            if (board[i][j] === this.X) {
                score += 4;
            } else if (board[i][j] === this.O) {
                score -= 4;
            }
        }

        const scanLine = (cells) => {
            let xCount = 0;
            let oCount = 0;
            let emptyCount = 0;
            for (const cell of cells) {
                if (cell === this.X) {
                    xCount++;
                } else if (cell === this.O) {
                    oCount++;
                } else {
                    emptyCount++;
                }
            }
            score += this.evaluateWindow(xCount, oCount, emptyCount);
        };

        for (let r = 0; r < this.BOARD_SIZE; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                scanLine(Array.from({ length: this.WIN_LENGTH }, (_, k) => board[r][c + k]));
            }
        }
        for (let c = 0; c < this.BOARD_SIZE; c++) {
            for (let r = 0; r <= this.BOARD_SIZE - this.WIN_LENGTH; r++) {
                scanLine(Array.from({ length: this.WIN_LENGTH }, (_, k) => board[r + k][c]));
            }
        }
        for (let r = 0; r <= this.BOARD_SIZE - this.WIN_LENGTH; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                scanLine(Array.from({ length: this.WIN_LENGTH }, (_, k) => board[r + k][c + k]));
            }
        }
        for (let r = this.WIN_LENGTH - 1; r < this.BOARD_SIZE; r++) {
            for (let c = 0; c <= this.BOARD_SIZE - this.WIN_LENGTH; c++) {
                scanLine(Array.from({ length: this.WIN_LENGTH }, (_, k) => board[r - k][c + k]));
            }
        }

        return score;
    }

    movePriority(board, move, sideToMove)
    {
        const [i, j] = move;
        const centerDistance = Math.abs(i - 2.5) + Math.abs(j - 2.5);
        let score = 10 - centerDistance;

        const opponent = sideToMove === this.X ? this.O : this.X;
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) {
                    continue;
                }
                let ni = i + di;
                let nj = j + dj;
                if (ni < 0 || nj < 0 || ni >= this.BOARD_SIZE || nj >= this.BOARD_SIZE) {
                    continue;
                }
                if (board[ni][nj] === sideToMove) {
                    score += 3;
                } else if (board[ni][nj] === opponent) {
                    score += 2;
                }
            }
        }
        return score;
    }

    orderMoves(board, moves, sideToMove, depth)
    {
        const key = this.ttKey(board, sideToMove, depth);
        const cached = this.transposition.get(key);
        const cachedMove = cached?.bestMove;

        let scored = moves.map(move => ({
            move,
            score: this.movePriority(board, move, sideToMove)
        }));
        scored.sort((a, b) => b.score - a.score);

        if (cachedMove) {
            let idx = scored.findIndex(s => s.move[0] === cachedMove[0] && s.move[1] === cachedMove[1]);
            if (idx > 0) {
                const [item] = scored.splice(idx, 1);
                scored.unshift(item);
            }
        }
        return scored.map(s => s.move);
    }

    getCachedValue(entry, alpha, beta)
    {
        if (!entry) {
            return null;
        }
        if (entry.flag === "EXACT") {
            return entry.value;
        }
        if (entry.flag === "LOWER" && entry.value >= beta) {
            return entry.value;
        }
        if (entry.flag === "UPPER" && entry.value <= alpha) {
            return entry.value;
        }
        return null;
    }

    writeTransposition(key, value, depth, alphaOriginal, betaOriginal, bestMove)
    {
        if (this.transposition.size >= this.TT_MAX_SIZE) {
            this.transposition.clear();
        }

        let flag = "EXACT";
        if (value <= alphaOriginal) {
            flag = "UPPER";
        } else if (value >= betaOriginal) {
            flag = "LOWER";
        }

        this.transposition.set(key, { key, value, depth, flag, bestMove });
    }

    minimax(board)
    {
        if (this.terminal(board)) {
            return null;
        }

        const sideToMove = this.player(board);
        const depth = Math.max(1, this.SEARCH_DEPTH);
        let alpha = -Infinity;
        let beta = Infinity;
        let orderedMoves = this.orderMoves(board, this.actions(board), sideToMove, depth);

        let bestMove = null;
        let bestValue = sideToMove === this.X ? -Infinity : Infinity;

        for (const move of orderedMoves) {
            const nextBoard = this.result(board, move);
            const value = sideToMove === this.X
                ? this.min_value(nextBoard, alpha, beta, depth - 1)
                : this.max_value(nextBoard, alpha, beta, depth - 1);

            if (sideToMove === this.X) {
                if (value > bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
                alpha = Math.max(alpha, bestValue);
            } else {
                if (value < bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
                beta = Math.min(beta, bestValue);
            }
            // Deterministic tie-break: keep first move in sorted order.
        }

        return bestMove;
    }

    min_value(board, alpha = -Infinity, beta = Infinity, depth = this.SEARCH_DEPTH)
    {
        if (this.terminal(board)) {
            return this.terminalScore(board, depth);
        }
        if (depth === 0) {
            return this.evaluate(board);
        }

        const sideToMove = this.player(board);
        const key = this.ttKey(board, sideToMove, depth);
        const cached = this.transposition.get(key);
        const cachedValue = this.getCachedValue(cached, alpha, beta);
        if (cachedValue !== null) {
            return cachedValue;
        }

        const alphaOriginal = alpha;
        const betaOriginal = beta;
        let bestMove = null;
        let v = Infinity;

        for (const action of this.orderMoves(board, this.actions(board), sideToMove, depth)) {
            let value = this.max_value(this.result(board, action), alpha, beta, depth - 1);
            if (value < v) {
                v = value;
                bestMove = action;
            }
            beta = Math.min(beta, v);
            if (alpha >= beta) {
                break;
            }
        }

        this.writeTransposition(key, v, depth, alphaOriginal, betaOriginal, bestMove);
        return v;
    }

    max_value(board, alpha = -Infinity, beta = Infinity, depth = this.SEARCH_DEPTH)
    {
        if (this.terminal(board)) {
            return this.terminalScore(board, depth);
        }
        if (depth === 0) {
            return this.evaluate(board);
        }

        const sideToMove = this.player(board);
        const key = this.ttKey(board, sideToMove, depth);
        const cached = this.transposition.get(key);
        const cachedValue = this.getCachedValue(cached, alpha, beta);
        if (cachedValue !== null) {
            return cachedValue;
        }

        const alphaOriginal = alpha;
        const betaOriginal = beta;
        let bestMove = null;
        let v = -Infinity;

        for (const action of this.orderMoves(board, this.actions(board), sideToMove, depth)) {
            let value = this.min_value(this.result(board, action), alpha, beta, depth - 1);
            if (value > v) {
                v = value;
                bestMove = action;
            }
            alpha = Math.max(alpha, v);
            if (alpha >= beta) {
                break;
            }
        }

        this.writeTransposition(key, v, depth, alphaOriginal, betaOriginal, bestMove);
        return v;
    }
}
//  ----    //


const ttt = new Game(...Array.from({ length: 36 }, (_, i) => String(i)));
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById('reset');
const backBtn = document.getElementById('back');
const statusBox = document.getElementById('status');
let chosenSign = JSON.parse(sessionStorage.getItem("PlayerSign"));
let chosenDifficulty = JSON.parse(sessionStorage.getItem("Difficulty")) || "hard";
let currentBoard;

if (cells.length === 36 && resetBtn && backBtn && statusBox) {
    cells.forEach(cell => {
        cell.addEventListener("click", playerMove.bind(null, cell));
    });
    resetBtn.addEventListener("click", startGame);
    backBtn.addEventListener("click", ()=>{location.href = "./ttt-6x6.html";});
    startGame();
}


//  ----    //
function startGame() {
    statusBox.innerHTML = "6x6 Tic-Tac-Toe!"
    currentBoard = ttt.initialState();
    ttt.clearTransposition();
    cells.forEach(cell => {
        cell.classList.remove("winning-cell");
        cell.textContent = ttt.EMPTY;
    });
    checkFirstMove();
}

function findWinningLine(board) {
    const size = ttt.BOARD_SIZE;
    const len = ttt.WIN_LENGTH;
    const hasLine = (r, c, dr, dc) => {
        const first = board[r][c];
        if (first === ttt.EMPTY) {
            return null;
        }
        let coords = [[r, c]];
        for (let k = 1; k < len; k++) {
            const nr = r + dr * k;
            const nc = c + dc * k;
            if (board[nr][nc] !== first) {
                return null;
            }
            coords.push([nr, nc]);
        }
        return coords;
    };

    for (let r = 0; r < size; r++) {
        for (let c = 0; c <= size - len; c++) {
            const line = hasLine(r, c, 0, 1);
            if (line) { return line; }
        }
    }
    for (let c = 0; c < size; c++) {
        for (let r = 0; r <= size - len; r++) {
            const line = hasLine(r, c, 1, 0);
            if (line) { return line; }
        }
    }
    for (let r = 0; r <= size - len; r++) {
        for (let c = 0; c <= size - len; c++) {
            const line = hasLine(r, c, 1, 1);
            if (line) { return line; }
        }
    }
    for (let r = len - 1; r < size; r++) {
        for (let c = 0; c <= size - len; c++) {
            const line = hasLine(r, c, -1, 1);
            if (line) { return line; }
        }
    }
    return null;
}


function highlightWinningLine(board) {
    const line = findWinningLine(board);
    if (!line) {
        return;
    }
    line.forEach(([r, c]) => {
        cells[ttt.getIndex(r, c)].classList.add("winning-cell");
    });
}


function checkFirstMove() {
    let notChosen = chosenSign === null;
    if (notChosen) {
        alert("Error: You need to choose to play as X or O.");
        location.href = "./ttt-6x6.html";
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
        if (ttt.terminal(currentBoard)) { return; }
        AIMove();   
    }
}
// Make random move
async function AIMove() {
    statusBox.innerHTML = "thinking...";
    await new Promise(r => setTimeout(r, 10));
    let move = null;
    if (chosenDifficulty === "hard") {
        ttt.setSearchDepth(6);
        move = ttt.minimax(currentBoard);
    } else {
        await new Promise(r => setTimeout(r, 250));
        move = moveBasedOnDifficulty(chosenDifficulty)
    }
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
function moveBasedOnDifficulty(difficulty) {
    let allMoves = ttt.actions(currentBoard)
    if (allMoves.length === 0) {
        return null;
    }
    let randomMove = allMoves[Math.floor(Math.random() * allMoves.length)]
    switch (difficulty) {
        case "easy":
            if (Math.random() < 0.5) {
                return randomMove;
            }
            ttt.setSearchDepth(1);
            return ttt.minimax(currentBoard);
        case "medium":
            ttt.setSearchDepth(3);
            return ttt.minimax(currentBoard);
        default:
            return "";
    }
}

//Checks the current gamestate and updates the status message
function checkGameState() {
    let winner = ttt.checkWinner(currentBoard) ;
    let aiWon = winner === ttt.X && chosenSign === ttt.O || winner === ttt.O && chosenSign === ttt.X;
    let playerWon = winner === chosenSign;
    if (aiWon) {
        statusBox.innerHTML = "You lost!"
        highlightWinningLine(currentBoard);
        disableClick();
        return;
    } else if (playerWon) {
        statusBox.innerHTML = "You won!"
        highlightWinningLine(currentBoard);
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