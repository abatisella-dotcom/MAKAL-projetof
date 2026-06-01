import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Contato from './pages/contato/Contato';
import Produtos from './pages/Produtos/Produtos';
import Equipe from './pages/Equipe/Equipe';
import './app.css'

function App() {
  return (
    <div className="app-shell">
      <div className="bkg">
        <header className="topbar">
          <nav className="menu">
            <Link to="/sobre">sobre</Link>
            <Link to="/contato">contato</Link>
            <Link to="/">HOME</Link>
            <Link to="/produtos">produtos</Link>
            <Link to="/equipe">nossa equipe</Link>
          </nav>
        </header>

  <main className="content">
    <Routes>
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/equipe" element={<Equipe />} />
    </Routes>
  </main>
</div>
<footer className="footer">
  <p>&copy; MAKALGROUP . Todos os direitos reservados.</p>
</footer>
    </div>
  )
}

export default App;