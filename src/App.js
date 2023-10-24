import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import LoginRegister from "./pages/LoginRegister"
import ManageCategories from "./pages/ManageCategories"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/accountAdmin/ManageCategories" element={<ManageCategories/>} />
      </Routes>
    </Router>
  );
}

export default App;