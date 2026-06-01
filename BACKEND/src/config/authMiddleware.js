// src/config/auth.js
const jwt = require('jsonwebtoken');
const SEGREDO = process.env.JWT_SECRET || 'chave_secreta_para_desenvolvimento';

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, SEGREDO, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        
        req.userId = decoded.userId;
        next(); 
    });
}

module.exports = { verificarToken, SEGREDO };
