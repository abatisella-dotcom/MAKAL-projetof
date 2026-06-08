const express = require('express');
const router = express.Router();

const conteudoController =
  require('../controllers/conteudoControllers');

// buca por conteudo
router.get( '/conteudo/:nome', conteudoController.buscaPorConteudo
);


router.get('/', conteudoController.listarTodos);

router.get( '/nome/:nome', conteudoController.buscarPornome
);

router.get( '/:id_conteudo', conteudoController.buscarPorid
);

router.post('/', conteudoController.criar);

router.put( '/:id_conteudo', conteudoController.atualizar
);

router.delete( '/:id_conteudo', conteudoController.deletar
);

module.exports = router;