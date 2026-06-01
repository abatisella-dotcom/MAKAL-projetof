// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar o Middleware de Autenticação JWT
const { verificarToken } = require('../config/auth');

// Importar as funções do Controller
const vestibularController = require('../controllers/vestibularControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /vestibulares - Listar todos os vestibulares (PÚBLICO)
router.get('/', vestibularController.listarTodos);

// GET /vestibulares/nome/:nome_vest - Buscar por nome (PÚBLICO)
router.get('/nome/:nome_vest', vestibularController.buscarPornome);

// GET /vestibulares/:id_vest - Buscar vestibular específico por ID (PÚBLICO)
router.get('/:id_vest', vestibularController.buscarPorid);

// POST /vestibulares - Criar novo vestibular (PROTEGIDO)
router.post('/', verificarToken, vestibularController.criar);

// PUT /vestibulares/:id_vest - Atualizar vestibular (PROTEGIDO)
router.put('/:id_vest', verificarToken, vestibularController.atualizar);

// DELETE /vestibulares/:id_vest - Deletar vestibular (PROTEGIDO)
router.delete('/:id_vest', verificarToken, vestibularController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
