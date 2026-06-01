// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const infoadController = require('../controllers/infoadControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /infoads - Listar todos os infoads
router.get('/', infoadController.listarTodos);

// GET /infoads/nome/:nome - Buscar por nome
router.get('/nome/:nome', infoadController.buscarPornome);

// GET /infoads/:id_infoad - Buscar infoad específico por ID
router.get('/:id_infoad', infoadController.buscarPorid);

// POST /infoads - Criar novo infoad
router.post('/', infoadController.criar);

// PUT /infoads/:id_infoad - Atualizar infoad
router.put('/:id_infoad', infoadController.atualizar);

// DELETE /infoads/:id_infoad - Deletar infoad
router.delete('/:id_infoad', infoadController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
