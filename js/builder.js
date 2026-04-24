document.addEventListener("DOMContentLoaded", () => {

let product = null;
let fit = null;
let size = null;
let selectedColor = null;
let view = "front";

let selected = null;
let dragging = false;
let offsetX = 0;
let offsetY = 0;

const preview = document.getElementById("preview");
const mockup = document.getElementById("mockup");
const designsContainer = document.getElementById("designs");

const mockups = {
  polera: {
    front: "assets/mockups/polera_front.png.png",
    back: "assets/mockups/polera_back.png.png"
  },
  polo: {
    front: "assets/mockups/polo_front.png.png",
    back: "assets/mockups/polo_back.png.png"
  },
  canguro: {
    front: "assets/mockups/canguro_front.png.png",
    back: "assets/mockups/canguro_back.png.png"
  },
  sudadera: {
    front: "assets/mockups/sudadera_front.png.png",
    back: "assets/mockups/sudadera_back.png.png"
  }
};

const colors = [
  {name:"Rojo Italia", value:"#b11226"},
  {name:"Aceituna", value:"#6b8e23"},
  {name:"Vino", value:"#722f37"},
  {name:"Blanco", value:"#ffffff"},
  {name:"Verde pino", value:"#0b3d2e"},
  {name:"Grafito", value:"#2f2f2f"},
  {name:"Azul marino", value:"#0a1f44"},
  {name:"Maringo", value:"#3c3c3c"},
  {name:"Negro", value:"#000000"},
  {name:"Blanco Melange", value:"#e5e5e5"},
  {name:"Verde militar", value:"#4b5320"},
  {name:"Azul acero", value:"#4682b4"},
  {name:"Índigo graff", value:"#2c3e75"},
  {name:"Melange", value:"#cfcfcf"},
  {name:"Jeans jaspe", value:"#5a6c7d"},
  {name:"Ocean graff", value:"#2e8b8b"},
  {name:"Bronce", value:"#cd7f32"},
  {name:"Arena", value:"#d2b48c"},
  {name:"Verde menta", value:"#98ff98"},
  {name:"Arena graff", value:"#c2a680"},
  {name:"Cereza graff", value:"#8b0000"}
];

// NAV
window.goHome = () => window.location.href = "home.html";

// PRODUCTO
window.selectProduct = function(p) {
  product = p;
  mockup.src = mockups[p][view];

  designsContainer.innerHTML = "";
  selected = null;
  selectedColor = null;

  document.getElementById("step1").classList.add("hidden");

  if (p === "polera") {
    document.getElementById("stepFit").classList.remove("hidden");
  } else {
    showColors();
  }
};

// VIEW
window.setView = function(v) {
  view = v;
  if (product) mockup.src = mockups[product][view];
};

// FIT
window.selectFit = function(f) {
  fit = f;
  showColors();
};

// COLORS
function showColors() {
  document.getElementById("stepFit").classList.add("hidden");
  document.getElementById("stepColor").classList.remove("hidden");

  const container = document.getElementById("colors");
  container.innerHTML = "";

  colors.forEach(c => {
    const btn = document.createElement("button");

    btn.style.background = c.value;
    btn.className = "w-10 h-10 rounded border";

    btn.onclick = () => selectColor(c);

    container.appendChild(btn);
  });
}

// 🔥 SOLO LA PRENDA CAMBIA DE COLOR
function selectColor(c) {
  selectedColor = c;
  applyColor(c.value);

  document.getElementById("stepColor").classList.add("hidden");
  document.getElementById("stepUpload").classList.remove("hidden");
}

// 🔥 COLOR INTENSO REAL
function applyColor(hex) {
  mockup.style.filter = `
    brightness(0)
    saturate(100%)
    sepia(100%)
    hue-rotate(${getHue(hex)}deg)
    saturate(900%)
    brightness(1.25)
  `;
}

function getHue(hex) {
  const r = parseInt(hex.substring(1,3),16);
  const g = parseInt(hex.substring(3,5),16);
  const b = parseInt(hex.substring(5,7),16);

  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0;

  if (max !== min) {
    if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360;
    else if (max === g) h = (60 * ((b - r) / (max - min)) + 120);
    else h = (60 * ((r - g) / (max - min)) + 240);
  }

  return h;
}

// SIZE
window.goSize = function() {
  document.getElementById("stepUpload").classList.add("hidden");
  document.getElementById("stepSize").classList.remove("hidden");
};

// UPLOAD
document.getElementById("upload").addEventListener("change", (e) => {
  const files = e.target.files;

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = document.createElement("img");

      img.src = ev.target.result;
      img.className = "absolute w-24 cursor-move";

      img.style.left = "120px";
      img.style.top = "120px";

      enableDrag(img);
      enableTouch(img);
      enableResize(img);
      enableSelect(img);

      designsContainer.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// DRAG
function enableDrag(el) {
  el.onmousedown = (e) => {
    dragging = true;
    selected = el;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
  };
}

// TOUCH
function enableTouch(el) {
  el.addEventListener("touchstart", (e) => {
    dragging = true;
    selected = el;

    const t = e.touches[0];
    const rect = el.getBoundingClientRect();

    offsetX = t.clientX - rect.left;
    offsetY = t.clientY - rect.top;
  });

  el.addEventListener("touchmove", (e) => {
    if (!dragging || selected !== el) return;

    const t = e.touches[0];
    const rect = preview.getBoundingClientRect();

    moveElement(el, t.clientX, t.clientY, rect);
  });

  el.addEventListener("touchend", () => dragging = false);
}

// MOVE
function moveElement(el, x, y, rect) {
  let px = x - rect.left - offsetX;
  let py = y - rect.top - offsetY;

  px = Math.max(0, Math.min(px, rect.width - el.offsetWidth));
  py = Math.max(0, Math.min(py, rect.height - el.offsetHeight));

  el.style.left = px + "px";
  el.style.top = py + "px";
}

// MOUSE
document.onmousemove = (e) => {
  if (!dragging || !selected) return;

  const rect = preview.getBoundingClientRect();
  moveElement(selected, e.clientX, e.clientY, rect);
};

document.onmouseup = () => dragging = false;

// RESIZE
function enableResize(el) {
  el.onwheel = (e) => {
    e.preventDefault();

    let w = el.offsetWidth;
    w += (e.deltaY < 0 ? 10 : -10);

    if (w > 20 && w < 400) {
      el.style.width = w + "px";
    }
  };
}

// SELECT
function enableSelect(el) {
  el.onclick = (e) => {
    e.stopPropagation();

    if (selected) selected.style.outline = "none";

    selected = el;
    el.style.outline = "2px solid red";
  };
}

// DELETE
window.deleteSelected = function() {
  if (selected) {
    selected.remove();
    selected = null;
  }
};

// SIZE
window.selectSize = function(e, s) {
  size = s;

  document.querySelectorAll("#stepSize button").forEach(btn => {
    btn.classList.remove("bg-white","text-black");
    btn.classList.add("bg-zinc-800");
  });

  e.target.classList.add("bg-white","text-black");
};

// CART
window.addToCart = function() {
  if (!size) return alert("Selecciona talla");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    product,
    fit,
    size,
    color: selectedColor?.name || "Sin color"
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "cart.html";
};

});
