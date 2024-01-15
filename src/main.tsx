import React from "react";
import ReactDOM from "react-dom/client";
import { TelegramProvider } from "./context/TelegramProvider.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </React.StrictMode>
);
