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
    return distance;
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

  player1.xTarget = characters[1].x;
  player1.yTarget = characters[1].y;

  characters.forEach((character) => {
    character.move();
  });

  window.requestAnimationFrame(gameLoop);
}

class Bean {
  constructor(x, y, height, width, board, color) {
    this.height = height;
    this.width = width;
    this.radius = width / 2;
    this.x = x;
    this.y = y;
    this.xDir = 1;
    this.yDir = 1;
    this.Xorient = 0;
    this.Yorient = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.xTarget = Math.random() * 2000;
    this.yTarget = Math.random() * 1000;
    this.color = color;
    this.target = true;
    this.direction = Math.random() - 0.5;
    this.speed = Math.random() + 0.4;
    this.velocity = 0;
    this.maxSpeed = 1.4;
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
    this.dom.innerHTML = `<div class='body'><div class="bean"  style='background :${this.color}; width:${this.width}px; height:${this.height}px'><div class="face"><div class="eye"></div><div class="eye"></div></div><div class="mouth"></div></div><div class="shadow"></div><div class="hitbox"></div></div>`;
    // setInterval(() => {
    //   [this.xDir, this.yDir] = moveRandomly();
    // }, Math.random() * 3000 + 2000);
    setInterval(() => {
      [this.xTarget, this.yTarget] = [
        Math.random() * 2000,
        Math.random() * 1000,
      ];
      this.target = true;
    }, 20000);

    this.dom.onclick = () => {
      console.log(this);
    };
  }

  collision() {
    for (let i = 0; i < characters.length; i++) {
      if (characters[i] === this) continue;

      const distance = getDistanceBetween(
        this.x,
        characters[i].x,
        this.y,
        characters[i].y,
        this.radius,
        characters[i].radius
      );

      //collision
      if (distance !== false) {
        const bounceXDiff = Math.abs(characters[i].x - this.x);
        const bounceYDiff = Math.abs(characters[i].y - this.y);
        // this.xDir += 0.1;
        // this.yDir += 0.1;

        characters[i].x < this.x ? (this.xDir += 0.2) : (this.xDir -= 0.2);
        characters[i].y < this.y ? (this.yDir += 0.2) : (this.yDir -= 0.2);

        //   let newX = 0;
        //   let newY = 0;
        //   if (this.x < characters[i].x) newX = this.x - 100;
        //   if (this.x > characters[i].x) newX = this.x + 100;
        //   if (this.y < characters[i].y) newY = this.y - 100;
        //   if (this.y > characters[i].y) newY = this.y + 100;
        //   this.xTarget = newX;
        //   this.yTarget = newY;
        // var minX = Math.min.apply(Math, [this.x, this.xTarget]),
        //   maxX = Math.max.apply(Math, [this.x, this.xTarget]);

        // var minY = Math.min.apply(Math, [this.y, this.yTarget]),
        //   maxY = Math.max.apply(Math, [this.y, this.yTarget]);

        // if (
        //   (characters[i].x < maxX && characters[i].x > minX) ||
        //   (characters[i].y < maxY && characters[i].y > minY)
        // ) {
        //   let cx = characters[i].x;
        //   let cy = characters[i].y;
        //   var radians = Math.PI / 360,
        //     cos = Math.cos(radians),
        //     sin = Math.sin(radians),
        //     nx = cos * (this.x - cx) + sin * (this.y - cy) + cx,
        //     ny = cos * (this.y - cy) - sin * (this.x - cx) + cy;
        //   this.x = nx;
        //   this.y = ny;
        // }
      }
    }
  }

