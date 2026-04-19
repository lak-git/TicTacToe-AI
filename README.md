# Tic-Tac-Toe AI Game

## Overview

A simple, interactive Tic-Tac-Toe game where you can play against an AI opponent with multiple difficulty levels. The AI is powered by the Minimax algorithm, designed to make optimal decisions, providing a challenging and fun experience for the player.Install it on your device for an app‑like experience, complete with offline support.

---

## Game Features

* Minimax Algorithm: The AI uses the Minimax algorithm to simulate a perfect opponent. It recursively evaluates all possible moves and chooses the one that minimizes the player's potential to win.
* Interactive UI: The game board is made up of 9 cells that the player can click to make a move. The board updates in real-time, showing X or O as players make their moves.
* Difficulty Options: The user can choose between 3 difficulties Easy, Medium and Hard and based on the difficulty level the AI will play.

### 6x6 Tic-Tac-Toe Mode

* The 6x6 mode uses depth-limited Minimax with alpha-beta pruning and a transposition table.
* Default depth is controlled by `SEARCH_DEPTH` (set in the `Game` class, default `4`).
* You can set depth directly with `ttt.SEARCH_DEPTH = n` or `ttt.setSearchDepth(n)`.
* Difficulty mapping in 6x6 mode: `easy` = 50% random legal move, otherwise depth `1`; `medium` = deterministic depth `3`; `hard` = deterministic depth `5`.
* A manual, framework-free check page is available at `tests/manual-ai-checks.html`.
* The manual checks cover `checkWinner()`, legal `minimax()` moves, deterministic hard behavior, and timing samples for depths `1`, `3`, and `6`.

## Technologies Used

* HTML5 – Structure of the game interface.
* CSS3 – Styling for a simple and responsive design.
* JavaScript (Vanilla) – Logic for the game, including Minimax AI implementation, game state management, and event handling.
* Web App Manifest & Service Worker for offline support and installability.

---

## Contributing

Feel free to fork this project and make your own contributions. If you have any suggestions or improvements, open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
