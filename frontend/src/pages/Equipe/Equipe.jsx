import React from 'react';
import './Equipe.module.css';

function Equipe() {
  return (
    <div className="equipe-container">
      <h1 className="equipe-titulo">Nossa Equipe</h1>
      <p className="equipe-intro">
        Conheça as mentes por trás da plataforma MAKAL:
      </p>
      <div className="equipe-grid">
        <div className="equipe-card">
          <div className="equipe-avatar">🎓</div>
          <h4 className="equipe-nome">Ana Koso</h4>
          <p className="equipe-cargo">Líder de Desenvolvimento</p>
        </div>
        <div className="equipe-card">
          <div className="equipe-avatar">💻</div>
          <h4 className="equipe-nome">Makal Dev Team</h4>
          <p className="equipe-cargo">Engenharia de Software</p>
        </div>
      </div>
    </div>
  );
}

export default Equipe;
