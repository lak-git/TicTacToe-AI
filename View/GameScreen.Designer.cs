namespace TicTacToe_AI.View
{
    partial class GameScreen
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
            btn_Restart = new Button();
            cell_TL = new Button();
            cell_TM = new Button();
            cell_TR = new Button();
            cell_MR = new Button();
            cell_MM = new Button();
            cell_ML = new Button();
            cell_BR = new Button();
            cell_BM = new Button();
            cell_BL = new Button();
            SuspendLayout();
            // 
            // btn_Restart
            // 
            btn_Restart.Location = new Point(140, 339);
            btn_Restart.Name = "btn_Restart";
            btn_Restart.Size = new Size(98, 36);
            btn_Restart.TabIndex = 1;
            btn_Restart.Text = "Restart Game";
            btn_Restart.UseVisualStyleBackColor = true;
            // 
            // cell_TL
            // 
            cell_TL.FlatAppearance.BorderSize = 5;
            cell_TL.Font = new Font("Microsoft Sans Serif", 36F);
            cell_TL.Location = new Point(72, 63);
            cell_TL.Name = "cell_TL";
            cell_TL.Size = new Size(75, 75);
            cell_TL.TabIndex = 2;
            cell_TL.Text = " ";
            cell_TL.UseVisualStyleBackColor = false;
            // 
            // cell_TM
            // 
            cell_TM.FlatAppearance.BorderSize = 5;
            cell_TM.Font = new Font("Microsoft Sans Serif", 36F);
            cell_TM.Location = new Point(153, 63);
            cell_TM.Name = "cell_TM";
            cell_TM.Size = new Size(75, 75);
            cell_TM.TabIndex = 3;
            cell_TM.Text = " ";
            cell_TM.UseVisualStyleBackColor = false;
            // 
            // cell_TR
            // 
            cell_TR.FlatAppearance.BorderSize = 5;
            cell_TR.Font = new Font("Microsoft Sans Serif", 36F);
            cell_TR.Location = new Point(234, 63);
            cell_TR.Name = "cell_TR";
            cell_TR.Size = new Size(75, 75);
            cell_TR.TabIndex = 4;
            cell_TR.Text = " ";
            cell_TR.UseVisualStyleBackColor = false;
            // 
            // cell_MR
            // 
            cell_MR.FlatAppearance.BorderSize = 5;
            cell_MR.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_MR.Location = new Point(234, 144);
            cell_MR.Name = "cell_MR";
            cell_MR.Size = new Size(75, 75);
            cell_MR.TabIndex = 7;
            cell_MR.Text = " ";
            cell_MR.UseVisualStyleBackColor = false;
            // 
            // cell_MM
            // 
            cell_MM.FlatAppearance.BorderSize = 5;
            cell_MM.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_MM.Location = new Point(153, 144);
            cell_MM.Name = "cell_MM";
            cell_MM.Size = new Size(75, 75);
            cell_MM.TabIndex = 6;
            cell_MM.Text = " ";
            cell_MM.UseVisualStyleBackColor = false;
            // 
            // cell_ML
            // 
            cell_ML.FlatAppearance.BorderSize = 5;
            cell_ML.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_ML.Location = new Point(72, 144);
            cell_ML.Name = "cell_ML";
            cell_ML.Size = new Size(75, 75);
            cell_ML.TabIndex = 5;
            cell_ML.Text = " ";
            cell_ML.UseVisualStyleBackColor = false;
            // 
            // cell_BR
            // 
            cell_BR.FlatAppearance.BorderSize = 5;
            cell_BR.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_BR.Location = new Point(234, 225);
            cell_BR.Name = "cell_BR";
            cell_BR.Size = new Size(75, 75);
            cell_BR.TabIndex = 10;
            cell_BR.Text = " ";
            cell_BR.UseVisualStyleBackColor = false;
            // 
            // cell_BM
            // 
            cell_BM.FlatAppearance.BorderSize = 5;
            cell_BM.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_BM.Location = new Point(153, 225);
            cell_BM.Name = "cell_BM";
            cell_BM.Size = new Size(75, 75);
            cell_BM.TabIndex = 9;
            cell_BM.Text = " ";
            cell_BM.UseVisualStyleBackColor = false;
            // 
            // cell_BL
            // 
            cell_BL.FlatAppearance.BorderSize = 5;
            cell_BL.Font = new Font("Microsoft Sans Serif", 39.75F);
            cell_BL.Location = new Point(72, 225);
            cell_BL.Name = "cell_BL";
            cell_BL.Size = new Size(75, 75);
            cell_BL.TabIndex = 8;
            cell_BL.Text = " ";
            cell_BL.UseVisualStyleBackColor = false;
            // 
            // GameScreen
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(384, 411);
            Controls.Add(cell_BR);
            Controls.Add(cell_BM);
            Controls.Add(cell_BL);
            Controls.Add(cell_MR);
            Controls.Add(cell_MM);
            Controls.Add(cell_ML);
            Controls.Add(cell_TR);
            Controls.Add(cell_TM);
            Controls.Add(cell_TL);
            Controls.Add(btn_Restart);
            Name = "GameScreen";
            Text = "GameScreen";
            ResumeLayout(false);
        }

        #endregion

        private Button btn_Restart;
        private Button cell_TL;
        private Button cell_TM;
        private Button cell_TR;
        private Button cell_MR;
        private Button cell_MM;
        private Button cell_ML;
        private Button cell_BR;
        private Button cell_BM;
        private Button cell_BL;
    }
}