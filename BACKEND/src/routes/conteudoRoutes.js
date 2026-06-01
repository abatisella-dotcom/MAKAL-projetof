const express = require('express');
const router = express.Router();
const conteudoController = require('../controllers/conteudoControllers');
const { verificarToken } = require('../config/auth'); // Importa o middleware

// GET /conteudos - Listar todos os conteudos (público)
router.get('/', conteudoController.listarTodos);

// POST /conteudos - Criar novo conteudo (protegido por JWT)
router.post('/', verificarToken, conteudoController.criar);

// PUT /conteudos/:id_conteudo - Atualizar (protegido por JWT)
router.put('/:id_conteudo', verificarToken, conteudoController.atualizar);

// DELETE /conteudos/:id_conteudo - Deletar (protegido por JWT)
router.delete('/:id_conteudo', verificarToken, conteudoController.deletar);

module.exports = router;
