// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const infoadController = require('../controllers/infoadControllers');

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================

router.get( '/bncc/:bncc', infoadController.infoAdView
);

router.get('/', infoadController.listarTodos);

router.get( '/nome/:nome', infoadController.buscarPornome
);

router.get( '/:id_infoad', infoadController.buscarPorid
);

router.post('/', infoadController.criar);

router.put( '/:id_infoad', infoadController.atualizar
);

router.delete( '/:id_infoad',
  infoadController.deletar
);

module.exports = router;