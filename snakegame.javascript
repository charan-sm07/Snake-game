const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Terminal size
const WIDTH = 20;
const HEIGHT = 10;

// Game variables
let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let food = spawnFood();
let gameOver = false;
let score = 0;

// Draw board
function draw() {
    console.clear();
    let output = "";

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            if (x === food.x && y === food.y) {
                output += "🍎";
            } else if (snake.some(part => part.x === x && part.y === y)) {
                output += "🟩";
            } else {
                output += "⬛";
            }
        }
        output += "\n";
    }
    console.log(output);
    console.log("Score:", score);
}

// Move snake
function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wall or self collision
    if (
        head.x < 0 || head.x >= WIDTH ||
        head.y < 0 || head.y >= HEIGHT ||
        snake.some(part => part.x === head.x && part.y === head.y)
    ) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop();
    }
}

// Spawn food not on snake
function spawnFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * WIDTH),
            y: Math.floor(Math.random() * HEIGHT),
        };
        if (!snake.some(part => part.x === newFood.x && part.y === newFood.y)) {
            break;
        }
    }
    return newFood;
}

// Input handling
process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") process.exit();

    switch (key.name) {
        case "up":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "down":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "left":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "right":
            if (direction.x === 0) direction =
