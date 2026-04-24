document.addEventListener("DOMContentLoaded", () => {

let product = null;
let fit = null;
let size = null;
let selectedColor = null;

let selected = null;
let dragging = false;
let offsetX = 0;
let offsetY = 0;

const preview = document.getElementById("preview");
const shirtShape = document.getElementById("shirtShape");

// COLORES
const colors = [
  {name:"Rojo Italia", value:"#b11226"},
  {name:"Aceituna", value:"#6b8e23"},
  {name:"Vino", value:"#722f37"},
  {name:"Blanco", value:"#ffffff"},
  {name:"Negro", value:"#000000"}
];

// NAV
window.goHome = function() {
  window.location.href = "home.html";
};

// PRODUCTO
window.selectProduct = function(p) {
  product = p;

  document.getElementById("step1").classList.add("hidden");

  if (p === "polera") {
    document.getElementById("stepFit").classList.remove("hidden");
  } else {
    showColors();
  }

  // CAMBIO DE FORMA
  if (p === "polo") {
    shirtShape.setAttribute("d","M50 20 L150 20 L170 70 L150 90 L150 200 L50 200 L50 90 L30 70 Z");
  }
};

// CORTE
window.selectFit = function(f) {
  fit = f;
  showColors();
};

// COLORES
function showColors() {
  document.getElementById("stepFit").classList.add("hidden");
  document.getElementById("stepColor").classList.remove("hidden");

  const container = document.getElementById("colors");
  container.innerHTML = "";

  colors.forEach(c => {
    const btn = document.createElement("button");

    btn.style.background = c.value;
    btn.className = "w-10 h-10 rounded";

    btn.onclick = () => selectColor(c);

    container.appendChild(btn);
  });
}

// COLOR
function selectColor(c) {
  selectedColor = c;

  shirtShape.setAttribute("fill", c.value);

  document.getElementById("stepColor").classList.add("hidden");
  document.getElementById("stepUpload").classList.remove("hidden");
}

// PASOS
window.goSize = function() {
  document.getElementById("stepUpload").classList.add("hidden");
  document.getElementById("stepSize").classList.remove("hidden");
};

// SUBIR
document.getElementById("upload").addEventListener("change", (e) => {
  const files = e.target.files;
  const container = document.getElementById("designs");

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = document.createElement("img");

      img.src = ev.target.result;
      img.className = "absolute w-24 cursor-move";

      img.style.left = "120px";
      img.style.top = "120px";

      enableDrag(img);
      enableResize(img);

      container.appendChild(img);
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

document.onmousemove = (e) => {
  if (!dragging || !selected) return;

  const rect = preview.getBoundingClientRect();

  selected.style.left = (e.clientX - rect.left - offsetX) + "px";
  selected.style.top = (e.clientY - rect.top - offsetY) + "px";
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

// TALLA
window.selectSize = function(e, s) {
  size = s;
};

// CARRITO
window.addToCart = function() {
  if (!size) return alert("Selecciona talla");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    product,
    fit,
    size,
    colorName: selectedColor?.name || "Sin color"
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "cart.html";
};

});
