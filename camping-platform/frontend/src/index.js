import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrando o Service Worker corretamente
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js")
      .then(() => console.log("✔️ Service Worker registrado!"))
      .catch((err) => console.error("❌ Erro no Service Worker:", err));
  });
}

// Medir performance da aplicação
reportWebVitals();
