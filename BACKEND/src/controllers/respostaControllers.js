const respostaModel = require('../models/respostaModels');

async function listarTodos(req, res) {
  try {

    const respostas =
      await respostaModel.listarTodos();

    res.status(200).json(respostas);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao listar respostas',
      erro: erro.message
    });

  }
}

async function buscarPorid(req, res) {
  try {

    const id_resposta =
      parseInt(req.params.id_resposta);

    if (isNaN(id_resposta)) {
      return res.status(400).json({
        mensagem: 'id_resposta inválido'
      });
    }

    const resposta =
      await respostaModel.buscarPorid(id_resposta);

    if (!resposta) {
      return res.status(404).json({
        mensagem: 'Resposta não encontrada'
      });
    }

    res.status(200).json(resposta);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar resposta',
      erro: erro.message
    });

  }
}

async function criar(req, res) {
  try {

    const {
      comentario,
      material_apoio,
      id_pergunta
    } = req.body;

    if (
      !comentario ||
      !material_apoio ||
      !id_pergunta
    ) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const resposta =
      await respostaModel.criar({
        comentario,
        material_apoio,
        id_pergunta
      });

    res.status(201).json(resposta);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao criar resposta',
      erro: erro.message
    });

  }
}

async function atualizar(req, res) {
  try {

    const id_resposta =
      parseInt(req.params.id_resposta);

    const {
      comentario,
      material_apoio,
      id_pergunta
    } = req.body;

    if (isNaN(id_resposta)) {
      return res.status(400).json({
        mensagem: 'id_resposta inválido'
      });
    }

    const resposta =
      await respostaModel.atualizar(
        id_resposta,
        {
          comentario,
          material_apoio,
          id_pergunta
        }
      );

    if (!resposta) {
      return res.status(404).json({
        mensagem: 'Resposta não encontrada'
      });
    }

    res.status(200).json(resposta);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao atualizar resposta',
      erro: erro.message
    });

  }
}

async function deletar(req, res) {
  try {

    const id_resposta =
      parseInt(req.params.id_resposta);

    if (isNaN(id_resposta)) {
      return res.status(400).json({
        mensagem: 'id_resposta inválido'
      });
    }

    const deletado =
      await respostaModel.deletar(id_resposta);

    if (!deletado) {
      return res.status(404).json({
        mensagem: 'Resposta não encontrada'
      });
    }

    res.status(200).json({
      mensagem: 'Resposta removida com sucesso'
    });

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao deletar resposta',
      erro: erro.message
    });

  }
}

async function buscarPorComentario(req, res) {
  try {

    const { comentario } = req.params;

    const respostas =
      await respostaModel.buscarPorComentario(
        comentario
      );

    res.status(200).json(respostas);

  } catch (erro) {

    res.status(500).json({
      mensagem: 'Erro ao buscar comentário',
      erro: erro.message
    });

  }
}

module.exports = {
  listarTodos,
  buscarPorid,
  criar,
  atualizar,
  deletar,
  buscarPorComentario
};