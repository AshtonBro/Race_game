'use strict';

//? Get DOM elements
const score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    gameStart = document.querySelector('.game-start'),
    gameArea = document.querySelector('.game-area'),
    car = document.createElement('div');

car.classList.add('car');

//? "Enum" object control
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

//? Basic game settings
const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

//? The function calculates the height of the user's screen and returns the number of lines to fill it
const getQuantityElemnts = (heightElement) => {
    return document.documentElement.clientHeight / heightElement + 1;
};

//? Еhe function starts the game, creates elements on the page, launches requestAnimationFrame
const startGame = () => {
    gameStart.classList.add('hide');

    //? Lines addition cycle
    for (let i = 0; i < getQuantityElemnts(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px'; //* 50 'it's distance between lines
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    //? Machine addition cycle
    for (let i = 0; i < getQuantityElemnts(110 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.y = -110 * setting.traffic * (i + 1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(/image/enemy2.webp) center / cover no-repeat;';
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

//? The function is responsible for controlling objects on the page
const playGame = () => {
    if (setting.start) {

        moveRoad();
        moveEnemy();

        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHight - car.offsetHight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
};

const startRun = (event) => {
    event.preventDefault();
    keys[event.key] = true;
};

const stopRun = (event) => {
    event.preventDefault();
    keys[event.key] = false;
};


//? The Function gets all lines and drags them down the screen
const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach((item) => {
        item.y += setting.speed;
        item.style.top = item.y + 'px';
        if (item.y > document.documentElement.clientHeight) {
            item.y = -100;
        }
    });
};

//? The function gets all cars on the road and makes them moveable
const moveEnemy = () => {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((item) => {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
};

//? The EventListeners methods
gameStart.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);