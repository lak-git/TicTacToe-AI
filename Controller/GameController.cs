using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicTacToe_AI.Models;

namespace TicTacToe_AI.Controller
{
    public class GameController
    {
        private readonly GameLogic _game;

        public List<List<Button>> ?Board;

        public GameController(GameLogic gameLogic)
        {
            _game = gameLogic;
        }

        public void NewGame
            (
            Button cell_TL, Button cell_TM, Button cell_TR,
            Button cell_ML, Button cell_MM, Button cell_MR,
            Button cell_BL, Button cell_BM, Button cell_BR
            )
        {
            Board = _game.InitialState(cell_TL, cell_TM, cell_TR, cell_ML, cell_MM, cell_MR, cell_BL, cell_BM, cell_BR);
        }
    }
}
