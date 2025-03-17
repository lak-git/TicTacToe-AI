using System;
using System.Threading.Tasks;

namespace TicTacToe_AI.Models
{
    public class Board
    {
        public List<List<Button>> Cells { get; private set; }

        public Board() { }
        public Board
            (
            Button cell_TL, Button cell_TM, Button cell_TR,
            Button cell_ML, Button cell_MM, Button cell_MR,
            Button cell_BL, Button cell_BM, Button cell_BR
            )
        {
            var cells = new List<List<Button>>
            {
                new List<Button> { cell_TL, cell_TM, cell_TR },
                new List<Button> { cell_ML, cell_MM, cell_MR },
                new List<Button> { cell_BL, cell_BM, cell_BR }
            };

            Cells = cells;
        }

        public Board DeepCopy()
        {
            Board newBoard = (Board)this.MemberwiseClone();
            return newBoard;
        }
    }
}
