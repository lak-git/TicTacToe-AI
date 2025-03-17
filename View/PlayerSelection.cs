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
    public partial class PlayerSelection : Form
    {
        private readonly GameController _gameController;

        public PlayerSelection(GameController gameController)
        {
            _gameController = gameController;

            InitializeComponent();
        }

        private void btn_PlayX_Click(object sender, EventArgs e)
        {
            var game = new Game(_gameController);
            game.Show();
            this.Hide();
        }
    }
}
