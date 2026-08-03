import React, { useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleExternalLink = () => {
    if (product.link_externo) {
      window.open(product.link_externo, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-images">
          <img src={product.imagem1} alt={product.nome} />
          <img src={product.imagem2} alt={product.nome} />
        </div>
        
        <div className="modal-info">
          <h2 className="modal-title">{product.nome}</h2>
          <p className="modal-brand">{product.marca}</p>
          <p className="modal-description">{product.descricao}</p>
          <button className="modal-btn" onClick={handleExternalLink}>
            Ver na loja oficial →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;