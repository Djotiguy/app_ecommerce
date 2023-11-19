import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import Product from "./components/SingleProduct";
import NoPage from "./components/NoPage";
import Panier from "./components/Panier";
import RecapPanier from "./components/RecapPanier";
import Orders from "./components/Orders";
import Example from "./components/Example";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <main className="dark:bg-slate-900 bg-slate-400">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product/>} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/recap-panier" element={<RecapPanier />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/example" element={<Example />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
