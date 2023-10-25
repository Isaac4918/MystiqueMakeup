import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import LoginRegister from "./pages/LoginRegister"
import ManageCategories from "./pages/ManageCategories"
import CreatePublication from "./pages/CreatePublication"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/accountAdmin/ManageCategories" element={<ManageCategories/>} />
        <Route path="/account/create" element={<CreatePublication/>}/>
      </Routes>
    </Router>
  );
}

export default App;