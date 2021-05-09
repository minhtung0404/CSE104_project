# CSE104 project

Author: Long Vu + Tung Nguyen

## Introduction

This client-side website is inspired by the very famous game `2048`. The `2048 series` contains two games (maybe we will add more game later):

- The original `2048`.
- `2048 Solitaire` - a combination of `2048` and another famous game - `Solitaire`.

## The original `2048` game.

### Game state

The game state is defined by a 4x4 matrix together with the highest score and the current score. This state can be store in the local storage so that if the players reload the website, they can still play the previous game.

### Merging

For merging tiles, we only implemented merging along the left direction. In order to get merging along the right, up, and down direction, we use the reverse/transpose of the board, merge along the left direction and change it back to the original state.

During every merging event, we changed the state of the board inside the Javascript code first. After finish changing the state of the board, we update the HTML to match the board and store the new board to the local storage.

### Endgame

At the beginning, we set the winning state to `display: none` to make it hidden.

After every merging event, we check whether the game ends or not, that is the player got `2048` tile or they cannot make a merge action. If the game is ended, we will show `Game over` or `Victory` together with the `Try again` button by changing their `display`.

### How to play board

We created a `How to play` button. Whenever we hover on the button, the board will slowly disappear and the instruction will be shown. We used `requestAnimationFrame` to make the board slowly diappears by decreasing the CSS property `opacity` of the board. After the board disappears, we show the instruction.

### Show keys option

To make the game avaiable with only a mouse or for playing with a phone, we added arrows key to the game. You can show or hide the key by pressing the `Show keys` button. The key is one arrow image and its rotation.