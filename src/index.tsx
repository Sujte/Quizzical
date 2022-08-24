import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./Quiz";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
