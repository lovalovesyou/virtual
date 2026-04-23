let currentStep = 1;

let product = null;
let color = null;
let size = null;

// NAV
function goHome() {
  window.location.href = "home.html";
}

// CAMBIAR PASO
function nextStep() {
  document.getElementById("step" + currentStep).classList.add("hidden");
  currentStep++;
  document.getElementById("step" + currentStep).classList.remove("hidden");

  updateProgress();
}

// PROGRESS BAR
function updateProgress() {
  const progress = document.getElementById("progress");
  progress.style.width = (currentStep * 25) + "%";
}

// SELECCIONAR PRODUCTO
function selectProduct(p) {
  product = p;
  updatePreview();
  nextStep();
}

// SELECCIONAR COLOR
function selectColor(c) {
  color = c;
  updatePreview();
  nextStep();
}

// SELECCIONAR TALLA
function selectSize(s) {
  size = s;
}

// PREVIEW
function updatePreview() {
  const preview = document.getElementById("preview");

  preview.innerHTML = product ? product.toUpperCase() : "Producto";

  if (color) {
    preview.style.background = color;
  }
}

// AGREGAR AL CARRITO
function addToCart() {
  const item = { product, color, size };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado al carrito");

  window.location.href = "cart.html";
}
