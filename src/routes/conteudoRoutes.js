// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const conteudoController = require('../controllers/conteudoControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /conteudos - Listar todos os conteudos
router.get('/', conteudoController.listarTodos);

// GET /conteudos/nome/:nome - Buscar por nome
router.get('/nome/:nome', conteudoController.buscarPornome);

// GET /conteudos/:id_conteudo - Buscar conteudo específico por ID
router.get('/:id_conteudo', conteudoController.buscarPorid);

// POST /conteudos - Criar novo conteudo
router.post('/', conteudoController.criar);

// PUT /conteudos/:id_conteudo - Atualizar conteudo
router.put('/:id_conteudo', conteudoController.atualizar);

// DELETE /conteudos/:id_conteudo - Deletar conteudo
router.delete('/:id_conteudo', conteudoController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
