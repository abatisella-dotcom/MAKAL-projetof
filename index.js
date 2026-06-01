require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { SEGREDO, verificarToken } = require('./src/config/auth');

const app = express();
const PORT = process.env.PORT || 3050;

// Configurações Globais
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend (IniciandoJWT)
app.use(express.static(path.join(__dirname, 'learning/iniciandoJTW-main/FRONTEND')));

// ============================================================
// USUÁRIO DE MENTIRINHA FIXO (MOCK USER)
// ============================================================
const USUARIO_DE_MENTIRINHA = {
    username: 'admin',
    password: '123'
};

// ============================================================
// ROTA DE LOGIN
// ============================================================
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Compara o que foi digitado com o usuário de mentirinha
    if (username === USUARIO_DE_MENTIRINHA.username && password === USUARIO_DE_MENTIRINHA.password) {
        const jwt = require('jsonwebtoken');
        // Gera o token com o ID 1 e tempo de expiração de 1 hora
        const token = jwt.sign({ userId: 1 }, SEGREDO, { expiresIn: '1h' });
        return res.json({ auth: true, token: token });
    }

    // Se errar as credenciais
    return res.status(401).json({ auth: false, message: 'Usuário ou senha incorretos!' });
});

// ============================================================
// ROTA DO PAINEL SECRETO (EXERCÍCIO JWT)
// ============================================================
app.get('/painel-secreto', verificarToken, (req, res) => {
    res.json({ 
        message: 'Parabéns, você acessou o painel secreto!', 
        seuId: req.userId 
    });
});

// ============================================================
// IMPORTAÇÃO DAS ROTAS EXISTENTES
// ============================================================
const conteudoRoutes = require('./src/routes/conteudoRoutes');
const infoadRoutes = require('./src/routes/infoadRoutes');
const perguntaRoutes = require('./src/routes/perguntaRoutes');
const respostaRoutes = require('./src/routes/respostaRoutes');
const vestibularRoutes = require('./src/routes/vestibularRoutes');

// ============================================================
// REGISTRO DAS ROTAS
// ============================================================
app.use('/conteudos', conteudoRoutes);
app.use('/infoads', infoadRoutes);
app.use('/perguntas', perguntaRoutes);
app.use('/respostas', respostaRoutes);
app.use('/vestibulares', vestibularRoutes);

// Rota de status da API (movida para /api-status para não bloquear o index.html)
app.get('/api-status', (req, res) => {
    res.json({ message: 'API MAKAL Searching online e protegida! 🚀' });
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
});
