using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe_AI.Models
{
    public class GameLogic
    {
        public const string X = "X";
        public const string O = "O";
        public const string EMPTY = " ";

        public Board InitialState
            (
            Button cell_TL, Button cell_TM, Button cell_TR,
            Button cell_ML, Button cell_MM, Button cell_MR,
            Button cell_BL, Button cell_BM, Button cell_BR
            )
        {
            var board = new Board
                (
                    cell_TL, cell_TM, cell_TR,
                    cell_ML, cell_MM, cell_MR,
                    cell_BL, cell_BM, cell_BR
                );

            foreach (var row in board.Cells)
            {
                foreach (var cell in row)
                {
                    cell.Text = EMPTY;
                }
            }

            return board;
        }

        public string CurrentPlayer(Board board)
        {
            int xCount = 0;
            int oCount = 0;
            foreach (var row in board.Cells)
            {
                foreach (var cell in row)
                {
                    if (cell.Text == X) { xCount++; }
                    else if (cell.Text == O) {  oCount++; }
                }
            }

            if (xCount == oCount)
            {
                return X;
            }
            else if (xCount > oCount)
            {
                return O;
            }
            else
            {
                throw new Exception("Invalid Player State");
            }
        }

        public string DetermineWinner(Board boardState)
        {
            var board = boardState.Cells;

            // Check rows
            foreach (var row in board)
            {
                if (row[0].Text.Equals(row[1].Text.Equals(row[2].Text)) && !row[0].Text.Equals(EMPTY))
                {
                    return row[0].Text;
                }
            }

            // Check columns
            for (int column = 0; column < 3; column++)
            {
                if (
                board[0][column].Text.Equals(board[1][column].Text.Equals(board[2][column].Text)) && !board[0][column].Text.Equals(EMPTY))
                {
                    return board[0][column].Text;
                }
            }

            //Check diagonals
            if (board[0][0].Text.Equals(board[1][1].Text.Equals(board[2][2].Text)) && !board[0][0].Text.Equals(EMPTY))
            {
                return board[0][0].Text;
            }
            else if (board[0][2].Text.Equals(board[1][1].Text.Equals(board[0][2].Text)) && !board[0][2].Text.Equals(EMPTY))
            {
                return board[0][2].Text;
            }

            return null;
        }

        public List<Button> Actions(Board board)
        {
            var moves = new List<Button>() { };
            foreach (var row in board.Cells)
            {
                foreach (var cell in row)
                {
                    if (cell.Text.Equals(EMPTY))
                    {
                        moves.Add(cell);
                    }
                }
            }

            return moves;
        }

        public Board Result(Board board, Button action)
        {
            var actions = Actions(board);
            foreach (var cell in actions)
            {
                if (!cell.Name.Equals(action.Name))
                {
                    throw new Exception("Invalid Action.");
                }
            }

            var newBoard = board.DeepCopy();
            foreach (var row in newBoard.Cells)
            {
                foreach (var cell in row)
                {
                    cell.Text = this.CurrentPlayer(board);
                }
            }

            return newBoard;
        }

        public bool Terminal(Board board)
        {
            var winner = this.DetermineWinner(board);
            if (winner.Equals(X) || winner.Equals(O))
            {
                return true;
            }

            foreach (var row in board.Cells)
            {
                foreach (var cell in row)
                {
                    if (cell.Text.Equals(EMPTY))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
