const express = require('express');
const router = express.Router();

const perguntaController =
require('../controllers/perguntaControllers');

// ======================
// VIEWS
// ======================

router.get( '/ano/:ano', perguntaController.perguntaAnoView
);

router.get( '/completa', perguntaController.viewCompleta
);

// ======================
// BUSCAS
// ======================

router.get( '/nome/:nome', perguntaController.buscarPornome
);



router.get( '/', perguntaController.listarTodos
);

router.get( '/:id_pergunta', perguntaController.buscarPorid
);

router.post( '/', perguntaController.criar
);

router.put( '/:id_pergunta', perguntaController.atualizar
);

router.delete( '/:id_pergunta', perguntaController.deletar
);

module.exports = router;