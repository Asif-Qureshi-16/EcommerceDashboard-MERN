import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Addproduct from "./components/Addproduct";
import Privatecomponent from "./components/Privatecomponent";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={Privatecomponent}/>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<Addproduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<h1>Logout Listing Component</h1>} />
          <Route path="/profile" element={<h1>Profile Listing Component</h1>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
        <Footer/>
    </>
  );
}

export default App;
