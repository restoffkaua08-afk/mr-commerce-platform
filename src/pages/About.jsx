import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about fade-in">
      <div className="about-content">
        <h1 className="about-title">Sobre o Product Aggregator</h1>
        
        <div className="about-section">
          <h2 className="section-title">Nossa Missão</h2>
          <p className="section-text">
            Conectar usuários aos melhores produtos das marcas mais renomadas do mundo,
            proporcionando uma experiência de descoberta única e sofisticada.
          </p>
        </div>
        
        <div className="about-section">
          <h2 className="section-title">Como Funciona</h2>
          <p className="section-text">
            Não vendemos produtos diretamente. Nossa plataforma agrega produtos de
            marcas parceiras, redirecionando você para as lojas oficiais para realizar
            sua compra com segurança e garantia de originalidade.
          </p>
        </div>
        
        <div className="about-section">
          <h2 className="section-title">Parceiros</h2>
          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-icon">👟</div>
              <h3>Nike</h3>
            </div>
            <div className="partner-card">
              <div className="partner-icon">🐊</div>
              <h3>Lacoste</h3>
            </div>
            <div className="partner-card">
              <div className="partner-icon">👕</div>
              <h3>Adidas</h3>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h2 className="section-title">Tecnologias</h2>
          <p className="section-text">
            Construído com React, PHP e MySQL, garantindo performance,
            segurança e a melhor experiência de navegação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;