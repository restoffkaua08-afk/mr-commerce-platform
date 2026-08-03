import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { api } from '../services/api';
import './Explore.css';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarca, setSelectedMarca] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  useEffect(() => {
    if (location.state?.selectedProduct) {
      setSelectedProduct(location.state.selectedProduct);
    }
  }, [location.state]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedMarca, products]);

  const loadData = async () => {
    setLoading(true);
    const [productsData, marcasData] = await Promise.all([
      api.getAllProducts(),
      api.getMarcas()
    ]);
    setProducts(productsData);
    setFilteredProducts(productsData);
    setMarcas(marcasData);
    setLoading(false);
  };

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedMarca) {
      filtered = filtered.filter(p => p.marca === selectedMarca);
    }
    
    setFilteredProducts(filtered);
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
    setSelectedProduct(product);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="explore fade-in">
      <div className="search-section">
        <input
          type="text"
          className="search-input glass"
          placeholder="Buscar produtos, marcas ou categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="filters">
          <select
            className="filter-select glass"
            value={selectedMarca}
            onChange={(e) => setSelectedMarca(e.target.value)}
          >
            <option value="">Todas as marcas</option>
            {marcas.map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onFavorite={handleFavorite}
            isFavorite={isFavorite(product.id)}
            onClick={handleProductClick}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>Nenhum produto encontrado</p>
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

export default Explore;