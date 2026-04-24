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

// PRODUCTO
function selectProduct(p) {
  product = p;

  if (p === "polera") {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step1b").classList.remove("hidden");
  } else {
    applyProductImage();
    nextStep();
  }
}

// CORTE
function selectFit(f) {
  fit = f;
  applyProductImage();
  nextStep();
}

// 🔥 IMÁGENES REALES (EMBED, NO FALLAN)
function applyProductImage() {
  const el = document.getElementById("shirtBase");

  const images = {
    polera: "https://i.imgur.com/7QZ8FQv.png",
    polo: "https://i.imgur.com/2nCt3Sbl.png",
    canguro: "https://i.imgur.com/6XgF6YBl.png",
    sudadera: "https://i.imgur.com/Z9a3XKrl.png"
  };

  el.style.backgroundImage = `url(${images[product]})`;
  el.style.backgroundSize = "contain";
  el.style.backgroundRepeat = "no-repeat";
  el.style.backgroundPosition = "center";
}

// COLOR
function selectColor(c) {
  color = c;
  document.getElementById("shirtBase").style.backgroundColor = c;
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
      enableResize(img);
      enableSelect(img);

      container.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

// 🔥 DRAG CORRECTO
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

// 🔥 RESIZE (VOLVIÓ)
function enableResize(el) {
  el.addEventListener("wheel", (e) => {
    e.preventDefault();

    let w = el.offsetWidth;
    w += (e.deltaY < 0 ? 10 : -10);

    if (w > 30 && w < 300) {
      el.style.width = w + "px";
    }
  });
}

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

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    product,
    color,
    size
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado");

  window.location.href = "cart.html";
}
