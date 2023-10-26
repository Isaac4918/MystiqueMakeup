import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import LoginRegister from "./pages/LoginRegister"

import ManageCategories from "./pages/ManageCategories"
import CreatePublication from "./pages/CreatePublication"
import AccountUser from "./pages/AccountUser";
import AccountAdmin from "./pages/AccountAdmin";
import ModifyAccount from "./pages/ModifyAccount";
import DeleteSubCategory from "./pages/DeleteSubCategory";
import ProductManagement from "./pages/ProductManagement";
import ProcessedPurchase from "./pages/ProcessedPurchase";
import CreateCategory from "./pages/CreateCategory";
import ModifyCategory from "./pages/ModifyCategory"
import ManageAdmin from "./pages/accountPages/ManageAdmin";
import MyPurchases from "./pages/MyPurchases";

import ManageCategories from "./pages/categoryPages/ManageCategories"
import AccountUser from "./pages/accountPages/AccountUser";
import AccountAdmin from "./pages/accountPages/AccountAdmin";
import ModifyAccount from "./pages/accountPages/ModifyAccount";
import DeleteCategory from "./pages/categoryPages/DeleteCategory";
import ProductManagement from "./pages/ProductManagement";
import ProcessedPurchase from "./pages/ProcessedPurchase";
import CreateCategory from "./pages/categoryPages/CreateCategory";
import ModifyCategory from "./pages/categoryPages/ModifyCategory"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/accountAdmin/ManageCategories" element={<ManageCategories/>} />
        <Route path="/publication/create" element={<CreatePublication/>}/>
        <Route path="/accountUser" element={<AccountUser/>} />
        <Route path="/accountAdmin" element={<AccountAdmin/>} />
        <Route path="/account/modifyAccount" element={<ModifyAccount/>} />
        <Route path="/account/manageCategories" element={<ManageCategories/>} />
        <Route path="/account/manageCategories/deleteCategory" element={<DeleteCategory/>} />
        <Route path="/ProductManagement" element={<ProductManagement />} />
        <Route path="/ProcessedPurchase" element={<ProcessedPurchase />} />
        <Route path="/account/manageCategories/createCategory" element={<CreateCategory />} />
        <Route path="/account/manageCategories/modifyCategory" element={<ModifyCategory />} />
        <Route path="/account/manageAdmin" element={<ManageAdmin/>} />
        <Route path="/MyPurchases" element={<MyPurchases />} />
      </Routes>
    </Router>
  );
}

export default App;