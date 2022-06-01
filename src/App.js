import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import MainContent from "./home";
import Navbar from "./nav";
import Privacy from "./privacy";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainContent />}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
