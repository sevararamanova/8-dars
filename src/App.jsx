
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Card from './components/card/Card.jsx';
import ProductDetails from './components/productDetails/ProductDetails.jsx'; 

function Home({ products, handleLike, likedProducts }) {
  return (
    <div className="products">
      {products.map(product => (
        <Card key={product.id} 
        product={product} handleLike={handleLike} likedProducts={likedProducts} />
      ))}
    </div>
  );
}

function LikedProducts({ likedProducts, handleLike }) {
  return (
    <div className="liked-products">
      <h2>Liked Products</h2>
      {likedProducts.map(product => (
        <div key={product.id} className="liked-card">
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <button
            className="unlike-button"
            onClick={() => handleLike(product)}
          >
            Unlike
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  const handleLike = (product) => {
    if (likedProducts.includes(product)) {
      setLikedProducts(likedProducts.filter(p => p.id !== product.id));
    } else {
      setLikedProducts([...likedProducts, product]);
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/liked">Liked Products</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home products={products} handleLike={handleLike} likedProducts={likedProducts} />} />
          <Route path="/liked" element={<LikedProducts likedProducts={likedProducts} handleLike={handleLike} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails handleLike={handleLike} likedProducts={likedProducts} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
