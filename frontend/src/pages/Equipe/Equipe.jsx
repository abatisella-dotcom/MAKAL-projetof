import React from 'react';

function Equipe() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(45deg, #ff7b00, #ffae00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nossa Equipe</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd' }}>
        Conheça as mentes por trás da plataforma MAKAL:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ffae00', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎓</div>
          <h4 style={{ margin: '0 0 0.2rem 0' }}>Ana Koso</h4>
          <p style={{ margin: '0', color: '#aaa', fontSize: '0.9rem' }}>Líder de Desenvolvimento</p>
        </div>
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ffae00', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>💻</div>
          <h4 style={{ margin: '0 0 0.2rem 0' }}>Makal Dev Team</h4>
          <p style={{ margin: '0', color: '#aaa', fontSize: '0.9rem' }}>Engenharia de Software</p>
        </div>
      </div>
    </div>
  );
}

export default Equipe;
