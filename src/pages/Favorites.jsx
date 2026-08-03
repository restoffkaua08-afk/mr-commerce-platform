import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const handleFavorite = (product) => {
    const newFavorites = favorites.filter(f => f.id !== product.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (productId) => {
    return favorites.some(f => f.id === productId);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="favorites fade-in">
      <h1 className="favorites-title">Meus Favoritos</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">❤️</div>
          <p className="empty-text">Você ainda não tem produtos favoritos</p>
          <p className="empty-subtext">Explore nossos produtos e adicione aos favoritos</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={handleFavorite}
              isFavorite={isFavorite(product.id)}
              onClick={handleProductClick}
            />
          ))}
        </div>
      )}
      
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Favorites;