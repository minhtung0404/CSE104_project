body{
    background-color: #001a33;
}

.column{
    position: relative;

    width: 100px;
    height: 100%;
}

.card{
    position: absolute;

    width: 90px;
    height: 120px;

    margin: 0px 2px 0px 2px;

    border: 3px solid black;
    border-radius: 15px;

    background-color: gray;

    user-select: none;

    cursor: context-menu;
}

.bonus_box {
    position: absolute;
    z-index: 3;

    width: 40px;
    height: 30px;

    background: pink;

    text-align: center;
    color: white;

    font-size: 1em;

    display: none;

    border-radius: 5px;
    border: solid 2px;
}

.bonus {
    margin: 0px;
    font-size: 1.5em;
}

.card_number{
    position: absolute;
    top: 5px;
    left: 5px;

    font-family: Arial;
    font-weight: bold;
    font-size: 20px;
    margin: 0px;

    user-select: none;
}

#body{
    display: flex;

    height: 340px;

    border-bottom: 3px dashed #D79922;
}

#instruction_and_newgame{
    display: inline-flex;
    flex-direction: row;

    justify-content: space-between;
}

.button{
    background-color: #EFE2BA;

    border: 1px solid #D79922;
    border-radius: 5px;

    font-size: 18px;

    width: 120px;
    height: 40px;
}

.button:hover{
    background-color: lightgray;
}

#crown{
    width: 25px;
    height: 25px;
}

#score{
    margin: 0px;
}

#score_number{
    user-select: none;

    font-size: 40px;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 10px;

    text-align: center;

    color: white;
}

#best_score{
    display: flex;

    position: absolute;
    top: 0px;
    left: 0px;

    font-size: 23px;
    font-weight: bold;
}

#best_score_number{
    user-select: none;

    display: inline-block;

    color: white;

    margin: 0px;
    margin-left: 10px;
}

#head{
    display: flex;
    position: relative;

    height: 100px;

    flex-direction: column;

    justify-content: flex-end;
}

#main_game{
    width: 400px;
    margin: auto;
}

.card_tail{
    cursor: context-menu;

    position: absolute;

    width: 90px;
    height: 120px;

    margin: 0px 2px 0px 2px;

    border: 3px solid black;
    border-radius: 15px;

    background-color: gray;

    user-select: none;
}

#tail{
    position: relative;

    margin-top: 30px;
    background: yellow;

    display: inline-flex;
    flex-direction: row;
}

.hide {
    display: none;
    cursor: context-menu;
}

.drag-over {
    cursor: context-menu;
    border: solid 3px white;
}

#how_to_play{
    user-select: none;
}

#restart_button{
    user-select: none;
}

#win {
    display: none;
    position: relative;

    width: 400px;
    height: 330px;

    background: rgba(0, 0, 0, 0.5);
    color: gold;

    font-size: 500%;
    text-align: center;
}

#win p {
    position: absolute;
    top: 100px;
    left: 25px;

    text-align: center;
    margin: 0px;
}

#lose {
    display: none;
    position: relative;

    width: 400px;
    height: 330px;

    background: rgba(0, 0, 0, 0.5);
    color: grey;

    font-size: 500%;
    text-align: center;
}

#lose p {
    position: absolute;
    top: 100px;
    left: 15px;

    text-align: center;

    margin: 0px;
}

#how_to_play {
    display: none;
    position: relative;

    width: 400px;
    height: 330px;

    background: DarkSalmon;
    color: FireBrick;

    font-family: 'Source Sans Pro', sans-serif;

    border-radius: 5px;
    border: 3px solid orange;
}

#how_to_play p {
    margin: 0px;
}
