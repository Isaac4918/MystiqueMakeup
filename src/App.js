import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import LoginRegister from "./pages/LoginRegister"
import ManageCategories from "./pages/ManageCategories"
import AccountUser from "./pages/AccountUser";
import AccountAdmin from "./pages/AccountAdmin";
import ModifyAccount from "./pages/ModifyAccount";
import DeleteSubCategory from "./pages/DeleteSubCategory";
import ProductManagement from "./pages/ProductManagement";
import ProcessedPurchase from "./pages/ProcessedPurchase";
import CreateCategory from "./pages/CreateCategory";
import ModifyCategory from "./pages/ModifyCategory"
import MyPurchases from "./pages/MyPurchases";
import ProductScreen from "./pages/ProductScreen";
import DeleteProduct from "./pages/DeleteProduct";
import ModifyProduct from "./pages/ModifyProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/accountUser" element={<AccountUser/>} />
        <Route path="/accountAdmin" element={<AccountAdmin/>} />
        <Route path="/account/modifyAccount" element={<ModifyAccount/>} />
        <Route path="/account/manageCategories" element={<ManageCategories/>} />
        <Route path="/account/manageCategories/deleteSubCategory" element={<DeleteSubCategory/>} />
        <Route path="/ProductManagement" element={<ProductManagement />} />
        <Route path="/ProcessedPurchase" element={<ProcessedPurchase />} />
        <Route path="/account/manageCategories/createCategory" element={<CreateCategory />} />
        <Route path="/account/manageCategories/modifyCategory" element={<ModifyCategory />} />
        <Route path="/MyPurchases" element={<MyPurchases />} />
        <Route path="/ProductScreen" element={<ProductScreen />} />
        <Route path="/DeleteProduct" element={<DeleteProduct />} />
        <Route path="/ModifyProduct" element={<ModifyProduct />} />
      </Routes>
    </Router>
  );
}

export default App;