const conteudoModel = require('../models/conteudoModels');

async function listarTodos(req, res) {
  try {
    const conteudos = await conteudoModel.listarTodos();
    res.status(200).json(conteudos);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar conteúdos',
      erro: erro.message
    });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo);

    if (isNaN(id_conteudo)) {
      return res.status(400).json({
        mensagem: 'id_conteudo inválido'
      });
    }

    const conteudo = await conteudoModel.buscarPorid(id_conteudo);

    if (!conteudo) {
      return res.status(404).json({
        mensagem: 'Conteúdo não encontrado'
      });
    }

    res.status(200).json(conteudo);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar conteúdo',
      erro: erro.message
    });
  }
}

// VIEW buscaporconteudo
async function buscaPorConteudo(req, res) {
  try {
    const { nome } = req.params;

    const dados = await conteudoModel.buscaPorConteudo(nome);

    res.status(200).json(dados);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar conteúdo',
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const { nome_conteudo } = req.body;

    if (!nome_conteudo) {
      return res.status(400).json({
        mensagem: 'nome_conteudo é obrigatório'
      });
    }

    const novoConteudo =
      await conteudoModel.criar({ nome_conteudo });

    res.status(201).json(novoConteudo);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar conteúdo',
      erro: erro.message
    });
  }
}

async function atualizar(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo);
    const { nome_conteudo } = req.body;

    if (isNaN(id_conteudo)) {
      return res.status(400).json({
        mensagem: 'id_conteudo inválido'
      });
    }

    const conteudo =
      await conteudoModel.atualizar(
        id_conteudo,
        { nome_conteudo }
      );

    if (!conteudo) {
      return res.status(404).json({
        mensagem: 'Conteúdo não encontrado'
      });
    }

    res.status(200).json(conteudo);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar conteúdo',
      erro: erro.message
    });
  }
}

async function deletar(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo);

    if (isNaN(id_conteudo)) {
      return res.status(400).json({
        mensagem: 'id_conteudo inválido'
      });
    }

    const deletado =
      await conteudoModel.deletar(id_conteudo);

    if (!deletado) {
      return res.status(404).json({
        mensagem: 'Conteúdo não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Conteúdo removido com sucesso'
    });

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar conteúdo',
      erro: erro.message
    });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;

    const conteudos =
      await conteudoModel.buscarPornome(nome);

    res.status(200).json(conteudos);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar conteúdo',
      erro: erro.message
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorid,
  buscaPorConteudo,
  criar,
  atualizar,
  deletar,
  buscarPornome
};