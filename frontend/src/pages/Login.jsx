import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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
        setMessage(data.message || 'Login falhou!');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
      <header>
        Exercício Autenticação JWT
      </header>
      <div className="app">
        <div className="container">
          <div id="login-section">
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Entrar</button>
            </form>
            {message && <p id="login-message">{message}</p>}
          </div>
        </div>
      </div>
      <footer>
        @ desenvolvido por MAKAL
      </footer>
    </>
  );
}
