import React from 'react';
import './Produtos.module.css';

function Produtos() {
  return (
    <div className="produtos-container">
      <h1 className="produtos-titulo">Nossos Produtos</h1>
      <p className="produtos-intro">
        Conheça as soluções de aprendizagem inteligente desenvolvidas pela MAKALGROUP:
      </p>
      <div className="produtos-grid">
        <div className="produto-card">
          <h3 className="produto-nome">⚡ Flashcards PRO</h3>
          <p className="produto-descricao">
            Milhares de questões organizadas de forma dinâmica para potencializar seus estudos por repetição espaçada ativa.
          </p>
        </div>
        <div className="produto-card">
          <h3 className="produto-nome">📊 Simulador de Desempenho</h3>
          <p className="produto-descricao">
            Analise suas fraquezas e fortalezas em tempo real com gráficos e insights guiados por inteligência cognitiva.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
