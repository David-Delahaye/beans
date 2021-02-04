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

const formCloser = document.querySelector(".form-closer");
formCloser.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
  test.dom.classList.toggle("hidden");
});

const test = new Bean(100, 100, 200, 100, form, "#ffffff");

const colorPicker = document.querySelector("#color");
colorPicker.addEventListener("input", (e) => {
  test.color = e.target.value;
  test.init();
});

const heightPicker = document.querySelector("#height");
heightPicker.addEventListener("input", (e) => {
  test.height = e.target.value;
  test.init();
});

const widthPicker = document.querySelector("#width");
widthPicker.addEventListener("input", (e) => {
  test.width = e.target.value;
  test.init();
});

dragElement(document.getElementById("form"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-head")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-head").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  test.init();
}
