using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe_AI.Models
{
    public class GameLogic
    {
        public const string X = "X";
        public const string O = "O";
        public const string EMPTY = " ";

        public List<List<Button>> ?Board;

        public List<List<Button>> InitialState
            (
            Button cell_TL, Button cell_TM, Button cell_TR,
            Button cell_ML, Button cell_MM, Button cell_MR,
            Button cell_BL, Button cell_BM, Button cell_BR
            )
        {
            var board = new List<List<Button>> 
            { 
                new List<Button> { cell_TL, cell_TM, cell_TR},
                new List<Button> { cell_ML, cell_MM, cell_MR},
                new List<Button> { cell_BL, cell_BM, cell_BR}
            };
            foreach (var row in board)
            {
                foreach (var cell in row)
                {
                    cell.Text = EMPTY;
                }
            }

            Board = board;
            return board;
        }
    }
}
