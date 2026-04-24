// 🔥 FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 TU CONFIG (MISMA QUE ANTES)
const firebaseConfig = {
  apiKey: "AIzaSyCoptsSyuE612fp1Y-XDUkPhN2PKKotTWE",
  authDomain: "lova-260b5.firebaseapp.com",
  projectId: "lova-260b5",
  appId: "1:955507904645:web:e9aae66b5aaddd3b5c59ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// NAV
function goHome() {
  window.location.href = "home.html";
}

// CARGAR CARRITO
function loadCart() {
  const container = document.getElementById("cartContainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  container.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "bg-zinc-900 p-4 rounded mb-4";

    div.innerHTML = `
      <p><strong>Producto:</strong> ${item.product}</p>
      <p><strong>Color:</strong> ${item.color}</p>
      <p><strong>Talla:</strong> ${item.size}</p>

      <div class="flex gap-2 mt-2 flex-wrap">
        ${item.designs.map(d => `<img src="${d.src}" class="w-16">`).join("")}
      </div>

      <button onclick="removeItem(${index})"
        class="mt-3 bg-red-500 px-4 py-2 rounded">
        Eliminar
      </button>
    `;

    container.appendChild(div);
  });
}

// ELIMINAR
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// 🔥 GUARDAR PEDIDO EN FIREBASE
async function saveOrder(cart) {
  try {
    await addDoc(collection(db, "orders"), {
      items: cart,
      date: new Date()
    });

    console.log("Pedido guardado en Firebase");
  } catch (error) {
    console.error("Error guardando pedido:", error);
  }
}

// WHATSAPP + FIREBASE
async function sendWhatsApp() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Carrito vacío");
    return;
  }

  // 🔥 GUARDAR EN FIREBASE
  await saveOrder(cart);

  let message = "Hola, quiero hacer un pedido:%0A%0A";

  cart.forEach((item, i) => {
    message += `Producto ${i + 1}:%0A`;
    message += `- Tipo: ${item.product}%0A`;
    message += `- Color: ${item.color}%0A`;
    message += `- Talla: ${item.size}%0A`;
    message += `- Diseños: ${item.designs.length} archivo(s)%0A%0A`;
  });

  const phone = "59164030721";

  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");

  // OPCIONAL: limpiar carrito
  localStorage.removeItem("cart");
}

// INIT
loadCart();
