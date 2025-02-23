import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Products from './components/products/Products';
import Navbar from './components/shared/Navbar';
import About from './components/about/About';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
