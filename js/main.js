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
    speed: 3
};

const startGame = () => {
    gameStart.classList.add('hide');

    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px'; //* 50 'it's distance between lines
        gameArea.appendChild(line);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    console.log('play game');
    if (setting.start) {
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

//? EventListeners
gameStart.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);