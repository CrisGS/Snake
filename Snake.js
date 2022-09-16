const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext('2d');
const min = 50, max = 500;
const GAME_SPEED = 200;
let snakeX = 450;
let snakeY = 240;
let movingSnakeX = 0, movingSnakeY = 0;
let interval;
let score = 0;
let xFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
let yFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;

function drawFood() {
  ctx.shadowBlur = 5;
  ctx.shadowColor='red';
  ctx.fillStyle = 'red';
  ctx.fillRect(xFood, yFood, 10, 10);
}

function drawSnake() {
  ctx.shadowBlur = 5;
  ctx.shadowColor='black';
  ctx.fillStyle = 'black';
  ctx.fillRect(snakeX, snakeY, 10, 10);
}



window.onkeydown = function changeDirrection(e) {
  const UP_KEY = 38,
  DOWN_KEY = 40,
  LEFT_KEY = 37,
  RIGHT_KEY = 39;

  let pressedKey = e.keyCode;
  if (pressedKey === UP_KEY && movingSnakeY !== 1) {
    if (movingSnakeY === -1) {
      return;
    }
    movingSnakeY = -1;
    movingSnakeX = 0;
  } else if (pressedKey === DOWN_KEY && movingSnakeY !== -1) {
    if (movingSnakeY === 1) {
      return;
    }
    movingSnakeY = 1;
    movingSnakeX = 0;
  } else if (pressedKey === LEFT_KEY && movingSnakeX !== 1) {
    if (movingSnakeX === -1) {
      return;
    }
    movingSnakeY = 0;
    movingSnakeX = -1;
  } else if (pressedKey === RIGHT_KEY && movingSnakeX !== -1) {
    if (movingSnakeX === 1) {
      return;
    }
    movingSnakeY = 0;
    movingSnakeX = 1;
  }
}

function moveSnake() {
  if (snakeY > 0 && movingSnakeY === -1) {
    snakeY -= 10;
  } else if (snakeY < 490 && movingSnakeY === 1) {
    snakeY += 10;
  } else if (snakeX > 0 && movingSnakeX === -1) {
    snakeX -= 10;
  } else if (snakeX < 490 && movingSnakeX === 1) {
    snakeX += 10;
  }
  console.log("Snake: " + snakeX + ' ' + snakeY + " Score " + score);
  if (snakeX === xFood && snakeY === yFood) {
    ++score;
    document.getElementById("score").innerText = "Score: " + score;
    xFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
    yFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }
  ctx.clearRect(0, 0, 500, 500);
  drawSnake();
  drawFood();
}

function playGame() {
  drawSnake();
  drawFood();
  setInterval(moveSnake, GAME_SPEED);
  document.getElementById("score").innerText = "Score: " + score;
}
