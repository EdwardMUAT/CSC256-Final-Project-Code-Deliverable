// Initialize the game variables
let canvas, ctx;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let gridSize = 20;
let tileCount = 20;
let score = 0;
let gameInterval;
let gameRunning = false;

// Set up the canvas and start the game when the DOM is fully loaded
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = gridSize * tileCount;

    document.getElementById('startButton').addEventListener('click', startGame);

    // Add keyboard event listeners for snake movement
    document.addEventListener('keydown', changeDirection);
};

// Start the game
function startGame() {
    if (!gameRunning) {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        spawnFood();
        document.getElementById('score').innerText = `Score: ${score}`;
        gameRunning = true;
        gameInterval = setInterval(gameLoop, 1000 / 15); // 15 FPS
    }
}

// Stop the game
function stopGame() {
    clearInterval(gameInterval);
    gameRunning = false;
    alert(`Game Over! Your final score is ${score}`);
}

// The game loop
function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        stopGame();
    }
    if (checkFoodCollision()) {
        growSnake();
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        spawnFood();
    }
    drawGame();
}

// Move the snake in the current direction
function moveSnake() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

// Check for collision with the walls or itself
function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Check if the snake has collided with the food
function checkFoodCollision() {
    let head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// Grow the snake when it eats food
function growSnake() {
    let tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

// Spawn food in a random location
function spawnFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Change the direction of the snake based on arrow key input
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

// Draw the snake, food, and the game grid
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = '#FF5733';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
