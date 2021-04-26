const arrowUpElement = document.querySelector(".up");
const arrowLeftElement = document.querySelector(".left");
const arrowDownElement = document.querySelector(".down");
const arrowRightElement = document.querySelector(".right");
const myStorage = window.localStorage;

const color = ["#CDC1B4", "#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72", "#edcc61", "#edc850", "#edc53f", "#edc22e"];
const textColorGreater3 = "#f9f6f2";

let boardState = {
    val : [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    score : 0,
    highestScore: 0,
};

let howtoplay = {
    appear: 0,
    disappear: 0
}

main();

function main(){
    const howtoplayElement = document.querySelector('#how_to_play');

    document.querySelector("#restart_button").addEventListener("click", (event) => {new_game();});
    document.querySelector("#try_again").addEventListener("click", (event) => {new_game();});
    howtoplayElement.addEventListener("mouseover", _howtoplayAppearEvent);
    howtoplayElement.addEventListener("mouseout", _howtoplayDisappearEvent);

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    document.addEventListener("keydown", (event) => {
        let key = event.key || event.keyCode;
        if (key == 'r' || key === 82) new_game();
    });

    if (myStorage.getItem("boardState") !== null){
        boardState = JSON.parse(myStorage.getItem("boardState"));
        if (!is_end() && !is_win()) addMoveEventListener();
        update_board();
    }
    else {
        new_game();
    }
}

function _keyboardEvent(event) {
    let key = event.key || event.keyCode;
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(key) || event.keyCode < 37 || event.keyCode > 40) return;
    mergeEvent(event, key);
}

function _upEvent(event){
    mergeEvent(event, "ArrowUp");
}

function _leftEvent(event){
    mergeEvent(event, "ArrowLeft");
}

function _downEvent(event){
    mergeEvent(event, "ArrowDown");
}

function _rightEvent(event){
    mergeEvent(event, "ArrowRight");
}

function _howtoplayAppearEvent(event){
    console.log("how to play appear");
    howtoplay.appear += 50;
    requestAnimationFrame(howtoplayAppear);
}

function _howtoplayDisappearEvent(event){
    console.log("how to play disappear");
    document.querySelector(".instruction").style.opacity = 0;
    howtoplay.disappear += 50;
    requestAnimationFrame(howtoplayDisappear);
}

function howtoplayAppear(currentTime){
    const boardElement = document.querySelector("#game_board");
    if (howtoplay.appear === 0) {
        if (parseFloat(boardElement.style.opacity) <= 0) document.querySelector(".instruction").style.opacity = 1;
        return;
    }
    boardElement.style.opacity = parseFloat(boardElement.style.opacity) - 0.02;
    howtoplay.appear--;
    requestAnimationFrame(howtoplayAppear);
}

function howtoplayDisappear(currentTime){
    const boardElement = document.querySelector("#game_board");
    if (howtoplay.disappear === 0) return;
    boardElement.style.opacity = parseFloat(boardElement.style.opacity) + 0.02;  
    howtoplay.disappear--; 
    requestAnimationFrame(howtoplayDisappear);
}

function save_state(){
    myStorage.setItem("boardState", JSON.stringify(boardState));
}

function addMoveEventListener(){
    document.addEventListener("keydown", _keyboardEvent);
    arrowUpElement.addEventListener("click", _upEvent);
    arrowLeftElement.addEventListener("click", _leftEvent);
    arrowDownElement.addEventListener("click", _downEvent);
    arrowRightElement.addEventListener("click", _rightEvent);
}

function new_game(){
    addMoveEventListener();

    boardState.val = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    boardState.score = 0;

    new_element();
    update_board();
}

function mergeEvent(event, direction){
    if (direction === 37 || direction === "ArrowLeft") console.log("left");
    if (direction === 38 || direction === "ArrowUp") tranpose(), console.log("up");
    if (direction === 39 || direction === "ArrowRight") rev(), console.log("right");
    if (direction === 40 || direction === "ArrowDown") tranpose(), rev(), console.log("down");

    let ck = merge_board();

    if (direction === 38 || direction === "ArrowUp") tranpose();
    if (direction === 39 || direction === "ArrowRight") rev();
    if (direction === 40 || direction === "ArrowDown") rev(), tranpose();

    if (ck === false) return;

    new_element();
    update_board();
}

