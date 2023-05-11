const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext('2d');
const min = 0, max = 390;
let xFood = Math.round((Math.random() * ((max + 200) - min) + min) / 10) * 10;
let yFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
const GAME_SPEED = 200;
let hVelocity = 0, vVelocity = 0;
let movingSnakeX = 0, movingSnakeY = 0;
let score = 0;
let interval, head;
let snake = [
  {x:240, y:240},
  {x: 230, y: 240},
  {x:220, y:240}
];


function drawFood() {
  ctx.shadowBlur = 5;
  ctx.shadowColor='red';
  ctx.fillStyle = 'red';
  ctx.fillRect(xFood, yFood, 10, 10);
}

function drawSnakePart(snakePart) {
  ctx.shadowBlur = 5;
  ctx.shadowColor='black';
  ctx.fillStyle = 'black';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
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

let biteSound = new Audio("apple-bite.mp3");

function moveSnake() {
  if (movingSnakeY === -1) {
    hVelocity = 0;
    vVelocity = -10;
  } else if (movingSnakeY === 1) {
    hVelocity = 0;
    vVelocity = 10;
  } else if (movingSnakeX === -1) {
    hVelocity = -10;
    vVelocity = 0;
  } else if (movingSnakeX === 1) {
    hVelocity = 10;
    vVelocity = 0;
  }
  head = {x: snake[0].x + hVelocity, y: snake[0].y + vVelocity};
  snake.unshift(head);
  snake.pop();
}

function eatFood() {
  if (head.x === xFood && head.y === yFood) {
    biteSound.play();
    snake.push(drawSnakePart);
    ++score;
    document.getElementById("score").innerText = "Score: " + score;
    xFood = Math.round((Math.random() * ((max + 200) - min) + min) / 10) * 10;
    yFood = Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }
}

let gameOverSound = new Audio("game-over.mp3");

function checkCollision () {
  if (head.x === canvas.width || head.x === -10 || head.y === canvas.height || head.y === -10) {
    clearInterval(interval);
    gameOverSound.play();
    document.getElementById("header").innerText = "GAME OVER!";
  }
  for (let i = 3; i < snake.length; ++i) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(interval);
      gameOverSound.play();
      document.getElementById("header").innerText = "GAME OVER!";
    }
  }
}

let pressButtonCount = 0;

function playGame() {
  if (pressButtonCount % 2 === 0) {
    drawSnake();
    drawFood();
    interval = setInterval(function autoMove() {
      drawSnake();
      moveSnake();
      ctx.clearRect(0, 0, 600, 400);
      drawSnake();
      drawFood();
      eatFood();
      checkCollision();
    }, GAME_SPEED);
    document.getElementById("score").innerText = "Score: " + score;
  } else {
    location.reload();
  }
  ++pressButtonCount;
}
