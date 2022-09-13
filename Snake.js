const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext('2d');
const min = 50, max = 500;
const xFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
const yFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
const GAME_SPEED = 500;
let snakeX = 240;
let snakeY = 240;

function draw() {
  drawFood();
  drawSnake();
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(xFood, yFood, 10, 10);
}

function drawSnake() {
  ctx.fillStyle = 'black';
  ctx.fillRect(snakeX, snakeY, 10, 10);
}

window.onkeydown = function moveSnake(e) {
  const UP_KEY = 38,
  DOWN_KEY = 40,
  LEFT_KEY = 37,
  RIGHT_KEY = 39;

  let pressedKey = e.keyCode;
  let interval;
  if (pressedKey === UP_KEY) {
    interval = setInterval(function () {
      if (snakeY > 0) {
        snakeY -= 10;
      }
      ctx.clearRect(0, 0, 500, 500);
      draw();
    }, GAME_SPEED);
  }
  clearInterval(interval);
  if (pressedKey === DOWN_KEY) {
    interval = setInterval(function () {
      if (snakeY < 490) {
        snakeY += 10;
      }
      ctx.clearRect(0, 0, 500, 500);
      draw();
    }, GAME_SPEED);
  }
  clearInterval(interval);
  if (pressedKey === LEFT_KEY) {
    interval = setInterval(function () {
      if (snakeX > 0) {
        snakeX -= 10;
      }
      ctx.clearRect(0, 0, 500, 500);
      draw();
    }, GAME_SPEED);
  }
  clearInterval(interval);
  if (pressedKey === RIGHT_KEY) {
    interval = setInterval(function () {
      if (snakeX < 490) {
        snakeX += 10;
      }
      ctx.clearRect(0, 0, 500, 500);
      draw();
    }, GAME_SPEED);
  }
  clearInterval(interval);
}

function playGame() {
  location.reload();
}