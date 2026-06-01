// src/config/auth.js
const jwt = require('jsonwebtoken');

// Pega a chave do arquivo .env ou usa uma padrão
const SEGREDO = process.env.JWT_SECRET || 'minha_chave_super_secreta_123'; 

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega o token após a palavra 'Bearer'

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Faça login primeiro!' });
    }

    jwt.verify(token, SEGREDO, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Sua sessão expirou ou o token é inválido.' });
        }
        
        req.userId = decoded.userId; // Salva o ID que estava dentro do token
        next(); // Permite o acesso à rota
    });
}

module.exports = { verificarToken, SEGREDO };
