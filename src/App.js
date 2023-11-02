import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; 
import Cart from "./pages/Cart"; 
import Search from "./pages/Search"; 
import LoginRegister from "./pages/LoginRegister"
import ManageCategories from "./pages/categoryPages/ManageCategories"
import CreatePublication from "./pages/publicationPages/CreatePublication"
import AccountUser from "./pages/accountPages/AccountUser";
import AccountAdmin from "./pages/accountPages/AccountAdmin";
import ModifyAccount from "./pages/accountPages/ModifyAccount";
import DeleteCategory from "./pages/categoryPages/DeleteCategory";
import ProductManagement from "./pages/ProductManagement";
import ProcessedPurchase from "./pages/ProcessedPurchase";
import CreateCategory from "./pages/categoryPages/CreateCategory";
import ModifyCategory from "./pages/categoryPages/ModifyCategory"
import ManageAdmin from "./pages/accountPages/ManageAdmin";
import MyPurchases from "./pages/MyPurchases";
import ProductScreen from "./pages/ProductScreen";
import DeleteProduct from "./pages/DeleteProduct";
import ModifyProduct from "./pages/ModifyProduct";
import CreateProduct from "./pages/CreateProduct";
import PublicationScreen from "./pages/publicationPages/PublicationScreen";
import ModifyPublication from "./pages/publicationPages/ModifyPublication";
import PublicationManagement from "./pages/publicationPages/PublicationManagement";
import DeleteAccount from "./pages/accountPages/DeleteAccount";
import PaymentDetails from "./pages/PaymentDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/LoginRegister" element={<LoginRegister />} />
        <Route path="/accountAdmin/ManageCategories" element={<ManageCategories/>} />
        <Route path="/publication/create" element={<CreatePublication/>}/>
        <Route path="/publication/view" element={<PublicationScreen/>}/>
        <Route path="/accountUser" element={<AccountUser/>} />
        <Route path="/accountAdmin" element={<AccountAdmin/>} />
        <Route path="/account/modifyAccount" element={<ModifyAccount/>} />
        <Route path="/account/deleteAccount" element={<DeleteAccount/>} />
        <Route path="/account/manageCategories" element={<ManageCategories/>} />
        <Route path="/account/manageCategories/deleteCategory" element={<DeleteCategory/>} />
        <Route path="/ProductManagement" element={<ProductManagement />} />
        <Route path="/ProcessedPurchase" element={<ProcessedPurchase />} />
        <Route path="/account/manageCategories/createCategory" element={<CreateCategory />} />
        <Route path="/account/manageCategories/modifyCategory" element={<ModifyCategory />} />
        <Route path="/account/manageAdmin" element={<ManageAdmin/>} />
        <Route path="/MyPurchases" element={<MyPurchases />} />
        <Route path="/ProductScreen" element={<ProductScreen />} />
        <Route path="/DeleteProduct" element={<DeleteProduct />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route path="/ModifyProduct" element={<ModifyProduct />} />
        <Route path="/publication/modify" element={<ModifyPublication/>}/>
        <Route path="/publication/manage" element={<PublicationManagement/>}/>
        <Route path="/PaymentDetails" element={<PaymentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;