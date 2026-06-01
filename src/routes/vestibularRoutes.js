// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const vestibularController = require('../controllers/vestibularControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /vestibulars - Listar todos os vestibulars
router.get('/', vestibularController.listarTodos);

// GET /vestibulars/nome/:nome_vest - Buscar por nome
router.get('/nome/:nome_vest', vestibularController.buscarPornome);

// GET /vestibulars/:id_vest - Buscar vestibular específico por ID
router.get('/:id_vest', vestibularController.buscarPorid);

// POST /vestibulars - Criar novo vestibular
router.post('/', vestibularController.criar);

// PUT /vestibulars/:id_vest - Atualizar vestibular
router.put('/:id_vest', vestibularController.atualizar);

// DELETE /vestibulars/:id_vest - Deletar vestibular
router.delete('/:id_vest', vestibularController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
