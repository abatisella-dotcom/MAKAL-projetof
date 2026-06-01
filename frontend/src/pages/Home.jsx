import React, { useState, useEffect } from 'react';

export default function Home({ onLogout }) {
  const [username, setUsername] = useState('Usuário');
  const [conteudos, setConteudos] = useState([]);
  const [vestibulares, setVestibulares] = useState([]);
  const [loadingConteudos, setLoadingConteudos] = useState(true);
  const [loadingVestibulares, setLoadingVestibulares] = useState(true);
  const [erroConteudos, setErroConteudos] = useState('');
  const [erroVestibulares, setErroVestibulares] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    const storedUsername = localStorage.getItem('jwt-username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (!token) {
      onLogout();
      return;
    }

    // Carregar Conteúdos (Rota Protegida)
    const fetchConteudos = async () => {
      try {
        const response = await fetch('/conteudos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setConteudos(data);
        } else {
          setErroConteudos(`Erro ao carregar dados protegidos (Código: ${response.status})`);
        }
      } catch (error) {
        console.error('Erro ao conectar à API para Conteúdos:', error);
        setErroConteudos('Erro de conexão ao carregar conteúdos.');
      } finally {
        setLoadingConteudos(false);
      }
    };

    // Carregar Vestibulares (Rota Protegida)
    const fetchVestibulares = async () => {
      try {
        const response = await fetch('/vestibulares', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setVestibulares(data);
        } else {
          setErroVestibulares(`Erro ao carregar dados protegidos (Código: ${response.status})`);
        }
      } catch (error) {
        console.error('Erro ao conectar à API para Vestibulares:', error);
        setErroVestibulares('Erro de conexão ao carregar vestibulares.');
      } finally {
        setLoadingVestibulares(false);
      }
    };

    fetchConteudos();
    fetchVestibulares();
  }, [onLogout]);

  const handleLogoutClick = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('jwt-username');
    onLogout();
  };

  return (
    <>
      <div className="header-bar">
        <div className="logo">MAKAL SEARCHING</div>
        <div style={{ color: '#a5b4fc', fontWeight: 500 }}>
          Conectado como: {username}
        </div>
      </div>

      <div className="dashboard-container">
        <div className="logout-btn-container">
          <button onClick={handleLogoutClick} className="logout-btn">
            Sair do Painel
          </button>
        </div>

        <div className="welcome-card">
          <h1>Olá, {username}! 🎓</h1>
          <p>Seu sistema de autenticação JWT está ativo e protegendo suas rotas locais.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Conteúdos Cadastrados</h3>
            <div className="value">
              {loadingConteudos ? '-' : conteudos.length}
            </div>
          </div>
          <div className="stat-card">
            <h3>Vestibulares Disponíveis</h3>
            <div className="value">
              {loadingVestibulares ? '-' : vestibulares.length}
            </div>
          </div>
        </div>

        <h2 className="section-title">Conteúdos de Estudo (Banco em Memória)</h2>
        <div className="data-list">
          {loadingConteudos ? (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Carregando conteúdos protegidos...</p>
          ) : erroConteudos ? (
            <p style={{ color: '#f43f5e', textAlign: 'center' }}>{erroConteudos}</p>
          ) : conteudos.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Nenhum conteúdo cadastrado.</p>
          ) : (
            conteudos.map((item) => (
              <div key={item.id_conteudo} className="data-item">
                <span className="data-name">{item.nome_conteudo}</span>
                <span className="data-meta">ID: {item.id_conteudo}</span>
              </div>
            ))
          )}
        </div>

        <h2 className="section-title">Vestibulares Ativos (Banco em Memória)</h2>
        <div className="data-list">
          {loadingVestibulares ? (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Carregando vestibulares protegidos...</p>
          ) : erroVestibulares ? (
            <p style={{ color: '#f43f5e', textAlign: 'center' }}>{erroVestibulares}</p>
          ) : vestibulares.length === 0 ? (
            <p style={{ color: '#64748b', textAlign: 'center' }}>Nenhum vestibular ativo.</p>
          ) : (
            vestibulares.map((item, index) => (
              <div key={item.id_vest || `${item.nome_vest}-${index}`} className="data-item">
                <span className="data-name">{item.nome_vest}</span>
                <span className="data-meta">Ano: {item.ano_prova}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <footer>
        @ desenvolvido por ANAKOSO - MAKAL Searching
      </footer>
    </>
  );
}
