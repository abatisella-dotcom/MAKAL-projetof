const express = require('express');
const router = express.Router();

const respostaController =
require('../controllers/respostaControllers');

// ======================
// BUSCAS
// ======================

router.get( '/comentario/:comentario', respostaController.buscarPorComentario
);

router.get( '/', respostaController.listarTodos
);

router.get( '/:id_resposta', respostaController.buscarPorid
);

router.post( '/', respostaController.criar
);

router.put( '/:id_resposta', respostaController.atualizar
);

router.delete( '/:id_resposta', respostaController.deletar
);

module.exports = router;