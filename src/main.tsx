import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TelegramProvider } from "./context/TelegramProvider.tsx";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TelegramProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </TelegramProvider>
  </React.StrictMode>
);
