function goHome() {
  window.location.href = "home.html";
}

function loadCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "bg-zinc-900 p-4 rounded flex justify-between items-center";

    div.innerHTML = `
      <div>
        <p>Producto: ${item.product}</p>
        <p>Color: ${item.color}</p>
        <p>Talla: ${item.size}</p>
      </div>

      <button onclick="removeItem(${index})" class="bg-red-500 px-3 py-1 rounded">
        Eliminar
      </button>
    `;

    container.appendChild(div);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

loadCart();
