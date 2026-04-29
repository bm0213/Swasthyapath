import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";
import { registerSW } from "./utils/serviceWorker";

registerSW();

const isAdmin = window.location.pathname === "/admin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdmin ? <AdminDashboard /> : <App />}
  </React.StrictMode>
);