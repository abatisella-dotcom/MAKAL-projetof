const express = require('express');
const router = express.Router();

const vestibularController =
require('../controllers/vestibularControllers');

// ======================
// buscas
// ======================


router.get( '/vestibular/:nome', vestibularController.buscaPorVest
);

router.get('/', vestibularController.listarTodos);

router.get( '/nome/:nome', vestibularController.buscarPornome
);

router.get( '/:id_vest', vestibularController.buscarPorid
);

router.post( '/', vestibularController.criar
);

router.put( '/:id_vest', vestibularController.atualizar
);

router.delete( '/:id_vest', vestibularController.deletar
);

module.exports = router;