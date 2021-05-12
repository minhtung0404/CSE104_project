"use strict";

const arrowUpElement = document.querySelector(".up");
const arrowLeftElement = document.querySelector(".left");
const arrowDownElement = document.querySelector(".down");
const arrowRightElement = document.querySelector(".right");
const myStorage = window.localStorage;

const color = ["#CDC1B4", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72", "#edcc61", "#edc850", "#edc53f", "#edc22e"];
const textColorGreater3 = "#f9f6f2";

// The board state that will be saved to local storage
let boardState = {
    val : [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    score : 0,
    highestScore: 0,
};

// represent how many times we need to increase or decrease its opacity
let howtoplay = {
    appear: 0,
    disappear: 0
}

main();

// main function that will be executed when the page is loaded
function main(){
    const howtoplayElement = document.querySelector('#how_to_play');

    // add restart, try again and show arrow event
    document.querySelector("#restart_button").addEventListener("click", (event) => {new_game();});
    document.querySelector("#try_again").addEventListener("click", (event) => {new_game();});
    document.querySelector("#show_arrow").addEventListener("click", showArrowClickEvent);
    
    // add hover event to show how to play
    howtoplayElement.addEventListener("mouseover", _howtoplayAppearEvent);
    howtoplayElement.addEventListener("mouseout", _howtoplayDisappearEvent);

    // delete default event for moving the page
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    // add keyboard event for merging 2048 board
    document.addEventListener("keydown", (event) => {
        let key = event.key || event.keyCode;
        if (key == 'r' || key === 82) new_game();
    });

    // load board storage from local storage if there is any
    if (myStorage.getItem("boardState") !== null){
        boardState = JSON.parse(myStorage.getItem("boardState"));
        if (!is_end() && !is_win()) addMoveEventListener();
        // update the html to be matched with the board state
        update_board();
    }
    else {
        new_game();
    }
}

// show arrow event
function showArrowClickEvent(event){
    const controlArrowElement = document.querySelector('.control_arrow');

    // enable/disable class hidden
    if (controlArrowElement.classList.contains("hidden")){
        controlArrowElement.classList.remove("hidden");
    }
    else{
        controlArrowElement.classList.add("hidden");
    }
}

// keyboard event for merging 2048 board
function _keyboardEvent(event) {
    let key = event.key || event.keyCode;
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(key) || event.keyCode < 37 || event.keyCode > 40) return;
    mergeEvent(event, key);
}

// we created event in order to delete it later (instead of using lambda)
// keyboard up event 
function _upEvent(event){
    mergeEvent(event, "ArrowUp");
}

// keyboard left event
function _leftEvent(event){
    mergeEvent(event, "ArrowLeft");
}

// keyboard down event
function _downEvent(event){
    mergeEvent(event, "ArrowDown");
}

// keyboard right event
function _rightEvent(event){
    mergeEvent(event, "ArrowRight");
}

// For showing the board, we save number of time we increase/decrease the opacity
// in order to avoid bug when user hover and stop immediately.

// Because we fix number of time it will increase/decrease, the amount of opacity
// we increase/decrease is fixed.

// event to make how to play appear
function _howtoplayAppearEvent(event){
    // remove keyboard listener to avoid mispressing keyboard when reading instruction
    if (!is_end() && !is_win()) removeMoveEventListener();
    // run requestAnimationFrame 50 times to decrease the opacity
    howtoplay.appear += 50;
    requestAnimationFrame(howtoplayAppear);
}

// event to make how to play disappear
function _howtoplayDisappearEvent(event){
    // add key board listener back
    if (!is_end() && !is_win()) addMoveEventListener();
    // hide intruction
    document.querySelector("#instruction").style.opacity = 0;
    // run requestAnimationFrame 50 times to increase the opacity
    howtoplay.disappear += 50;
    requestAnimationFrame(howtoplayDisappear);
}

// function for requestAnimationFrame
function howtoplayAppear(currentTime){
    const boardElement = document.querySelector("#game_board");
    const controlElement = document.querySelector(".control_arrow");
    // if we finish hiding the board, we stop
    if (howtoplay.appear === 0) {
        // if the board opacity is less than 0, show instruction
        if (parseFloat(boardElement.style.opacity) <= 0) {
            document.querySelector("#instruction").style.opacity = 1;
        }
        return;
    }

    // decrease the opacity of the board
    boardElement.style.opacity = parseFloat(boardElement.style.opacity) - 0.02;
    controlElement.style.opacity = parseFloat(controlElement.style.opacity) - 0.02;
    howtoplay.appear--;
    requestAnimationFrame(howtoplayAppear);
}

// function for requestAnimationFrame
function howtoplayDisappear(currentTime){
    const boardElement = document.querySelector("#game_board");
    const controlElement = document.querySelector(".control_arrow");
    // if we finish showing the board, we stop
    if (howtoplay.disappear === 0) return;

    // increase board opacity
    boardElement.style.opacity = parseFloat(boardElement.style.opacity) + 0.02;
    controlElement.style.opacity = parseFloat(controlElement.style.opacity) + 0.02;  
    howtoplay.disappear--; 
    requestAnimationFrame(howtoplayDisappear);
}

// save the new board state to local storage
function save_state(){
    myStorage.setItem("boardState", JSON.stringify(boardState));
}

// add all the keyboard listener (in case we start a new game or disable it when hiding instruction)
function addMoveEventListener(){
    document.addEventListener("keydown", _keyboardEvent);
    arrowUpElement.addEventListener("click", _upEvent);
    arrowLeftElement.addEventListener("click", _leftEvent);
    arrowDownElement.addEventListener("click", _downEvent);
    arrowRightElement.addEventListener("click", _rightEvent);
}

// remove all keyboard listener (when we showing instruction or when the game ended)
function removeMoveEventListener(){
    document.removeEventListener("keydown", _keyboardEvent);
    arrowUpElement.removeEventListener("click", _upEvent);
    arrowLeftElement.removeEventListener("click", _leftEvent);
    arrowDownElement.removeEventListener("click", _downEvent);
    arrowRightElement.removeEventListener("click", _rightEvent);
}

// create a new tile (2 or 4) in an empty cell
function new_element(){
    let l = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (boardState.val[i][j] === 0) l.push([i, j]);

    let [x, y] = l[Math.floor(Math.random() * l.length)];
    boardState.val[x][y] = (Math.floor(Math.random() * 10) < 9 ? 1 : 2);
}

// start a new game
function new_game(){
    addMoveEventListener();

    // reset the board state and store
    boardState.val = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    boardState.score = 0;

    // add new element and update html
    new_element();
    update_board();
}

// reverse every row of the board
function rev(){
    for (let i = 0; i < 4; i++){
        [boardState.val[i][0], boardState.val[i][3]] = [boardState.val[i][3], boardState.val[i][0]];
        [boardState.val[i][1], boardState.val[i][2]] = [boardState.val[i][2], boardState.val[i][1]];
    }
}

// take the tranpose matrix
function tranpose(){
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < i; j++){
            [boardState.val[i][j], boardState.val[j][i]] = [boardState.val[j][i], boardState.val[i][j]];
        }
    }
}

