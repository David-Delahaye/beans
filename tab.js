class Tab {
  constructor(parent) {
    this.parent = parent;
    this.dom = document.createElement("div");

    this.init();
    this.header = this.dom.querySelector("#form-head");
    this.body = this.dom.querySelector(".form-body");
    this.sample = this.dom.querySelector(".form-sample");

    this.test = new Bean(
      this.sample.clientWidth / 2,
      this.sample.clientHeight - 50,
      200,
      100,
      this.sample,
      "#ffffff"
    );

    this.formCloser = this.dom.querySelector(".form-closer");
    this.formCloser.addEventListener("click", (e) => {
      this.body.classList.toggle("hidden");
    });

    this.colorPicker = this.dom.querySelector("#color");
    this.colorPicker.addEventListener("input", (e) => {
      this.test.color = e.target.value;
      this.test.init();
    });

    this.heightPicker = this.dom.querySelector("#height");
    this.heightPicker.addEventListener("input", (e) => {
      this.test.height = e.target.value;
      this.test.init();
    });

    this.widthPicker = this.dom.querySelector("#width");
    this.widthPicker.addEventListener("input", (e) => {
      this.test.width = e.target.value;
      this.test.init();
    });
  }

  init() {
    this.parent.appendChild(this.dom);
    this.dom.id = "form";
    this.dom.innerHTML = `
    <div id="form-head">    <div class="form-closer">X</div></div>
    <form>
        <div class="form-body">
        
          <h1>Add a new bean</h1>
          <label for="width">Width</label>
          <input
            type="range"
            min="50"
            max="300"
            placeholder="width"
            name="width"
            id="width"
          />
          <label for="height">Height</label>
          <input
            type="range"
            min="50"
            max="300"
            placeholder="height"
            name="height"
            id="height"
          />
          <label for="color">Colour</label>
          <input type="color" placeholder="color" id="color" name="color" />
          <button>+ Add a new Bean</button>
          <div class='form-sample'>
          </div
        </div>
      </form>`;
    this.dom.addEventListener("submit", (e) => {
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
    dragElement(this.dom);
  }
}

const form = new Tab(document.querySelector("body"));

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
    console.log("happening");
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
}