function rev(){
    for (let i = 0; i < 4; i++){
        [boardState.val[i][0], boardState.val[i][3]] = [boardState.val[i][3], boardState.val[i][0]];
        [boardState.val[i][1], boardState.val[i][2]] = [boardState.val[i][2], boardState.val[i][1]];
    }
}

function tranpose(){
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < i; j++){
            [boardState.val[i][j], boardState.val[j][i]] = [boardState.val[j][i], boardState.val[i][j]];
        }
    }
}

function merge_row(arr){
    cur = 0;
    ans = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++){
        if (arr[i] != 0){
            if (ans[cur] === 0) ans[cur] = arr[i];
            else if (ans[cur] === arr[i]) ans[cur]++, boardState.score += (1 << ans[cur]), cur++;
            else cur++, ans[cur] = arr[i];
        }
    }
    return ans;
}

function check_merge_row(arr){
    cur = 0;
    ans = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++){
        if (arr[i] != 0){
            if (ans[cur] === 0) ans[cur] = arr[i];
            else if (ans[cur] === arr[i]) ans[cur]++, cur++;
            else cur++, ans[cur] = arr[i];
        }
    }
    return ans;
}

function merge_board(){
    let ck = false;

    for (let i = 0; i < 4; i++) {
        new_row = merge_row(boardState.val[i]);
        for (let j = 0; j < 4; j++) if (boardState.val[i][j] !== new_row[j]) ck = true, boardState.val[i][j] = new_row[j];
    }

    return ck;
}

function merge_board_check(){
    for (let i = 0; i < 4; i++) {
        new_row = check_merge_row(boardState.val[i]);
        for (let j = 0; j < 4; j++) if (boardState.val[i][j] !== new_row[j]) return true;
    }

    return false;
}

function is_end(){
    let ck = true;

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

function is_win(){
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (boardState.val[i][j] === 11) return true;
    return false;
}

function update_board(){
    const scoreElement = document.querySelector('.scores');
    const highestscoreElement = document.querySelector('.highest_score');

    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            let id = "#cell_" + (i * 4 + j).toString();
            let cell = document.querySelector(id);

            cell.textContent = boardState.val[i][j] === 0 ? "" : (1 << boardState.val[i][j]).toString();
            cell.style.backgroundColor = color[boardState.val[i][j]];

            cell.style.color = (boardState.val[i][j] >= 3 ? textColorGreater3 : "black");
        }
    }

    scoreElement.textContent = boardState.score.toString();
    if (boardState.hasOwnProperty('highestScore')){
        boardState.highestScore = Math.max(boardState.score, boardState.highestScore);
    }
    else{
        boardState.highestScore = boardState.score;
    }
    highestscoreElement.textContent = boardState.highestScore.toString();
    check_endgame();
    save_state();
}

function new_element(){
    let l = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (boardState.val[i][j] === 0) l.push([i, j]);

    let [x, y] = l[Math.floor(Math.random() * l.length)];
    boardState.val[x][y] = (Math.floor(Math.random() * 10) < 9 ? 1 : 2);
}

function check_endgame(){
    const winElement = document.querySelector(".win");
    const textWinElement = winElement.querySelector("p");
    if (!is_win() && !is_end()) {
        textWinElement.textContent = "";
        winElement.style.display = "none";
        return;
    }
    if (is_win()) textWinElement.textContent = "Victory!";
    else textWinElement.textContent = "Game over!";

    winElement.style.display = "flex";

    document.removeEventListener("keydown", _keyboardEvent);
    arrowUpElement.removeEventListener("click", _upEvent);
    arrowLeftElement.removeEventListener("click", _leftEvent);
    arrowDownElement.removeEventListener("click", _downEvent);
    arrowRightElement.removeEventListener("click", _rightEvent);
}