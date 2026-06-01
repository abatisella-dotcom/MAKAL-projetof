const vestibularModel = require('../models/vestibularModels');

async function listarTodos(req, res) {
  try {
    const vestibulars = await vestibularModel.listarTodos();
    res.status(200).json(vestibulars);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar vestibulars', erro: erro.message });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest); 
    
    if (isNaN(id_vest)) {
      return res.status(400).json({ mensagem: 'id_vest inválido' }); 
    }
    
    const vestibular = await vestibularModel.buscarPorid(id_vest); 
    
    if (vestibular) {
      res.status(200).json(vestibular);
    } else {
      res.status(404).json({ mensagem: `vestibular com id_vest ${id_vest} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar vestibular', erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const { nome_vest, ano_prova } = req.body; 
  
    if (!nome_vest || !ano_prova) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const novovestibular = await vestibularModel.criar({ nome_vest, ano_prova }); 
    res.status(201).json(novovestibular);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao criar vestibular', erro: erro.message });
  }
}


async function atualizar(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest); 
    const { nome_vest, ano_prova } = req.body;
    
    if (isNaN(id_vest)) {
      return res.status(400).json({ mensagem: 'id_vest inválido' }); 
    }
    if (!nome_vest || !ano_prova) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const vestibularAtualizado = await vestibularModel.atualizar(id_vest, { nome_vest, ano_prova }); 
    
    if (vestibularAtualizado) {
      res.status(200).json(vestibularAtualizado);
    } else {
      res.status(404).json({ mensagem: `vestibular com id_vest ${id_vest} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar vestibular', erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const id_vest = parseInt(req.params.id_vest); 
    
    if (isNaN(id_vest)) {
      return res.status(400).json({ mensagem: 'id_vest inválido' }); 
    }
    
    const deletado = await vestibularModel.deletar(id_vest); 
    
    if (deletado) {
      res.status(200).json({ mensagem: `vestibular com id_vest ${id_vest} removido com sucesso` }); 
    } else {
      res.status(404).json({ mensagem: `vestibular com id_vest ${id_vest} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar vestibular', erro: erro.message });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;
    const vestibulars = await vestibularModel.buscarPornome(nome);
    res.status(200).json(vestibulars);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar vestibulars por nome', erro: erro.message });
  }
}

module.exports = {
  listarTodos,
  buscarPorid,
  criar,
  atualizar,
  deletar,
  buscarPornome
};
