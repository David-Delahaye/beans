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
  if (distance < r1 + r2) return true;
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
  constructor(height, width, board) {
    this.height = height;
    this.width = width;
    this.x = 0;
    this.y = 0;
    this.xDir = 1;
    this.yDir = 1;
    this.xTarget = 0;
    this.yTarget = 0;
    this.target = false;
    this.speed = 1;
    this.board = board;
    this.dom = document.createElement("div");
    this.init();
  }

  init() {
    board.appendChild(this.dom);
    this.dom.classList.add("character");
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.innerHTML = `<div class="bean"  style='background :hsl(${
      Math.random() * 300
    }, 45%, 70%)'><div class="face"><div class="eye"></div><div class="eye"></div></div><div class="mouth"></div></div><div class="shadow"></div><div class="hitbox"></div>`;
    // setInterval(() => {
    //   [this.xDir, this.yDir] = moveRandomly();
    // }, Math.random() * 3000 + 2000);

    this.dom.onclick = () => {
      console.log(this);
    };
  }

  move() {
    //bounds check
    if (this.x < 10) this.xDir = 1;
    if (this.y < 10) this.yDir = 1;
    if (this.y > 1000) this.yDir = -1;
    if (this.x > 1000) this.xDir = -1;
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
      if (this.xTarget === this.x) this.xDir = 0;
      if (this.yTarget === this.y) this.yDir = 0;
      if (this.xTarget === this.x && this.yTarget === this.y) {
        console.log("im here at ", this.x, this.y, this);
        this.target = false;
      }
      if (
        getDistanceBetween(
          this.x,
          ball.offsetLeft + 50,
          this.y,
          ball.offsetTop + 50,
          50,
          50
        ) === true
      ) {
        //this.yDir = Math.abs(this.y - ball.offsetTop);
        if (Math.abs(this.xTarget - this.x) < this.yTarget - this.y) {
          this.x < ball.offsetLeft + 50 ? (this.xDir = -1) : (this.xDir = 1);
        } else if (Math.abs(this.xTarget - this.x) > this.yTarget - this.y) {
          this.y < ball.offsetTop + 50 ? (this.yDir = -1) : (this.yDir = 1);
        } else {
          console.log("same");
        }
      }
    }
    //walking animation
    this.xDir !== 0 || this.yDir !== 0
      ? this.dom.firstChild.classList.add("walking")
      : this.dom.firstChild.classList.remove("walking");

    if (this.xDir > 0) {
      this.dom.firstChild.firstChild.style.marginLeft = 5 + "px";
    } else if (this.xDir < 0) {
      this.dom.firstChild.firstChild.style.marginLeft = -5 + "px";
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
const player1 = new Bean(200, 100, board);
let characters = [player1];

// for (let i = 0; i < 7; i++) {
//   characters.push(
//     new Bean(160 + Math.random() * 100, 80 + Math.random() * 50, board)
//   );
//}

const ball = document.createElement("div");
ball.classList.add("ball");
board.appendChild(ball);

window.addEventListener("click", (e) => {
  player1.target = true;
  console.log(e.screenX, e.screenY);
  console.log(e);
  player1.xTarget = e.offsetX;
  player1.yTarget = e.offsetY;
});

window.requestAnimationFrame(gameLoop);
