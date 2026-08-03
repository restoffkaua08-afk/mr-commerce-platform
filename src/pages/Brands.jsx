import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Brands.css';

const Brands = () => {
  const [marcas, setMarcas] = useState([]);
  const [productsByBrand, setProductsByBrand] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    setLoading(true);
    const marcasData = await api.getMarcas();
    setMarcas(marcasData);
    
    const productsData = {};
    for (const marca of marcasData) {
      const products = await api.getAllProducts({ marca });
      productsData[marca] = products;
    }
    setProductsByBrand(productsData);
    setLoading(false);
  };

  const handleBrandClick = (marca) => {
    navigate('/explorar');
    setTimeout(() => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.value = marca;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="brands fade-in">
      <h1 className="brands-title">Nossas Marcas</h1>
      <div className="brands-grid">
        {marcas.map(marca => (
          <div key={marca} className="brand-card glass" onClick={() => handleBrandClick(marca)}>
            <div className="brand-icon">🏷️</div>
            <h3 className="brand-name">{marca}</h3>
            <p className="brand-count">
              {productsByBrand[marca]?.length || 0} produtos
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;