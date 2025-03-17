using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using TicTacToe_AI.Controller;

namespace TicTacToe_AI.View
{
    public partial class Game : Form
    {
        private readonly GameController _gameController;

        public Game(GameController gameController)
        {
            _gameController = gameController;

            InitializeComponent();
            _gameController.NewGame
                (
                    cell_TL, cell_TM, cell_TR,
                    cell_ML, cell_MM, cell_MR,
                    cell_BL, cell_BM, cell_BR
                );
        }

        private void cell_Click(object sender, EventArgs e)
        {
            var cell = (Button)sender;
            cell.Text = _gameController.PlayerMove();
        }

        private void btn_Restart_Click(object sender, EventArgs e)
        {
            _gameController.NewGame
                (
                    cell_TL, cell_TM, cell_TR,
                    cell_ML, cell_MM, cell_MR,
                    cell_BL, cell_BM, cell_BR
                );
        }
    }
}
