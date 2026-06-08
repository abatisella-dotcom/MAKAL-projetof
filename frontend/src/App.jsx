import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Sobre from './pages/sobre/Sobre';
import Contato from './pages/contato/Contato';
import Produtos from './pages/Produtos/Produtos';
import Equipe from './pages/Equipe/Equipe';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has a saved token
    const token = localStorage.getItem('jwt-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('jwt-username');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-shell">
      <div className="bkg">
        <header className="topbar">
          <NavLink to="/" className="brand">MAKAL</NavLink>
          <nav className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/equipe">Nossa Equipe</NavLink>
            <NavLink to="/contato">Contato</NavLink>
            <button onClick={handleLogout} className="logout-btn">Sair</button>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/equipe" element={<Equipe />} />
            {/* Wildcard fallback route to guarantee Home is displayed */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <footer className="footer">
        <p>&copy; MAKALGROUP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;