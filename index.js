let ordered = false;

function getDistanceBetween(x1, x2, y1, y2, r1, r2) {
  const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  if (distance < r1 + r2) {
    return distance;
  }
  return false;
}

function gameLoop() {
  characters.sort(function (a, b) {
    return b["height"] - a["height"];
  });
  console.log(ordered);
  if (ordered) {
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      character.moveTo(100 + 200 * i, 500);
    }
  }

  characters.forEach((character) => {
    character.move();
  });

  window.requestAnimationFrame(gameLoop);
}

const board = document.querySelector(".bounds");
console.log(board.offsetWidth);

let characters = [];

for (let i = 0; i < 1; i++) {
  characters.push(
    new Bean(
      Math.random() * board.offsetWidth,
      Math.random() * board.offsetHeight,
      Math.random() * 100 + 100,
      Math.random() * 50 + 50,
      board,
      "#ffffff"
    )
  );
}

//follow mouse
window.addEventListener("click", (e) => {
  // console.log(e.screenX, e.screenY);
  // console.log(e);
  for (let i = 0; i < characters.length; i++) {
    characters[i].xTarget = e.offsetX;
    characters[i].yTarget = e.offsetY;
    characters[i].target = true;
  }
});

const order = document.querySelector(".order");

order.addEventListener("click", () => {
  console.log("hey");
  ordered = !ordered;
  order.classList.toggle("on");
});

window.requestAnimationFrame(gameLoop);
