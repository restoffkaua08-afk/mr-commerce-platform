import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onFavorite, isFavorite, onClick }) => {
  return (
    <div className="product-card glass" onClick={() => onClick(product)}>
      <div className="product-image">
        <img src={product.imagem1} alt={product.nome} loading="lazy" />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(product);
          }}
        >
          {isFavorite ? '❤️' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nome}</h3>
        <p className="product-brand">{product.marca}</p>
      </div>
    </div>
  );
};

export default ProductCard;