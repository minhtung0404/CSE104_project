"use strict";

const cardColor = {
  2 : 'grey',
  4 : 'yellow',
  8 : 'orange',
  16: 'red',
  32: 'green',
  64: 'purple',
  128: 'GreenYellow',
  256: 'LightSalmon',
  512: 'LightSkyBlue',
  1024: 'Magenta',
  2048: 'Gold',
}

main()

function main() {

}

function generateCard(maxCard) {
  /*
  Generate a new card everytime a card is placed.
  */
  function getRandomInt(num) {
    return Math.floor(Math.random() * num);
  }

  let newCard = document.querySelector("#oneCard");
  /*
  Shift first card to second card.
  */
  let oldCard = document.querySelector("#two");
  oldCard.style.background = cardColor[newCard.textContent];
  oldCard = document.querySelector("#twoCard");
  oldCard.textContent = newCard.textContent;
  /*
  New card at position one.
  */
  newCard = document.querySelector("#one");
  const num = Math.pow(2, getRandomInt(maxCard - 1) + 1);
  newCard.style.background = cardColor[num];
  newCard = document.querySelector("#oneCard");
  newCard.textContent = num;
}
