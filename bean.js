const names = ["john", "steve", "alan"];

class Bean {
  constructor(x, y, height, width, board, color) {
    this.name = names[Math.floor(Math.random() * 3)];
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
    this.face = this.dom.querySelector(".face");
    this.notes = this.dom.querySelector(".notes");
    this.notes.innerHTML = `<h1>Name:${this.name}</h1><p>Height:${Math.floor(
      this.height
    )}</p>`;
    this.targetNode = document.createElement("div");
    this.board.appendChild(this.targetNode);
    this.targetNode.style.width = "10px";
    this.targetNode.style.height = "10px";
    this.targetNode.style.background = "red";
    this.targetNode.style.position = "absolute";
  }

  init() {
    this.board.appendChild(this.dom);
    this.dom.classList.add("character");
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.innerHTML = `<div class='body'><div class="bean"  style='background :${this.color}; width:${this.width}px; height:${this.height}px'><div class='texture'></div><div class="face"><div class="eye"></div><div class="eye"></div></div><div class="mouth"><path d="M132,242 C120,387 303,394 307,237" /></div></div><div class="shadow"></div><div class="hitbox"></div></div><div class="notes hidden"></div>`;

    setInterval(() => {
      [this.xTarget, this.yTarget] = [
        Math.random() * 2000,
        Math.random() * 1000,
      ];
      this.target = true;
    }, 20000);

    this.dom.onmouseover = () => {
      this.notes.classList.toggle("hidden");
    };

    this.dom.onmouseout = () => {
      this.notes.classList.toggle("hidden");
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
      }
    }
  }

  move() {
    //bounds check
    if (this.x < this.width) this.xDir += 0.1;
    if (this.y < this.height) this.yDir += 0.1;
    if (this.y > this.board.offsetHeight) this.yDir -= 0.1;
    if (this.x > this.board.offsetWidth) this.xDir -= 0.1;

    //Move to
    if (this.target === true) {
      const xDiff = Math.abs(this.xTarget - this.x);
      const yDiff = Math.abs(this.yTarget - this.y);

      this.xTarget < this.x ? (this.xDir -= 0.1) : (this.xDir += 0.1);
      this.yTarget < this.y ? (this.yDir -= 0.1) : (this.yDir += 0.1);

      if (xDiff < this.radius) this.xDir = 0;
      if (yDiff < this.radius) this.yDir = 0;
      if (xDiff < this.radius && yDiff < this.radius) {
        //console.log("im here at ", this.x, this.y, this);
        //this.target = false;
      }
    }

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
      this.face.style.marginLeft = 5 + "px";
    } else if (this.xDir < 0) {
      this.face.style.marginLeft = -5 + "px";
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

  moveTo(x, y) {
    this.xTarget = x;
    this.yTarget = y;
  }

  render() {
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.style.zIndex = Math.floor(this.y);

    this.targetNode.style.left = this.xTarget + "px";
    this.targetNode.style.top = this.yTarget + "px";
  }
}
