import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home"; 
import AccountUser from "./pages/AccountUser"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<AccountUser />} />
      </Routes>
    </Router>
  );
}

export default App;