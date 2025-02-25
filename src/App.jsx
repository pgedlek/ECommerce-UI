import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Products from './components/products/Products';
import Navbar from './components/shared/Navbar';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import Cart from './components/cart/Cart';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-center' />
    </React.Fragment>
  );
}

export default App
