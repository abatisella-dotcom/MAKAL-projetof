import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Sobre from './pages/sobre/Sobre';
import Produtos from './pages/Produtos/Produtos';
import Questao from './pages/Produtos/Questao';
import Equipe from './pages/Equipe/Equipe';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // chek se o usuario tem o token salvo
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
          <NavLink to="/" className="brand">MAKAL QUEST</NavLink>
          <nav className="menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/produtos">Questões</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            <NavLink to="/equipe">Nossa Equipe</NavLink>
            <button onClick={handleLogout} className="logout-btn">Sair</button>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/:id" element={<Questao />} />
            <Route path="/equipe" element={<Equipe />} />
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