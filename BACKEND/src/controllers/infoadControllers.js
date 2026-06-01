const infoadModel = require('../models/infoadModels');

async function listarTodos(req, res) {
  try {
    const infoads = await infoadModel.listarTodos();
    res.status(200).json(infoads);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar infoads', erro: erro.message });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_infoad = parseInt(req.params.id_infoad); 
    
    if (isNaN(id_infoad)) {
      return res.status(400).json({ mensagem: 'id_infoad inválido' }); 
    }
    
    const infoad = await infoadModel.buscarPorid(id_infoad); 
    
    if (infoad) {
      res.status(200).json(infoad);
    } else {
      res.status(404).json({ mensagem: `infoad com id_infoad ${id_infoad} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar infoad', erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const { id_infoad, bncc, rel_enem, id_pergunta } = req.body; 
  
    if (!bncc || !rel_enem || !id_pergunta ) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const novoinfoad = await infoadModel.criar({ id_infoad, bncc, rel_enem, id_pergunta }); 
    res.status(201).json(novoinfoad);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao criar infoad', erro: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const id_infoad = parseInt(req.params.id_infoad); 
    const { bncc, rel_enem, id_pergunta } = req.body;
    
    if (isNaN(id_infoad)) {
      return res.status(400).json({ mensagem: 'id_infoad inválido' }); 
    }
    if (!bncc || !rel_enem || !id_pergunta) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const infoadAtualizado = await infoadModel.atualizar(id_infoad, { bncc, rel_enem, id_pergunta }); 
    
    if (infoadAtualizado) {
      res.status(200).json(infoadAtualizado);
    } else {
      res.status(404).json({ mensagem: `infoad com id_infoad ${id_infoad} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar infoad', erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const id_infoad = parseInt(req.params.id_infoad); 
    
    if (isNaN(id_infoad)) {
      return res.status(400).json({ mensagem: 'id_infoad inválido' }); 
    }
    
    const deletado = await infoadModel.deletar(id_infoad); 
    
    if (deletado) {
      res.status(200).json({ mensagem: `infoad com id_infoad ${id_infoad} removido com sucesso` }); 
    } else {
      res.status(404).json({ mensagem: `infoad com id_infoad ${id_infoad} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar infoad', erro: erro.message });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;
    const infoads = await infoadModel.buscarPornome(nome);
    res.status(200).json(infoads);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar infoads por nome', erro: erro.message });
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
