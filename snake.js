//board
let blocksize = 25;
let rows = 20;
let columns = 20;
let board
let context;

//snake head
let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

//snake speed
let velocityX = 0;
let velocityY = 0;
let speed = 1;

//snake body
let snakeBody = [];

//food
let foodX;
let foodY;

//game over
let gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", changeDirection)
    setInterval(update, 1000/10);
}

function changeDirection(e){
    if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != speed){
        velocityX = 0;
        velocityY = -speed;
    }
    else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -speed){
        velocityX = 0;
        velocityY = speed;
    }
    else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -speed){
        velocityX = speed;
        velocityY = 0;
    }
    else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != speed){
        velocityX = -speed;
        velocityY = 0;
    }
}

function update(){
    if (gameOver){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > (columns-1)* blocksize || snakeY < 0 || snakeY > (rows-1) * blocksize){
        gameOver = true;
        console.log("X: "+snakeX);
        console.log("Y: "+snakeY);

        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }

}

function placeFood(){
    foodX = Math.floor(Math.random() * columns) * blocksize;
    foodY = Math.floor(Math.random() * columns) * blocksize;
}