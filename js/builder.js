let currentStep = 1;

let product = null;
let color = null;
let size = null;

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

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// CARRITO
function addToCart() {
  const designs = [];

  document.querySelectorAll("#designs img").forEach(img => {
    designs.push(img.src);
  });

  const item = { product, color, size, designs };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado al carrito");

  window.location.href = "cart.html";
}