// merge a row in the left direction
function merge_row(arr){
    let cur = 0;
    let ans = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++){
        // if the cell is not empty
        if (arr[i] != 0){
            // if the next cell in the new row is empty, we move the cell to new position
            if (ans[cur] === 0) ans[cur] = arr[i];
            // if the next cell in the new row has the same value, we merge them and go to next cell
            else if (ans[cur] === arr[i]) ans[cur]++, boardState.score += (1 << ans[cur]), cur++;
            // if the next cell in the new row has different value, we go to the next cell and move the cell to that position
            else cur++, ans[cur] = arr[i];
        }
    }
    return ans;
}

// same as merge row but only for checking
function check_merge_row(arr){
    let cur = 0;
    let ans = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++){
        if (arr[i] != 0){
            if (ans[cur] === 0) ans[cur] = arr[i];
            else if (ans[cur] === arr[i]) ans[cur]++, cur++;
            else cur++, ans[cur] = arr[i];
        }
    }
    return ans;
}

// merging 2048 board
function merge_board(){
    let ck = false;

    // loop throught 4 rows and merge the row
    for (let i = 0; i < 4; i++) {
        let new_row = merge_row(boardState.val[i]);
        for (let j = 0; j < 4; j++) if (boardState.val[i][j] !== new_row[j]) ck = true, boardState.val[i][j] = new_row[j];
    }

    // return if the board is changed or not
    return ck;
}

