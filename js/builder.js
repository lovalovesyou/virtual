let product, fit, size;
let currentSide = "front";
let selected = null;
let dragging = false;
let offsetX, offsetY;

// 🎨 COLORES LÖVA
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
function goHome() {
  window.location.href = "home.html";
}

// PRODUCTO
function selectProduct(p) {
  product = p;

  if (p === "polera") {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("stepFit").classList.remove("hidden");
  } else {
    showColors();
  }
}

// CORTE
function selectFit(f) {
  fit = f;
  showColors();
}

// MOSTRAR COLORES
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

    btn.onclick = () => selectColor(c.value);

    container.appendChild(btn);
  });
}

// COLOR
function selectColor(c) {
  document.getElementById("colorLayer").style.background = c;

  document.getElementById("stepColor").classList.add("hidden");
  document.getElementById("stepUpload").classList.remove("hidden");
}

// CAMBIO LADO
function toggleSide() {
  currentSide = currentSide === "front" ? "back" : "front";
  alert("Vista: " + currentSide);
}

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
      enableSelect(img);

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// DRAG REAL (SUAVE)
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

// RESIZE (FIJO)
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
function deleteSelected() {
  if (selected) {
    selected.remove();
    selected = null;
  }
}

// TALLA
function selectSize(s) {
  size = s;
}

// CARRITO
function addToCart() {
  if (!size) return alert("Selecciona talla");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ product, fit, size });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Agregado");
  window.location.href = "cart.html";
}
