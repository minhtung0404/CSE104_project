# CSE104 project

Author: Long Vu + Tung Nguyen

## Table of content

- [Introduction](#introduction)
- [The original `2048` game](#first-game)
- [2048 Solitaire](#second-game)

## Introduction <a name="introduction"></a>

This client-side website is inspired by the very famous game `2048`. The `2048 series` contains two games (maybe we will add more game later):

- The original `2048`.
- `2048 Solitaire` - a combination of `2048` and another famous game - `Solitaire`.

## The original `2048` game <a name="first-game"></a>

### Game state

The game state is defined by a 4x4 matrix together with the highest score and the current score. This state can be store in the local storage so that if the players reload the website, they can still play the previous game.

### Merging

For merging tiles, we only implemented merging along the left direction. In order to get merging along the right, up, and down direction, we use the reverse/transpose of the board, merge along the left direction and change it back to the original state.

During every merging event, we changed the state of the board inside the JavaScript code first. After finish changing the state of the board, we update the HTML to match the board and store the new board to the local storage.

### Endgame

At the beginning, we set the winning state to `display: none` to make it hidden.

After every merging event, we check whether the game ends or not, that is the player got `2048` tile or they cannot make a merge action. If the game is ended, we will show `Game over` or `Victory` together with the `Try again` button by changing their `display`.

### How to play board

We created a `How to play` button. Whenever we hover on the button, the board will slowly disappear and the instruction will be shown. We used `requestAnimationFrame` to make the board slowly disappears by decreasing the CSS property `opacity` of the board. After the board disappears, we show the instruction.

### Show keys option

To make the game available with only a mouse or for playing with a phone, we added arrows key to the game. You can show or hide the key by pressing the `Show keys` button. The key is one arrow image and its rotation.

## `2048 Solitaire` <a name="second-game"></a>

### Game state

We represent the card using `div` and with the number inside using `p`. There are 4 columns corresponding to 4 blocks, inside each column, there's one div who is the bonus indicator who will appear later, another div that marks the bottom of a column for adding card. Each time adding card to a column, we append the `div` card into each `div` column. We have a `New game` button who resets the game state by erasing the columns and a `How to play` button that shows the instruction. We have 2 cards at the bottom, id `one` and id `two`, each time a card is placed, we push id `one` to id `two` and generate a new random card for id `one`.

### Merging cards




### Endgame


### How to play board


### Show keys option