// same as merge board but doesn't change the board state
function merge_board_check(){
    for (let i = 0; i < 4; i++) {
        let new_row = check_merge_row(boardState.val[i]);
        for (let j = 0; j < 4; j++) if (boardState.val[i][j] !== new_row[j]) return true;
    }

    return false;
}

// merging the 2048 board
function mergeEvent(event, direction){
    // check the direction and change to the correspond board
    if (direction === 37 || direction === "ArrowLeft") console.log("left");
    if (direction === 38 || direction === "ArrowUp") tranpose(), console.log("up");
    if (direction === 39 || direction === "ArrowRight") rev(), console.log("right");
    if (direction === 40 || direction === "ArrowDown") tranpose(), rev(), console.log("down");

    // merge board in the left direction
    let ck = merge_board();

    // change the board back to its normal state
    if (direction === 38 || direction === "ArrowUp") tranpose();
    if (direction === 39 || direction === "ArrowRight") rev();
    if (direction === 40 || direction === "ArrowDown") rev(), tranpose();

    if (ck === false) return;

    // create a new element and update html
    new_element();
    update_board();
}

// check if the game is ended or not
function is_end(){
    let ck = true;

    // checking if we can make a move in one of the four directions or not
    if (merge_board_check()) ck = false;

    rev();
    if (merge_board_check()) ck = false;
    rev(); 

    tranpose();
    if (merge_board_check()) ck = false;
    tranpose();

    tranpose(); rev();
    if (merge_board_check()) ck = false;
    rev(); tranpose();

    return ck;
}

// check if we reach 2048 or not
function is_win(){
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (boardState.val[i][j] === 11) return true;
    return false;
}

// check if the player win or lose or the game hasn't ended
function check_endgame(){
    const winElement = document.querySelector(".win");
    const textWinElement = winElement.querySelector("p");
    
    // check if the game hasn't ended
    if (!is_win() && !is_end()) {
        // hide the win/lose
        textWinElement.textContent = "";
        winElement.style.display = "none";
        return;
    }
    // change win/lose state
    if (is_win()) textWinElement.textContent = "Victory!";
    else textWinElement.textContent = "Game over!";

    // unhide the win/lose state
    winElement.style.display = "flex";

    // remove all the keyboard event listener
    removeMoveEventListener();
}

// update the html to be matched with the board state
function update_board(){
    const scoreElement = document.querySelector('.scores');
    const highestscoreElement = document.querySelector('.highest_score');

    // changing the board
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            let id = "#cell_" + (i * 4 + j).toString();
            let cell = document.querySelector(id);

            cell.textContent = boardState.val[i][j] === 0 ? "" : (1 << boardState.val[i][j]).toString();
            cell.style.backgroundColor = color[boardState.val[i][j]];

            cell.style.color = (boardState.val[i][j] >= 3 ? textColorGreater3 : "black");
        }
    }

    // changing the score and high score
    scoreElement.textContent = boardState.score.toString();
    // update high score
    if (boardState.hasOwnProperty('highestScore')){
        boardState.highestScore = Math.max(boardState.score, boardState.highestScore);
    }
    else{
        boardState.highestScore = boardState.score;
    }
    highestscoreElement.textContent = boardState.highestScore.toString();
    // check if the game is ended or not and save the new state 
    check_endgame();
    save_state();
}