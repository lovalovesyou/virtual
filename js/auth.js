// IMPORTS FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 PEGA AQUÍ TU CONFIG DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCoptsSyuE612fp1Y-XDUkPhN2PKKotTWE",
  authDomain: "lova-260b5.firebaseapp.com",
  projectId: "lova-260b5",
  appId: "1:955507904645:web:e9aae66b5aaddd3b5c59ec"
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
};

// REGISTER
window.register = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Usuario creado correctamente");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
};
