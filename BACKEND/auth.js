const jwt = require('jsonwebtoken');

const SEGREDO = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'Token não informado'
        });
    }

    jwt.verify(token, SEGREDO, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                auth: false,
                message: 'Token inválido'
            });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = {
    SEGREDO,
    verificarToken
};