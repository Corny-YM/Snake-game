// Canvas 
const canvas = document.getElementById('game')
    // Display 2D
const ctx = canvas.getContext('2d');

class SnakePart{
    // x, y position
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

// Device the canvas 400-400 to 20 square
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
// Square snake
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 0;
// Apple
let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);
console.log(appleX, appleY)

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const sound = new Audio("gameover.mp4");
const soundScore = new Audio("ez.mp3");

// Loop
function drawGame() {
    changeSnakePosition();
    // Check lose
    let result = isGameOver();
    if(result) {
        return sound.play();
    }

    clearScreen();

    // Check does the snake eat the apple
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2) {
        speed = 10;
    } 
    if (score > 5) {
        speed = 12;
    }
    if (score > 10) {
        speed = 15;
    } 
    if (score > 20) {
        speed = 25;
    }

    setTimeout(drawGame, 1000 / speed);
}
// Use setTimeOut to update often the game, screen

function isGameOver() {
    let gameOver = false;

    // Check game start or not
    if(yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // walls
    if(headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
        gameOver = true;
    }

    // Hit body => game over
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    // Show the player that is game over
    if(gameOver) {
        ctx.fillStyle = "lightblue"
        ctx.font = "50px Bakbak One"
        ctx.fillText("Game over!", canvas.width/6, canvas.height/2)
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Bakbak One"
    ctx.fillText("Score: " + score, canvas.width - 80, 20);
}

// Clear the screen
function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx. fillStyle = 'blue';
    // For loop to draw each once the tail of snake
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize,tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength) {
        // remove the fisrt item on the list
        snakeParts.shift();  
    }

    ctx.fillStyle = 'tomato'
    // Khoảng cách snake sẽ nằm giữa canvas
    // có chiều dài rộng bằng 18 (20)
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    // Position of the snake = the apple
    if(appleX === headX && appleY === headY) {
        // Set new position for Apple
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        // The old apple become the tail of Snake
        tailLength++;
        // Update score
        score++;
        // Sound when eat apple
        soundScore.play();
    }
}

// Event arrows click 
document.body.addEventListener('keydown', keyDown);
function keyDown(event) {
    // Up
    if(event.keyCode == 38) { 
        // Prevent go down when go up
        if(yVelocity == 1) return;
        // Go up so decrease
        yVelocity = -1;
        xVelocity = 0;
    }
    // Down
    if(event.keyCode == 40) { 
        if(yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // Left
    if(event.keyCode == 37) { 
        if(xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // Right
    if(event.keyCode == 39) { 
        if(xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
    
    // Enter
    if(event.keyCode == 13) {
        location.reload();
    }
}

drawGame();