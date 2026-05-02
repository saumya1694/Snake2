const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

const size = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;

// create grid
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}

// draw snake & food
function draw() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => cell.classList.remove("snake", "food"));

  snake.forEach(segment => {
    const index = segment.y * size + segment.x;
    cells[index].classList.add("snake");
  });

  const foodIndex = food.y * size + food.x;
  cells[foodIndex].classList.add("food");
}

// move snake
function move() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // collision
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= size || head.y >= size ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert("Game Over! Score: " + score);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
  }

  snake.unshift(head);

  // eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size)
    };
  } else {
    snake.pop();
  }
}

// controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") direction = { x: 0, y: -1 };
  if (e.key === "ArrowDown") direction = { x: 0, y: 1 };
  if (e.key === "ArrowLeft") direction = { x: -1, y: 0 };
  if (e.key === "ArrowRight") direction = { x: 1, y: 0 };
});

// game loop
function gameLoop() {
  move();
  draw();
}

createBoard();
setInterval(gameLoop, 150);
