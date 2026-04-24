let currentStep = 1;

let product = null;
let color = null;
let size = null;

let selectedElement = null;
let offsetX = 0;
let offsetY = 0;

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

// COLOR
function selectColor(c) {
  color = c;
  document.getElementById("preview").style.background = c;
  nextStep();
}

// TALLA
function selectSize(s) {
  size = s;
}

// SUBIR IMÁGENES
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

      enableDrag(img);
      enableResize(img);

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

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
    const container = document.getElementById("preview");
    const rect = container.getBoundingClientRect();

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    selectedElement.style.left = x + "px";
    selectedElement.style.top = y + "px";
    selectedElement.style.transform = "none";
  }
});

document.addEventListener("mouseup", () => {
  selectedElement = null;
});

// RESIZE (con rueda del mouse)
function enableResize(element) {
  element.addEventListener("wheel", (e) => {
    e.preventDefault();

    let currentWidth = element.offsetWidth;

    if (e.deltaY < 0) {
      currentWidth += 10;
    } else {
      currentWidth -= 10;
    }

    if (currentWidth > 30 && currentWidth < 300) {
      element.style.width = currentWidth + "px";
    }
  });
}

// CARRITO
function addToCart() {
  const designs = [];

  document.querySelectorAll("#designs img").forEach(img => {
    designs.push({
      src: img.src,
      x: img.style.left,
      y: img.style.top,
      width: img.style.width
    });
  });

  const item = { product, color, size, designs };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado al carrito");

  window.location.href = "cart.html";
}
