// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 CONFIG
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// NAV
window.goHome = function () {
  window.location.href = "home.html";
};

// CARGAR PEDIDOS
async function loadOrders() {
  const container = document.getElementById("ordersContainer");

  const querySnapshot = await getDocs(collection(db, "orders"));

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");

    div.className = "bg-zinc-900 p-4 rounded mb-4";

    div.innerHTML = `
      <p><strong>Pedido ID:</strong> ${doc.id}</p>
      <p><strong>Fecha:</strong> ${new Date(data.date.seconds * 1000).toLocaleString()}</p>

      ${data.items.map((item, i) => `
        <div class="mt-3 p-3 bg-zinc-800 rounded">
          <p><strong>Producto ${i + 1}</strong></p>
          <p>Tipo: ${item.product}</p>
          <p>Color: ${item.color}</p>
          <p>Talla: ${item.size}</p>

          <div class="flex gap-2 mt-2 flex-wrap">
            ${item.designs.map(d => `<img src="${d.src}" class="w-16">`).join("")}
          </div>
        </div>
      `).join("")}
    `;

    container.appendChild(div);
  });
}

// INIT
loadOrders();
