function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function goToBuilder() {
  window.location.href = "builder.html";
}

function goToCart() {
  window.location.href = "cart.html";
}

// PROTEGER HOME
(function () {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "index.html";
  }
})();
