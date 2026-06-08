import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.auth) {
        localStorage.setItem('jwt-token', data.token);
        localStorage.setItem('jwt-username', data.username);
        onLoginSuccess();
      } else {
        setMessage(data.message || 'Usuário ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setMessage('Erro ao conectar ao servidor de autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <header>
        Exercício Autenticação JWT — MAKAL GROUP
      </header>
      
      <div className="app">
        <div className="container">
          <div id="login-section">
            <h1>MAKAL</h1>
            <h2 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1.5rem', marginTop: '-0.3rem' }}>
              Estude com Inteligência.
            </h2>
            
            <form id="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar na Plataforma'}
              </button>
            </form>
            
            {message && <p id="login-message">{message}</p>}
            
            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.85rem', 
              color: '#64748b',
              lineHeight: '1.5'
            }}>
              💡 <strong>Dica de Teste:</strong><br />
              username: <strong style={{ color: '#a5b4fc' }}>admin</strong> &nbsp;|&nbsp; senha: <strong style={{ color: '#a5b4fc' }}>123</strong>
            </div>
          </div>
        </div>
      </div>

      <footer>
        &copy; {new Date().getFullYear()} MAKAL GROUP. Todos os direitos reservados.
      </footer>
    </div>
  );
}
