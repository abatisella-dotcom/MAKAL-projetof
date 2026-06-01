// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar o Middleware de Autenticação JWT
const { verificarToken } = require('../config/auth');

// Importar as funções do Controller
const conteudoController = require('../controllers/conteudoControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /conteudos - Listar todos os conteudos (PÚBLICO)
router.get('/', conteudoController.listarTodos);

// GET /conteudos/nome/:nome - Buscar por nome (PÚBLICO)
router.get('/nome/:nome', conteudoController.buscarPornome);

// GET /conteudos/:id_conteudo - Buscar conteudo específico por ID (PÚBLICO)
router.get('/:id_conteudo', conteudoController.buscarPorid);

// POST /conteudos - Criar novo conteudo (PROTEGIDO)
router.post('/', verificarToken, conteudoController.criar);

// PUT /conteudos/:id_conteudo - Atualizar conteudo (PROTEGIDO)
router.put('/:id_conteudo', verificarToken, conteudoController.atualizar);

// DELETE /conteudos/:id_conteudo - Deletar conteudo (PROTEGIDO)
router.delete('/:id_conteudo', verificarToken, conteudoController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
