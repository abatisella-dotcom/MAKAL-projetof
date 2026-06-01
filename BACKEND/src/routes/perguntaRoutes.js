// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const perguntaController = require('../controllers/perguntaControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /perguntas - Listar todos os perguntas
router.get('/', perguntaController.listarTodos);

// GET /perguntas/nome/:nome - Buscar por nome
router.get('/nome/:nome', perguntaController.buscarPornome);

// GET /perguntas/:id_pergunta - Buscar pergunta específico por ID
router.get('/:id_pergunta', perguntaController.buscarPorid);

// POST /perguntas - Criar novo pergunta
router.post('/', perguntaController.criar);

// PUT /perguntas/:id_pergunta - Atualizar pergunta
router.put('/:id_pergunta', perguntaController.atualizar);

// DELETE /perguntas/:id_pergunta - Deletar pergunta
router.delete('/:id_pergunta', perguntaController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
