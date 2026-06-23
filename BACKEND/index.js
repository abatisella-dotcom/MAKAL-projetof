

const fs = require('fs');
const pathModule = require('path');

// Auto-setup: cria o .env a partir do .env.example se não existir
const envPath = pathModule.join(__dirname, '.env');
const envExamplePath = pathModule.join(__dirname, '.env.example');
if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('📋 Arquivo .env criado automaticamente a partir do .env.example');
}

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
app.use(express.static(path.join(__dirname, 'public')));


// ============================================================
// ROTA DE LOGIN
// ============================================================
app.post('/login', (req, res) => {
    const { username: rawUsername, password: rawPassword } = req.body;

    const username = rawUsername ? String(rawUsername).trim() : '';
    const password = rawPassword ? String(rawPassword).trim() : '';

    if (!username || !password) {
        return res.status(400).json({ auth: false, message: 'Usuário e senha são obrigatórios!' });
    }

<<<<<<< HEAD
    // Pega as credenciais corretas do arquivo .env e aplica trim
    const usuarioCorreto = (process.env.AUTH_USER || 'admin').trim();
    const senhaCorreta = (process.env.AUTH_PASSWORD || '123').trim();
=======
    // Pega as credenciais corretas do arquivo .env
    const usuarioCorreto = process.env.AUTH_USER;
    const senhaCorreta = process.env.AUTH_PASSWORD;
>>>>>>> 6cb408e0686b1e0e003fec0a6b95272aa298add5

    // Compara valores normalizados
    if (username.toLowerCase() === usuarioCorreto.toLowerCase() && password === senhaCorreta) {
        const jwt = require('jsonwebtoken');
        // Gera o token com o nome do usuário e tempo de expiração de 1 hora
        const token = jwt.sign({ username: username }, SEGREDO, { expiresIn: '1h' });
        return res.json({ auth: true, token: token, username: username });
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
