function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Completa los campos");
    return;
  }

  // Simulación login (FASE 1)
  localStorage.setItem("user", email);

  window.location.href = "home.html";
}
