import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home"; 
import LoginRegister from "./pages/LoginRegister";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
    </Router>
  );
}

export default App;