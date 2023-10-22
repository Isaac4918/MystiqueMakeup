import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home"; 
<<<<<<< HEAD
import AccountAdmin from "./pages/AccountAdmin";
=======
import AccountUser from "./pages/AccountUser"
import ModifyAccount from "./pages/ModifyAccount";
import LoginRegister from "./pages/LoginRegister";
>>>>>>> Isaac

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/LoginRegister" element={<AccountAdmin />} />
=======
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/account/modify" element={<ModifyAccount/>}/>
>>>>>>> Isaac
      </Routes>
    </Router>
  );
}

export default App;