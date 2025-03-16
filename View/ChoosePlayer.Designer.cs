namespace TicTacToe_AI.View
{
    partial class ChoosePlayer
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            btn_PlayX = new Button();
            btn_PlayO = new Button();
            SuspendLayout();
            // 
            // btn_PlayX
            // 
            btn_PlayX.Location = new Point(66, 193);
            btn_PlayX.Name = "btn_PlayX";
            btn_PlayX.Size = new Size(98, 36);
            btn_PlayX.TabIndex = 0;
            btn_PlayX.Text = "Play as X";
            btn_PlayX.UseVisualStyleBackColor = true;
            // 
            // btn_PlayO
            // 
            btn_PlayO.Location = new Point(209, 193);
            btn_PlayO.Name = "btn_PlayO";
            btn_PlayO.Size = new Size(98, 36);
            btn_PlayO.TabIndex = 1;
            btn_PlayO.Text = "Play as O";
            btn_PlayO.UseVisualStyleBackColor = true;
            // 
            // MainScreen
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(384, 411);
            Controls.Add(btn_PlayO);
            Controls.Add(btn_PlayX);
            Name = "MainScreen";
            Text = "MainScreen";
            ResumeLayout(false);
        }

        #endregion

        private Button btn_PlayX;
        private Button btn_PlayO;
    }
}