import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔴 MISMO CONFIG AQUÍ
const firebaseConfig = {
  apiKey: "AIzaSyCoptsSyuE612fp1Y-XDUkPhN2PKKotTWE",
  authDomain: "lova-260b5.firebaseapp.com",
  projectId: "lova-260b5",
  appId: "1:955507904645:web:e9aae66b5aaddd3b5c59ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// PROTEGER HOME
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// NAV
window.goToBuilder = function () {
  window.location.href = "builder.html";
};

window.goToCart = function () {
  window.location.href = "cart.html";
};
