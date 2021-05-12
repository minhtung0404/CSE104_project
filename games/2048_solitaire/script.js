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
  2058: 'Gold',
};

const bonusColor = {
  2 : 'blue',
  3 : 'orange',
  4 : 'red',
  5 : 'green',
  6 : 'purple',
  7 : 'cyan',
  8 : 'gold',
};

const myStorage = window.localStorage;

let score_number = Number(document.querySelector('#score_number').textContent);
let best_score_number = Number(document.querySelector('#best_score_number').textContent);

let howtoplayState = 0;

let maxCard = 3;

main();

function main() {
  //Best score storage.//
  if (myStorage.getItem("maxScore") !== null) {
      const maxScore = JSON.parse(myStorage.getItem("maxScore"));
      const best_score = document.querySelector('#best_score_number');
      best_score.textContent = String(maxScore);
      best_score_number = Number(document.querySelector('#best_score_number').textContent);
  }

  //Restart button.//
  const restartButton = document.querySelector("#restart_button");
  restartButton.addEventListener('click', restart);

  //How to play button.//
  const howtoplayButton = document.querySelector("#how_to_play_button");
  howtoplayButton.addEventListener('click', howtoplay);

  //Drag and drop cards//
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

function howtoplay(event) {
  /*
  This function enables/disables the how to play description through the how to play button.
  */
  const columns = document.querySelectorAll(".column");
  const win = document.querySelector("#win");
  const lose = document.querySelector("#lose");
  const howtoplay = document.querySelector("#how_to_play");
  if (howtoplayState == 0) {
    howtoplayState = 1 - howtoplayState;
    for(const column of columns)
      column.style.display = "none";
    win.style.display = "none";
    lose.style.display = "none";
    howtoplay.style.display = "block";
  }
  else {
    howtoplayState = 1 - howtoplayState;
    howtoplay.style.display = "none";
    if (maxCard >= 11)
      CWin();
    else {
      let ok = 1;
      for(const column of columns) {
        const n = column.children.length;
        if (n < 10)
          ok = 0;
        else {
          const card = document.querySelector("#two");
          if (column.lastChild.textContent == card.lastChild.textContent)
            ok = 0;
        }
      }

      if (ok == 0) {
        const columns = document.querySelectorAll(".column");
        for(const column of columns)
          column.style.display = "block";
        return ;
      }

      CLose();
    }
  }
}

function restart(event) {
  /*
  This function restarts the game via the new game button.
  */
  maxCard = 3;

  const howtoplay = document.querySelector("#how_to_play");
  howtoplay.style.display = "none";

  const columns = document.querySelectorAll(".column");
  for(const column of columns) {
    while (column.children.length > 2)
      column.removeChild(column.lastChild);
    column.children[1].classList.add('cur');
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
  score.textContent = "0";
  score_number = Number(document.querySelector('#score_number').textContent);

  const curs = document.querySelectorAll('.cur');
  curs.forEach(cur => {
    cur.addEventListener('dragenter', dragEnter);
    cur.addEventListener('dragover', dragOver);
    cur.addEventListener('dragleave', dragLeave);
    cur.addEventListener('drop', drop);
  });

  for(const column of columns)
    column.style.display = "block";
  const win = document.querySelector("#win");
  win.style.display = "none";
  const lose = document.querySelector("#lose");
  lose.style.display = "none";
  const card = document.querySelector("#two");
  card.setAttribute("draggable", "true");
}

function dragStart(e) {
  //Part of the drag and drop scheme.//
  setTimeout(() => {
        e.target.classList.add('hide');
    });
}

function dragEnd(e) {
  //Part of the drag and drop scheme.//
  const effect = e.dataTransfer.dropEffect;

  if (effect == "none") {//we keep the same card//
    e.target.classList.remove('hide');

    const card = document.querySelector("#two");
    if (maxCard >= 11) {
      card.setAttribute("draggable", "false");
      setTimeout(CWin, 1700);
    }
    else {
      let ok = 1;

      const columns = document.querySelectorAll(".column");
      for(const column of columns) {
        const n = column.children.length;
        if (n < 10)
          ok = 0;
        else {
          if (column.children[n - 1].textContent == column.children[n - 2].textContent)
            ok = 0;
          if (column.lastChild.textContent == card.lastChild.textContent)
            ok = 0;
        }
      }

      if (ok == 0)
        return ;

      card.setAttribute("draggable", "false");
      setTimeout(CLose, 1500);
    }
  }
  else {//we replace with new card//
    const newCard = document.createElement('div');
    newCard.id = "two";
    newCard.classList.add('card_tail');
    newCard.style.left = "200px";
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

    const card = document.querySelector("#two");
    if (maxCard >= 5) {
      card.setAttribute("draggable", "false");
      setTimeout(CWin, 1700);
    }
    else {
      let ok = 1;

      const columns = document.querySelectorAll(".column");
      for(const column of columns) {
        const n = column.children.length;
        if (n < 10)
          ok = 0;
        else {
          if (column.children[n - 1].textContent == column.children[n - 2].textContent)
            ok = 0;
          if (column.lastChild.textContent == card.lastChild.textContent)
            ok = 0;
        }
      }

      if (ok == 0)
        return ;

      card.setAttribute("draggable", "false");
      setTimeout(CLose, 1500);
    }
  }
}

function dragEnter(e) {
  //Part of the drag and drop scheme.//
  if (e.target.tagName != "DIV")
    return ;

  const value = e.target.getAttribute('data-value');//the current column//
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have//

  if (column.children.length == 10) {//the column is full and we're checking the last card of the column//
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  //Part of the drag and drop scheme.//
  if (e.target.tagName != "DIV")
    return ;

  const value = e.target.getAttribute('data-value');//the current column//
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have//

  if (column.children.length == 10) {//the column is full and we're checking the last card of the column//
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  //Part of the drag and drop scheme.//
  if (e.target.tagName != "DIV")
    return ;

  const value = e.target.getAttribute('data-value');//the current column//
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have//

  if (column.children.length == 10) {//the column is full and we're checking the last card of the column//
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  e.target.classList.remove('drag-over');
}

function drop(e) {
  //Part of the drag and drop scheme.//
  if (e.target.tagName != "DIV")
    return ;

  const value = e.target.getAttribute('data-value');//the current column//
  var column = document.querySelector(`#c${value}`);
  const card = document.querySelector("#two");//card that we have//

  if (column.children.length == 10) {//the column is full and we're checking the last card of the column//
    if (card.children[0].textContent != e.target.children[0].textContent)
      return ;
  }

  const len = e.currentTarget.style.top.length;
  let top = Number(e.currentTarget.style.top.slice(0, len - 2));//we inspect the top attribute//

  e.target.classList.remove('cur');
  card.classList.add('cur');//the new card is now the current card in our column//
  column.appendChild(card);//add this card to the right column//

  //Initializing the new card in the column.//
  card.classList.remove('hide');
  card.classList.remove('card_tail');
  card.classList.add('card');
  card.children[0].removeAttribute('id');
  card.removeAttribute('id');
  card.removeAttribute("draggable");

  if (e.currentTarget.getAttribute("data-top") == "1")
    top = -30;

  card.style.top = `${top + 30}px`;
  card.style.left = "";
  card.setAttribute("data-value", e.target.getAttribute('data-value'));

  e.target.classList.remove('drag-over');//forgot what this does but it's important to keep it here//
  card.addEventListener('dragenter', dragEnter);
  card.addEventListener('dragover', dragOver);
  card.addEventListener('dragleave', dragLeave);
  card.addEventListener('drop', drop);

  //remove all the listener from the previous card//
  e.target.removeEventListener('dragenter', dragEnter);
  e.target.removeEventListener('dragover', dragOver);
  e.target.removeEventListener('dragleave', dragLeave);
  e.target.removeEventListener('drop', drop);

  var children = column.children;
  var n = children.length;

  if (n == 3)//the case where there's only one card//
    return ;

  if (Number(children[n - 1].children[0].textContent) == Number(children[n - 2].children[0].textContent)) {
      //the cards propagating upward//
      let bonus = 1;
      requestAnimationFrame(cardMove);
      function cardMove(curTime) {
        const newNum = Number(children[n - 1].children[0].textContent) * 2;

        const limTop = Number(children[n - 2].style.top.slice(0, children[n - 2].style.top.length - 2));
        maxCard = Math.max(maxCard, Math.log2(newNum));

        if (bonus >= 2) {
          const box = document.querySelector(`#box${value}`);
          box.children[0].textContent = `${bonus}x`;
          box.style.top = `${limTop + 40}px`;
          box.style.display = "block";
          box.style.background = bonusColor[bonus];
        }

        const card = column.lastChild;
        const len = card.style.top.length;
        const curTop = Number(card.style.top.slice(0, len - 2));
        card.style.top = `${curTop - 1.8}px`;

        if (curTop - 1.8 > limTop)
           requestAnimationFrame(cardMove);
        else {
          card.style.top = `${limTop}px`;
          const box = document.querySelector(`#box${value}`);
          box.style.top = `${0}px`;
          box.style.display = "none";

          score_number += newNum * bonus;
          const score = document.querySelector('#score_number');
          score.textContent = String(score_number);
          if (score_number > best_score_number) {
            best_score_number = Math.max(best_score_number, score_number);
            const best_score = document.querySelector('#best_score_number');
            best_score.textContent = String(best_score_number);
            myStorage.setItem("maxScore", JSON.stringify(best_score_number));
          }

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

          if (maxCard >= 5) {
            const card = document.querySelector("#two");
            card.setAttribute("draggable", "false");
            setTimeout(CWin, 1700);
            return ;
          }

          if (n == 3)
            return ;

          if (Number(children[n - 1].children[0].textContent) == Number(children[n - 2].children[0].textContent)) {
            bonus += 1;
            requestAnimationFrame(cardMove);
          }
        }
      }
  }
}

function CWin() {
  //Enable the winning screen//
  const columns = document.querySelectorAll(".column");
  for(const column of columns)
    column.style.display = "None";
  const win = document.querySelector("#win");
  win.style.display = "block";
}

function CLose() {
  //Enable the winning screen//
  const columns = document.querySelectorAll(".column");
  for(const column of columns)
    column.style.display = "None";
  const lose = document.querySelector("#lose");
  lose.style.display = "block";
}

function generateCard(maxCard) {
  //Generate a new card everytime a card is placed, the range is from 1 to maxCard//

  function getRandomInt(num) {
    return Math.floor(Math.random() * num);
  }

  let newCard = document.querySelector("#oneCard");

  //Shift first card to second card//
  let oldCard = document.querySelector("#two");
  oldCard.style.background = cardColor[newCard.textContent];
  oldCard = document.querySelector("#twoCard");
  oldCard.textContent = newCard.textContent;

  //New card at position one.//
  newCard = document.querySelector("#one");
  const num = Math.pow(2, getRandomInt(Math.min(maxCard, 6)) + 1);
  newCard.style.background = cardColor[num];
  newCard = document.querySelector("#oneCard");
  newCard.textContent = num;
}
