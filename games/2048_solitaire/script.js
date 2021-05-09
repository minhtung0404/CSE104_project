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

var maxCard = 3;
var discard = document.querySelector('#discard');

main()

function main() {
  /*
  Restart button
  */
  const restartButton = document.querySelector("#restart_button");
  restartButton.addEventListener('click', restart);
  /*
  Discard
  */
  discard.addEventListener('dragenter', discard_dragEnter);
  discard.addEventListener('dragover', discard_dragOver);
  discard.addEventListener('dragleave', discard_dragLeave);
  discard.addEventListener('drop', discard_drop);

  /*
  Drag and drop cards
  */
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

function discard_dragEnter(e) {
  if (discard !== e.target) return;
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function discard_dragOver(e) {
  if (discard !== e.target) return;
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function discard_dragLeave(e) {
  if (discard !== e.target) return;
  e.target.classList.remove('drag-over');
}

function discard_drop(e) {
  if (discard !== e.target) return;
  e.target.classList.remove('drag-over');//forgot what this does but it's important to keep it here
}

function restart(event) {
  const columns = document.querySelectorAll(".column");
  for(const column of columns) {
    while (column.children.length > 1)
      column.removeChild(column.lastChild);
    column.children[0].classList.add('cur');
  }
  let one = document.querySelector("#oneCard");
  one.textContent = 2;
  let two = document.querySelector("#twoCard");
  two.textContent = 2;
  one = document.querySelector("#one");
  one.style.background = 'grey';
  two = document.querySelector("#two");
  two.style.background = 'grey';
  const score = document.querySelector("#score_number");
  score.textContent = 0;
  const curs = document.querySelectorAll('.cur');
  curs.forEach(cur => {
    cur.addEventListener('dragenter', dragEnter);
    cur.addEventListener('dragover', dragOver);
    cur.addEventListener('dragleave', dragLeave);
    cur.addEventListener('drop', drop);
  });
}

function dragStart(e) {
  //console.log('dragStart');
  setTimeout(() => {
        e.target.classList.add('hide');
    });
}

function dragEnd(e) {
  const lmao = e.dataTransfer.dropEffect;
  //console.log(lmao);
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
  const value = e.target.getAttribute('value');//the current column
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have

  if (column.children.length == 9) {
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

//  console.log('dragEnter');
  if (e.target.tagName != "DIV")
    return ;
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  const value = e.target.getAttribute('value');//the current column
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have

  if (column.children.length == 9) {
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  //console.log('dragOver');
  if (e.target.tagName != "DIV")
    return ;
  //console.log(e.target.tagName);
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  const value = e.target.getAttribute('value');//the current column
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have

  if (column.children.length == 9) {
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  if (e.target.tagName != "DIV")
    return ;
  //console.log(e.target.tagName);
  //console.log('dragLeave');
  e.target.classList.remove('drag-over');
}

function drop(e) {
  //console.log('drop');
  const value = e.target.getAttribute('value');//the current column
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have

  if (column.children.length == 9) {
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }
  if (e.target.tagName != "DIV")
    return ;
  const len = e.currentTarget.style.top.length;
  let top = Number(e.currentTarget.style.top.slice(0, len - 2));//we inspect the top attribute

  e.target.classList.remove('cur');
  card.classList.add('cur');//the new card is now the current card in our column

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

  var children = column.children;
  var n = children.length;

  if (n == 2)//the case where there's only one card.
    return ;

  if (Number(children[n - 1].children[0].textContent) == Number(children[n - 2].children[0].textContent)) {
    //the cards propagating upward
      requestAnimationFrame(cardMove);
      function cardMove(curTime) {
        const newNum = Number(children[n - 1].children[0].textContent) * 2;
        const limTop = Number(children[n - 2].style.top.slice(0, children[n - 2].style.top.length - 2));
        maxCard = Math.max(maxCard, Math.log2(newNum));

        const card = column.lastChild;
        const len = card.style.top.length;
        const curTop = Number(card.style.top.slice(0, len - 2));

        card.style.top = `${curTop - 3}px`;
        if (curTop - 3 > limTop)
           requestAnimationFrame(cardMove);
        else {
          column.removeChild(column.lastChild);
          const prevCard = column.lastChild;
          prevCard.children[0].textContent = String(newNum);
          prevCard.style.background = cardColor[newNum];
          prevCard.addEventListener('dragenter', dragEnter);
          prevCard.addEventListener('dragover', dragOver);
          prevCard.addEventListener('dragleave', dragLeave);
          prevCard.addEventListener('drop', drop);
          prevCard.classList.add('cur');

          n = children.length;
          if (n == 2)
            return ;

          if (Number(children[n - 1].children[0].textContent) == Number(children[n - 2].children[0].textContent))
            requestAnimationFrame(cardMove);
        }
      }
  }
}

function generateCard(maxCard) {
  /*
  Generate a new card everytime a card is placed.
  The range is from 1 to maxCard.
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
  const num = Math.pow(2, getRandomInt(Math.min(maxCard, 6)) + 1);
  newCard.style.background = cardColor[num];
  newCard = document.querySelector("#oneCard");
  newCard.textContent = num;
}
