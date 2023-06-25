import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import PlayersProvider from "./context/PlayersContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlayersProvider>
      <App />
    </PlayersProvider>
  </React.StrictMode>
);
