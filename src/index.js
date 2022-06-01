import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
const container = document.getElementById("root");
const TITLE = "Face2Fruit";
const root = createRoot(container);

root.render(
  <div className="baseplate">
    <title>{TITLE}</title>
    <App />
  </div>
);
