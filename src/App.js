import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home"; 
import AccountAdmin from "./pages/AccountAdmin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<AccountAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;