  move() {
    //bounds check
    if (this.x < this.width) this.xDir += 0.1;
    if (this.y < this.height) this.yDir += 0.1;
    if (this.y > board.offsetHeight) this.yDir -= 0.1;
    if (this.x > board.offsetWidth) this.xDir -= 0.1;

    //Move to
    if (this.target === true) {
      const xDiff = Math.abs(this.xTarget - this.x);
      const yDiff = Math.abs(this.yTarget - this.y);
      // if (xDiff > yDiff) {
      //   this.xDir += 0.1;
      //   this.yDir += (yDiff / xDiff) * 0.1;
      // }
      // if (yDiff > xDiff) {
      //   this.yDir += 0.1;
      //   this.xDir += (xDiff / yDiff) * 0.1;
      // }

      this.xTarget < this.x ? (this.xDir -= 0.1) : (this.xDir += 0.1);
      this.yTarget < this.y ? (this.yDir -= 0.1) : (this.yDir += 0.1);

      if (xDiff < this.radius + 50) this.xDir = 0;
      if (yDiff < this.radius + 50) this.yDir = 0;
      if (xDiff < this.radius + 50 && yDiff < this.radius + 50) {
        //console.log("im here at ", this.x, this.y, this);
        //this.target = false;
      }
    }

    // if (Math.abs(this.xDir) > this.maxSpeed) this.xDir = this.maxSpeed;
    // if (Math.abs(this.yDir) > this.maxSpeed) this.yDir = this.maxSpeed;

    // this.xDir = this.Xorient * this.xDir;
    // this.yDir = this.yDir * this.Yorient;
    //walking animation
    if (this.xDir >= 3 || this.yDir >= 3) {
      this.dom.firstChild.firstChild.classList.add("jumping");
      this.dom.firstChild.firstChild.classList.remove("walking");
    } else if (this.xDir !== 0 || this.yDir !== 0) {
      this.dom.firstChild.firstChild.classList.add("walking");
      this.dom.firstChild.firstChild.classList.remove("jumping");
    } else {
      this.dom.firstChild.firstChild.classList.remove("walking");
      this.dom.firstChild.firstChild.classList.remove("jumping");
    }

    if (this.xDir > 0) {
      this.dom.firstChild.firstChild.firstChild.style.marginLeft = 5 + "px";
    } else if (this.xDir < 0) {
      this.dom.firstChild.firstChild.firstChild.style.marginLeft = -5 + "px";
    }
    this.collision();

    //speed limit
    if (
      Math.abs(this.xDir) > this.maxSpeed ||
      Math.abs(this.yDir) > this.maxSpeed
    ) {
      this.xDir *= 0.8;
      this.yDir *= 0.8;
    }

    this.x += this.xDir * this.speed;
    this.y += this.yDir * this.speed;
    this.render();
  }

  render() {
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.style.zIndex = Math.floor(this.y);
  }
}
const board = document.querySelector(".bounds");
console.log(board.offsetWidth);
const player1 = new Bean(
  Math.random() * board.offsetWidth,
  Math.random() * board.offsetHeight,
  Math.random() * 200 + 100,
  Math.random() * 100 + 50,
  board,
  "#000000"
);
let characters = [player1];

for (let i = 0; i < 1; i++) {
  characters.push(
    new Bean(
      Math.random() * board.offsetWidth,
      Math.random() * board.offsetHeight,
      Math.random() * 100 + 100,
      Math.random() * 50 + 50,
      board,
      "#000000"
    )
  );
}

window.addEventListener("mousemove", (e) => {
  player1.target = true;
  // console.log(e.screenX, e.screenY);
  // console.log(e);
  player1.xTarget = e.offsetX;
  player1.yTarget = e.offsetY;
  for (let i = 0; i < characters.length; i++) {
    characters[i].xTarget = e.offsetX;
    characters[i].yTarget = e.offsetY;
    characters[i].target = true;
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.color.value);
  console.log("hi");
  characters.push(
    new Bean(
      Math.random() * board.offsetWidth,
      Math.random() * board.offsetHeight,
      e.target.height.value,
      e.target.width.value,
      board,
      e.target.color.value
    )
  );
});

window.requestAnimationFrame(gameLoop);
