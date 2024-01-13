import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './Components/Product/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<ProductPage />}></Route>
          <Route
            path='/product-detail/:productId'
            element={<ProductDetail />}
          ></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/checkout' element={<CheckoutPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
