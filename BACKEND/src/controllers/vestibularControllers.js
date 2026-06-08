const vestibularModel = require('../models/vestibularModels');

async function listarTodos(req, res) {
  try {
    const vestibulares = await vestibularModel.listarTodos();

    res.status(200).json(vestibulares);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar vestibulares',
      erro: erro.message
    });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest);

    if (isNaN(id_vest)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const vestibular = await vestibularModel.buscarPorid(id_vest);

    if (!vestibular) {
      return res.status(404).json({
        mensagem: 'Vestibular não encontrado'
      });
    }

    res.status(200).json(vestibular);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const { nome_vest, ano_prova } = req.body;

    if (!nome_vest || !ano_prova) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const vestibular = await vestibularModel.criar({
      nome_vest,
      ano_prova
    });

    res.status(201).json(vestibular);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar vestibular',
      erro: erro.message
    });
  }
}

async function atualizar(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest);

    if (isNaN(id_vest)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const { nome_vest, ano_prova } = req.body;

    const vestibular = await vestibularModel.atualizar(
      id_vest,
      {
        nome_vest,
        ano_prova
      }
    );

    if (!vestibular) {
      return res.status(404).json({
        mensagem: 'Vestibular não encontrado'
      });
    }

    res.status(200).json(vestibular);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar vestibular',
      erro: erro.message
    });
  }
}

async function deletar(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest);

    if (isNaN(id_vest)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    const deletado = await vestibularModel.deletar(id_vest);

    if (!deletado) {
      return res.status(404).json({
        mensagem: 'Vestibular não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Vestibular removido com sucesso'
    });

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar vestibular',
      erro: erro.message
    });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;

    const vestibulares =
      await vestibularModel.buscarPornome(nome);

    res.status(200).json(vestibulares);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar vestibular',
      erro: erro.message
    });
  }
}

// VIEW buscaporvest
async function buscaPorVest(req, res) {
  try {
    const { nome } = req.params;

    const dados =
      await vestibularModel.buscaPorVest(nome);

    res.status(200).json(dados);

  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar por vestibular',
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
  buscarPornome,
  buscaPorVest
};