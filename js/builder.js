let currentStep = 1;

let product = null;
let color = "#ffffff";
let size = null;

let selectedElement = null;
let offsetX = 0;
let offsetY = 0;

let currentSide = "front";

let designsData = {
  front: [],
  back: []
};

// NAV
function goHome() {
  window.location.href = "home.html";
}

// PASOS
function nextStep() {
  document.getElementById("step" + currentStep).classList.add("hidden");
  currentStep++;
  document.getElementById("step" + currentStep).classList.remove("hidden");

  updateProgress();
}

// PROGRESS
function updateProgress() {
  document.getElementById("progress").style.width = (currentStep * 25) + "%";
}

// PRODUCTO
function selectProduct(p) {
  product = p;
  nextStep();
}

// COLOR (AHORA CAMBIA LA POLERA REAL)
function selectColor(c) {
  color = c;
  document.getElementById("shirtShape").setAttribute("fill", c);
  nextStep();
}

// GIRAR (simulado por espejo)
function rotateView() {
  saveCurrentDesigns();

  const shirt = document.getElementById("shirt");

  if (currentSide === "front") {
    shirt.style.transform = "scaleX(-1)";
    currentSide = "back";
  } else {
    shirt.style.transform = "scaleX(1)";
    currentSide = "front";
  }

  loadDesigns();
}

// GUARDAR
function saveCurrentDesigns() {
  const arr = [];

  document.querySelectorAll("#designs img").forEach(img => {
    arr.push({
      src: img.src,
      x: img.style.left,
      y: img.style.top,
      width: img.style.width,
      z: img.style.zIndex
    });
  });

  designsData[currentSide] = arr;
}

// CARGAR
function loadDesigns() {
  const container = document.getElementById("designs");
  container.innerHTML = "";

  designsData[currentSide].forEach(d => {
    const img = document.createElement("img");

    img.src = d.src;
    img.className = "absolute cursor-move";

    img.style.left = d.x;
    img.style.top = d.y;
    img.style.width = d.width;
    img.style.zIndex = d.z;

    enableDrag(img);
    enableResize(img);
    enableSelect(img);

    container.appendChild(img);
  });
}

// TALLA
function selectSize(e, s) {
  size = s;

  document.querySelectorAll("#step4 button").forEach(btn => {
    btn.classList.remove("bg-white", "text-black");
    btn.classList.add("bg-zinc-800");
  });

  e.target.classList.remove("bg-zinc-800");
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

      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.zIndex = 1;

      enableDrag(img);
      enableResize(img);
      enableSelect(img);

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// SELECCIÓN
function enableSelect(element) {
  element.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedElement) {
      selectedElement.style.outline = "none";
    }

    selectedElement = element;
    element.style.outline = "2px solid red";
  });
}

document.getElementById("preview").addEventListener("click", () => {
  if (selectedElement) {
    selectedElement.style.outline = "none";
  }
  selectedElement = null;
});

// ELIMINAR
function deleteSelected() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
}

// CAPAS
function bringForward() {
  if (selectedElement) {
    selectedElement.style.zIndex = parseInt(selectedElement.style.zIndex) + 1;
  }
}

function sendBackward() {
  if (selectedElement) {
    selectedElement.style.zIndex = parseInt(selectedElement.style.zIndex) - 1;
  }
}

// DRAG
function enableDrag(element) {
  element.addEventListener("mousedown", (e) => {
    selectedElement = element;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
}

document.addEventListener("mousemove", (e) => {
  if (selectedElement) {
    const rect = document.getElementById("preview").getBoundingClientRect();

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    selectedElement.style.left = x + "px";
    selectedElement.style.top = y + "px";
    selectedElement.style.transform = "none";
  }
});

document.addEventListener("mouseup", () => {});

// RESIZE
function enableResize(element) {
  element.addEventListener("wheel", (e) => {
    e.preventDefault();

    let w = element.offsetWidth;

    w += (e.deltaY < 0 ? 10 : -10);

    if (w > 30 && w < 300) {
      element.style.width = w + "px";
    }
  });
}

// CARRITO
function addToCart() {
  if (!size) {
    alert("Selecciona una talla");
    return;
  }

  saveCurrentDesigns();

  const item = {
    product,
    color,
    size,
    designs: designsData
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado al carrito");

  window.location.href = "cart.html";
}
