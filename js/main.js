"use strict";

const MAX_ENEMY = 6;
const HEIGHT_ELEM = 100;

//? Get DOM elements
const score = document.querySelector(".score"),
  game = document.querySelector(".game"),
  start = document.querySelector(".game-start"),
  gameArea = document.querySelector(".game-area"),
  car = document.createElement("div"),
  topScore = document.querySelector(".top-score"),
  speed = document.querySelector(".speed");

const audio = document.createElement("embed");
const crash = new Audio("crash.mp3");

audio.src = "audio.mp3";
audio.style.cssText = `position: absolute; top: -1000px`;

car.classList.add("car");

//? get height of screen and count section
gameArea.style.height =
  Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM) * HEIGHT_ELEM;

//? "Enum" object control
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

//? Basic game settings
const setting = {
  start: false,
  score: 0,
  speed: 0,
  traffic: 7,
  level: 0,
};

let level = setting.level;

const localScore = parseInt(localStorage.getItem("nfjs_score", setting.score));
topScore.textContent = localScore ? localScore : 0;

const addLocalStorage = () => {
  if (localScore < setting.score) {
    localStorage.setItem("nfjs_score", setting.score);
    topScore.textContent = setting.score;
  }
};

//? The function calculates the height of the user's screen and returns the number of lines to fill it
const getQuantityElemnts = (heightElement) => {
  return gameArea.offsetHeight / heightElement + 1;
};

//? Еhe function starts the game, creates elements on the page, launches requestAnimationFrame
const startGame = (event) => {
  const target = event.target;

  if (target === start) {
    return;
  }

  switch (target.id) {
    case "easy":
      setting.speed = "3";
      setting.traffic = "4";
      break;
    case "middle":
      setting.speed = "5";
      setting.traffic = "3";
      break;
    case "hard":
      setting.speed = "9";
      setting.traffic = "2";
      break;
  }

  start.classList.add("hide");
  gameArea.innerHTML = "";
  //? Lines addition cycle
  for (let i = 0; i < getQuantityElemnts(HEIGHT_ELEM); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    //* 50 'it's distance between lines
    line.style.top = i * HEIGHT_ELEM + "px";
    line.style.height = HEIGHT_ELEM / 2 + "px";
    line.y = i * HEIGHT_ELEM;
    gameArea.appendChild(line);
  }

  //? Machine addition cycle
  for (let i = 0; i < getQuantityElemnts(HEIGHT_ELEM * setting.traffic); i++) {
    const enemy = document.createElement("div");
    const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
    enemy.classList.add("enemy");
    enemy.style.height = HEIGHT_ELEM + "px";
    enemy.style.weight = HEIGHT_ELEM / 2 + "px";
    const rangeBetweenEnemy = -HEIGHT_ELEM * setting.traffic * (i + 1);
    enemy.y =
      rangeBetweenEnemy < 100 ?
      -100 * setting.traffic * (i + 1) :
      rangeBetweenEnemy;
    enemy.style.top = enemy.y + "px";
    enemy.style.background = `transparent url(image/enemy${randomEnemy}.webp) center / cover no-repeat`;
    gameArea.appendChild(enemy);
    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) +
      "px";
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  document.body.append(audio);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

//? The function is responsible for controlling objects on the page
const playGame = () => {
  // setting.level = Math.floor(setting.score / 1000);

  // if (setting.level !== level) {
  //   level = setting.level;
  //   setting.speed += 1;
  // }

  if (setting.start) {
    setting.score += +setting.speed;
    score.innerHTML = "SCORE<br> " + setting.score;
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= +setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += +setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= +setting.speed;
    }
    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += +setting.speed;
    }
    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
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
  let lines = document.querySelectorAll(".line");
  lines.forEach((item) => {
    item.y += +setting.speed;
    item.style.top = item.y + "px";
    if (item.y > gameArea.offsetHeight) {
      item.y = -HEIGHT_ELEM;
    }
  });
};

//? The function gets all cars on the road and makes them moveable
const moveEnemy = () => {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((item) => {
    //* method getBoundingClientRect returns the dimensions of the element's borders as an object
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    //* Finding collision zones
    if (
      carRect.top + 1 <= enemyRect.bottom &&
      carRect.right - 5 >= enemyRect.left &&
      carRect.left + 5 <= enemyRect.right &&
      carRect.bottom >= enemyRect.top
    ) {
      setting.start = false;
      console.warn("ДТП");
      crash.play();
      crash.volume = 0.2;
      audio.remove();
      start.classList.remove("hide");
      start.style.top = score.offsetHeight;
      addLocalStorage();
    }

    item.y += +setting.speed / 2;
    item.style.top = item.y + "px";

    if (item.y >= gameArea.offsetHeight) {
      item.y = -HEIGHT_ELEM * setting.traffic;
      item.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - item.offsetWidth)) +
        "px";
    }
  });
};

//? The EventListeners methods
start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
speed.addEventListener("click", () => {
  let count = setting.speed;
  count++;
  setting.speed = `${count}`;
});