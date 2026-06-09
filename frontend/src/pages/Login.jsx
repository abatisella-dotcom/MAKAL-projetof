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
      
      <div className="app">
        <div className="container">
          <div id="login-section">
            <h1>MakalQuest</h1>
            <h2>
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
            
            
          </div>
        </div>
      </div>

      <footer>
        &copy; {new Date().getFullYear()} MAKAL GROUP. Todos os direitos reservados.
      </footer>
    </div>
  );
}
