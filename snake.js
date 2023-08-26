//board
let blocksize = 25;
let rows = 20;
let columns = 20;
let board
let context;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    context = board.getContext("2d");

    update();
}

function update(){
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
}