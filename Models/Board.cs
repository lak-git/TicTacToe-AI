using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToe_AI.Models
{
    public class Board
    {
        public List<List<Button>> Cells { private set; get; }

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
            var newBoard = new List<List<Button>>
            {
                new List<Button> { new Button(), new Button(), new Button() },
                new List<Button> { new Button(), new Button(), new Button() },
                new List<Button> { new Button(), new Button(), new Button() }
            };
            foreach (var newRow in newBoard)
            {
                foreach (var row in Cells)
                {
                    newRow[0].Name = row[0].Name; newRow[0].Text = row[0].Text;
                    newRow[1].Name = row[1].Name; newRow[1].Text = row[1].Text;
                    newRow[2].Name = row[2].Name; newRow[2].Text = row[2].Text;
                }
            }

            return new Board() { Cells = newBoard };
        }
    }
}
