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

let maxCard = 3;

main()

function main() {
  const card = document.querySelector("#two");
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
  const curs = document.querySelectorAll('.cur');
  curs.forEach(cur => {
    cur.addEventListener('dragenter', dragEnter);
    cur.addEventListener('dragover', dragOver);
    cur.addEventListener('dragleave', dragLeave);
    cur.addEventListener('drop', drop);
  });
}

function dragEnd(e) {
  const lmao = e.dataTransfer.dropEffect;
  console.log(lmao);
  if (lmao == "none")//we keep the same card
    e.target.classList.remove('hide');
  else {//we replace with new card
    const newCard = document.createElement('div');
    newCard.id = "two";
    newCard.classList.add('card_tail');
    newCard.style.left = "100px";
    newCard.setAttribute("draggable", "true");
    const newNum = document.createElement('p');
    newNum.id = "twoCard";
    newNum.classList.add('card_number');
    newNum.textContent = 2;
    newCard.append(newNum);
    const tail = document.querySelector('#tail');
    tail.append(newCard);
    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('dragend', dragEnd);
    generateCard(maxCard);
  }
}

function dragEnter(e) {
  console.log('dragOver');
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  console.log('dragOver');
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  console.log('dragLeave');
  e.target.classList.remove('drag-over');
}

function drop(e) {
  console.log('drop');

  const card = document.querySelector("#two");//card that we have
  const len = e.currentTarget.style.top.length;
  let top = Number(e.currentTarget.style.top.slice(0, len - 2));//we inspect the top attribute

  e.target.classList.remove('cur');
  card.classList.add('cur');//the new card is now the current card in our column

  const column = document.querySelector(`#c${e.target.getAttribute('value')}`);
  column.appendChild(card);//add this card to the right column

  /*
  Initializing the new card in the column.
  */
  card.classList.remove('hide');
  card.classList.remove('card_tail');
  card.classList.add('card');
  card.children[0].removeAttribute('id');
  card.removeAttribute('id');
  card.removeAttribute("draggable");
  if (e.currentTarget.getAttribute("top") == "1")
    top = -30;
  card.style.top = `${top + 30}px`;
  card.top = 0;
  card.style.left = "";
  card.setAttribute("value", e.target.getAttribute('value'));

  e.target.classList.remove('drag-over');//forgot what this does but it's important to keep it here
  card.addEventListener('dragenter', dragEnter);
  card.addEventListener('dragover', dragOver);
  card.addEventListener('dragleave', dragLeave);
  card.addEventListener('drop', drop);

  //remove all the listener from the previous card
  e.target.removeEventListener('dragenter', dragEnter);
  e.target.removeEventListener('dragover', dragOver);
  e.target.removeEventListener('dragleave', dragLeave);
  e.target.removeEventListener('drop', drop);
}

function dragStart(e) {
  console.log('dragStart');
  setTimeout(() => {
        e.target.classList.add('hide');
    });
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
  console.log('lmao');
  newCard = document.querySelector("#one");
  const num = Math.pow(2, getRandomInt(maxCard - 1) + 1);
  newCard.style.background = cardColor[num];
  newCard = document.querySelector("#oneCard");
  newCard.textContent = num;
}
