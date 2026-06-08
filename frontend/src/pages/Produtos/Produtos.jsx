import React from 'react';

function Produtos() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(45deg, #ff7b00, #ffae00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nossos Produtos</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd' }}>
        Conheça as soluções de aprendizagem inteligente desenvolvidas pela MAKALGROUP:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffae00' }}>⚡ Flashcards PRO</h3>
          <p style={{ margin: '0', color: '#ccc' }}>Milhares de questões organizadas de forma dinâmica para potencializar seus estudos por repetição espaçada ativa.</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffae00' }}>📊 Simulador de Desempenho</h3>
          <p style={{ margin: '0', color: '#ccc' }}>Analise suas fraquezas e fortalezas em tempo real com gráficos e insights guiados por inteligência cognitiva.</p>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
