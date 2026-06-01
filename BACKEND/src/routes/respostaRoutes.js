const express = require('express');
const router = express.Router();

const respostaController = require('../controllers/respostaControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

// GET /respostas - Listar todas as respostas
router.get('/', respostaController.listarTodos);

// GET /respostas/comentario/:comentario - Buscar por comentario
router.get('/comentario/:comentario', respostaController.buscarPorComentario);

// GET /respostas/:id_resposta - Buscar resposta específica por ID
router.get('/:id_resposta', respostaController.buscarPorid);

// POST /respostas - Criar nova resposta
router.post('/', respostaController.criar);

// PUT /respostas/:id_resposta - Atualizar resposta
router.put('/:id_resposta', respostaController.atualizar);

// DELETE /respostas/:id_resposta - Deletar resposta
router.delete('/:id_resposta', respostaController.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
