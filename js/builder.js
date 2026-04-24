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

// 🧥 MOCKUPS
const mockups = {
  polera: {
    front: "assets/mockups/polera_front.png",
    back: "assets/mockups/polera_back.png"
  },
  polo: {
    front: "assets/mockups/polo_front.png",
    back: "assets/mockups/polo_back.png"
  },
  canguro: {
    front: "assets/mockups/canguro_front.png",
    back: "assets/mockups/canguro_back.png"
  },
  sudadera: {
    front: "assets/mockups/sudadera_front.png",
    back: "assets/mockups/sudadera_back.png"
  }
};

// 🎨 COLORES (COMPLETO RESTAURADO)
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

// =========================
// PRODUCTO
// =========================
window.selectProduct = function(p) {
  product = p;

  mockup.src = mockups[p][view];

  // reset seguro
  designsContainer.innerHTML = "";
  selected = null;
  selectedColor = null;
  document.getElementById("colorLayer").style.background = "transparent";

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

// =========================
// COLORES
// =========================
function showColors() {
  document.getElementById("stepFit").classList.add("hidden");
  document.getElementById("stepColor").classList.remove("hidden");

  const container = document.getElementById("colors");
  container.innerHTML = "";

  colors.forEach(c => {
    const btn = document.createElement("button");

    btn.style.background = c.value;
    btn.title = c.name;
    btn.className = "w-10 h-10 rounded border";

    btn.onclick = () => selectColor(c);

    container.appendChild(btn);
  });
}

function selectColor(c) {
  selectedColor = c;

  document.getElementById("colorLayer").style.background = c.value;

  document.getElementById("stepColor").classList.add("hidden");
  document.getElementById("stepUpload").classList.remove("hidden");
}

// =========================
// SIGUIENTE PASO
// =========================
window.goSize = function() {
  document.getElementById("stepUpload").classList.add("hidden");
  document.getElementById("stepSize").classList.remove("hidden");
};

// =========================
// UPLOAD
// =========================
document.getElementById("upload").addEventListener("change", (e) => {
  const files = e.target.files;

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = document.createElement("img");

      img.src = ev.target.result;
      img.className = "absolute w-24 cursor-move select-none";

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

// =========================
// DRAG PC
// =========================
function enableDrag(el) {
  el.onmousedown = (e) => {
    dragging = true;
    selected = el;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
  };
}

// =========================
// TOUCH MÓVIL
// =========================
function enableTouch(el) {
  el.addEventListener("touchstart", (e) => {
    dragging = true;
    selected = el;

    const touch = e.touches[0];
    const rect = el.getBoundingClientRect();

    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
  });

  el.addEventListener("touchmove", (e) => {
    if (!dragging || selected !== el) return;

    const touch = e.touches[0];
    const rect = preview.getBoundingClientRect();

    moveElement(el, touch.clientX, touch.clientY, rect);
  });

  el.addEventListener("touchend", () => {
    dragging = false;
  });
}

// =========================
// MOVE LIMITADO
// =========================
function moveElement(el, clientX, clientY, rect) {
  let x = clientX - rect.left - offsetX;
  let y = clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(x, rect.width - el.offsetWidth));
  y = Math.max(0, Math.min(y, rect.height - el.offsetHeight));

  el.style.left = x + "px";
  el.style.top = y + "px";
}

// =========================
// MOVE MOUSE
// =========================
document.onmousemove = (e) => {
  if (!dragging || !selected) return;

  const rect = preview.getBoundingClientRect();
  moveElement(selected, e.clientX, e.clientY, rect);
};

document.onmouseup = () => dragging = false;

// =========================
// RESIZE
// =========================
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

// =========================
// SELECT
// =========================
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

// =========================
// SIZE
// =========================
window.selectSize = function(e, s) {
  size = s;

  document.querySelectorAll("#stepSize button").forEach(btn => {
    btn.classList.remove("bg-white","text-black");
    btn.classList.add("bg-zinc-800");
  });

  e.target.classList.add("bg-white","text-black");
};

// =========================
// CART
// =========================
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
