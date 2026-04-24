let currentStep = 1;

let product = null;
let fit = null;
let color = "#ffffff";
let size = null;

let selectedElement = null;
let isDragging = false;

// NAV
function goHome() {
  window.location.href = "home.html";
}

// PASOS
function nextStep() {
  document.getElementById("step" + currentStep).classList.add("hidden");
  currentStep++;
  document.getElementById("step" + currentStep).classList.remove("hidden");

  document.getElementById("progress").style.width = (currentStep * 25) + "%";
}

// PRODUCTO
function selectProduct(p) {
  product = p;

  if (p === "polera") {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step1b").classList.remove("hidden");
  } else {
    applyProductShape();
    nextStep();
  }
}

// CORTE
function selectFit(f) {
  fit = f;
  applyProductShape();
  nextStep();
}

// 🔥 FORMAS REALES
function applyProductShape() {
  const el = document.getElementById("shirtBase");

  if (product === "polera") {
    el.style.borderRadius = fit === "oversized" ? "30px" : "10px";
    el.style.width = fit === "oversized" ? "280px" : "220px";
  }

  if (product === "polo") {
    el.style.borderRadius = "10px";
    el.style.borderTop = "20px solid gray";
  }

  if (product === "canguro") {
    el.style.borderRadius = "20px";
    el.style.boxShadow = "inset 0 -20px 0 rgba(0,0,0,0.3)";
  }

  if (product === "sudadera") {
    el.style.borderRadius = "15px";
    el.style.width = "260px";
  }
}

// COLOR
function selectColor(c) {
  color = c;
  document.getElementById("shirtBase").style.background = c;
  nextStep();
}

// TALLA
function selectSize(e, s) {
  size = s;

  document.querySelectorAll("#step4 button").forEach(btn => {
    btn.classList.remove("bg-white", "text-black");
    btn.classList.add("bg-zinc-800");
  });

  e.target.classList.add("bg-white", "text-black");
}

// SUBIR
document.getElementById("upload").addEventListener("change", function (e) {
  const files = e.target.files;
  const container = document.getElementById("designs");

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = document.createElement("img");

      img.src = event.target.result;
      img.className = "absolute w-24 cursor-move";

      img.style.top = "100px";
      img.style.left = "100px";

      enableDrag(img);
      enableSelect(img);

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// 🔥 DRAG CORREGIDO REAL
function enableDrag(el) {
  el.addEventListener("mousedown", (e) => {
    selectedElement = el;
    isDragging = true;
  });
}

document.addEventListener("mousemove", (e) => {
  if (isDragging && selectedElement) {
    const rect = document.getElementById("preview").getBoundingClientRect();

    selectedElement.style.left = (e.clientX - rect.left) + "px";
    selectedElement.style.top = (e.clientY - rect.top) + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// SELECT
function enableSelect(el) {
  el.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedElement) selectedElement.style.outline = "none";

    selectedElement = el;
    el.style.outline = "2px solid red";
  });
}

// ELIMINAR
function deleteSelected() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
}

// CARRITO
function addToCart() {
  if (!size) {
    alert("Selecciona talla");
    return;
  }

  alert("Producto agregado");
  window.location.href = "cart.html";
}
