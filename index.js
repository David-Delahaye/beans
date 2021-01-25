var up = false,
  right = false,
  down = false,
  left = false;

document.addEventListener("keydown", press);

function press(e) {
  if (
    e.keyCode === 38 /* up */ ||
    e.keyCode === 87 /* w */ ||
    e.keyCode === 90 /* z */
  ) {
    up = true;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = true;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = true;
  }
  if (
    e.keyCode === 37 /* left */ ||
    e.keyCode === 65 /* a */ ||
    e.keyCode === 81 /* q */
  ) {
    left = true;
  }
}
document.addEventListener("keyup", release);
function release(e) {
  if (
    e.keyCode === 38 /* up */ ||
    e.keyCode === 87 /* w */ ||
    e.keyCode === 90 /* z */
  ) {
    up = false;
  }
  if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */) {
    right = false;
  }
  if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */) {
    down = false;
  }
  if (
    e.keyCode === 37 /* left */ ||
    e.keyCode === 65 /* a */ ||
    e.keyCode === 81 /* q */
  ) {
    left = false;
  }
}
function moveRandomly() {
  const odds = Math.random() * 9;
  let newX = 0;
  let newY = 0;
  if (odds < 1) {
    newX = 0;
    newY = 0;
  } else if (1 <= odds && odds < 2) {
    newX = 1;
    newY = 0;
  } else if (2 <= odds && odds < 3) {
    newX = 1;
    newY = 1;
  } else if (3 <= odds && odds < 4) {
    newX = 0;
    newY = 1;
  } else if (4 <= odds && odds < 5) {
    newX = -1;
    newY = 1;
  } else if (5 <= odds && odds < 6) {
    newX = -1;
    newY = 0;
  } else if (6 <= odds && odds < 7) {
    newX = -1;
    newY = -1;
  } else if (7 <= odds && odds < 8) {
    newX = 0;
    newY = -1;
  } else if (8 <= odds && odds < 9) {
    newX = -1;
    newY = 0;
  }

  return [newX, newY];
}

function getDistanceBetween(x1, x2, y1, y2, r1, r2) {
  const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  if (distance < r1 + r2) {
    return true;
  }
  return false;
}

function gameLoop() {
  if (up) {
    y = y - 1;
  }
  if (right) {
    x = x + 1;
  }
  if (down) {
    player1.move();
  }
  if (left) {
    x = x - 1;
  }

  characters.forEach((character) => {
    character.move();
  });

  window.requestAnimationFrame(gameLoop);
}

class Bean {
  constructor(x, y, height, width, board) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.xDir = 1;
    this.yDir = 1;
    this.xTarget = 0;
    this.yTarget = 0;
    this.target = true;
    this.speed = 0.9;
    this.board = board;
    this.dom = document.createElement("div");
    this.init();
  }

  init() {
    board.appendChild(this.dom);
    this.dom.classList.add("character");
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.innerHTML = `<div class='body'><div class="bean"  style='background :hsl(${
      Math.random() * 300
    }, 85%, 75%); width:${this.width}px; height:${
      this.height
    }px'><div class="face"><div class="eye"></div><div class="eye"></div></div><div class="mouth"></div></div><div class="shadow"></div><div class="hitbox"></div></div>`;
    // setInterval(() => {
    //   [this.xDir, this.yDir] = moveRandomly();
    // }, Math.random() * 3000 + 2000);
    setInterval(() => {
      [this.xTarget, this.yTarget] = [
        Math.random() * 2000,
        Math.random() * 1000,
      ];
      this.target = true;
    }, Math.random() * 10000 + 6000);

    this.dom.onclick = () => {
      console.log(this);
    };
  }

  move() {
    //bounds check
    if (this.x < 10) this.xDir = 1;
    if (this.y < 10) this.yDir = 1;
    if (this.y > 1000) this.yDir = -1;
    if (this.x > 2000) this.xDir = -1;
    this.x += this.xDir * this.speed;
    this.y += this.yDir * this.speed;

    //Move to
    if (this.target === true) {
      const xDiff = Math.abs(this.xTarget - this.x);
      const yDiff = Math.abs(this.yTarget - this.y);
      if (xDiff > yDiff) {
        this.xDir = 1;
        this.yDir = yDiff / xDiff;
      }
      if (yDiff > xDiff) {
        this.yDir = 1;
        this.xDir = xDiff / yDiff;
      }

      this.xTarget - this.x > 0 ? this.xDir : (this.xDir = -this.xDir);
      this.yTarget - this.y > 0 ? this.yDir : (this.yDir = -this.yDir);
      if (xDiff < 1) this.xDir = 0;
      if (yDiff < 1) this.yDir = 0;
      if (xDiff < 1 && yDiff < 1) {
        console.log("im here at ", this.x, this.y, this);
        this.target = false;
      }
      for (let i = 0; i < characters.length; i++) {
        if (characters[i] === this) continue;

        //collision
        if (
          getDistanceBetween(
            this.x,
            characters[i].x,
            this.y,
            characters[i].y,
            30,
            30
          ) === true
        ) {
          let newX = 0;
          let newY = 0;
          if (this.x < characters[i].x) newX = this.x - 100;
          if (this.x > characters[i].x) newX = this.x + 100;
          if (this.y < characters[i].y) newY = this.y - 100;
          if (this.y > characters[i].y) newY = this.y + 100;
          this.xTarget = newX;
          this.yTarget = newY;
        }
      }
    }
    //walking animation
    this.xDir !== 0 || this.yDir !== 0
      ? this.dom.firstChild.firstChild.classList.add("walking")
      : this.dom.firstChild.firstChild.classList.remove("walking");

    if (this.xDir > 0) {
      this.dom.firstChild.firstChild.firstChild.style.marginLeft = 5 + "px";
    } else if (this.xDir < 0) {
      this.dom.firstChild.firstChild.firstChild.style.marginLeft = -5 + "px";
    }
    this.render();
  }

  render() {
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.style.zIndex = Math.floor(this.y + this.height);
  }
}
const board = document.querySelector("body");
const player1 = new Bean(
  Math.random() * 1000,
  Math.random() * 1000,
  200,
  100,
  board
);
let characters = [player1];

for (let i = 0; i < 5; i++) {
  characters.push(
    new Bean(Math.random() * 800, Math.random() * 800, 200, 100, board)
  );
}

window.addEventListener("click", (e) => {
  player1.target = true;
  console.log(e.screenX, e.screenY);
  console.log(e);
  player1.xTarget = e.offsetX;
  player1.yTarget = e.offsetY;
  for (let i = 0; i < characters.length; i++) {
    characters[i].xTarget = e.offsetX;
    characters[i].yTarget = e.offsetY;
    characters[i].target = true;
  }
});

window.requestAnimationFrame(gameLoop);
