import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    loadFavorites();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const products = await api.getAllProducts();
    setFeaturedProducts(products.slice(0, 3));
    setPopularProducts(products.slice(3, 7));
    setLoading(false);
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const handleFavorite = (product) => {
    let newFavorites;
    const exists = favorites.find(f => f.id === product.id);
    if (exists) {
      newFavorites = favorites.filter(f => f.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some(f => f.id === productId);
  };

  const handleProductClick = (product) => {
    navigate('/explorar', { state: { selectedProduct: product } });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home fade-in">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Descubra produtos<br />
            <span className="hero-highlight">exclusivos</span>
          </h1>
          <p className="hero-subtitle">
            Os melhores produtos das marcas mais renomadas do mundo
          </p>
          <button className="hero-btn" onClick={() => navigate('/explorar')}>
            Explorar produtos →
          </button>
        </div>
      </section>

      <section className="featured">
        <h2 className="section-title">Destaques</h2>
        <div className="featured-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="featured-card">
              <ProductCard
                product={product}
                onFavorite={handleFavorite}
                isFavorite={isFavorite(product.id)}
                onClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="popular">
        <h2 className="section-title">Produtos Populares</h2>
        <div className="popular-grid">
          {popularProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={handleFavorite}
              isFavorite={isFavorite(product.id)}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;