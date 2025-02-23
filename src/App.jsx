import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Products from './components/products/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
