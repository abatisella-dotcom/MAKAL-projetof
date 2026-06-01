const conteudoModel = require('../models/conteudoModels');

async function listarTodos(req, res) {
  try {
    const conteudos = await conteudoModel.listarTodos();
    res.status(200).json(conteudos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar conteudos', erro: erro.message });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo); 
    
    if (isNaN(id_conteudo)) {
      return res.status(400).json({ mensagem: 'id_conteudo inválido' }); 
    }
    
    const conteudo = await conteudoModel.buscarPorid(id_conteudo); 
    
    if (conteudo) {
      res.status(200).json(conteudo);
    } else {
      res.status(404).json({ mensagem: `conteudo com id_conteudo ${id_conteudo} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar conteudo', erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const { id_conteudo, nome_conteudo } = req.body; 
  
    if (!nome_conteudo) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const novoconteudo = await conteudoModel.criar({ id_conteudo, nome_conteudo }); 
    res.status(201).json(novoconteudo);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao criar conteudo', erro: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo); 
    const { nome_conteudo } = req.body;
    
    if (isNaN(id_conteudo)) { 
      return res.status(400).json({ mensagem: 'id_conteudo inválido' }); 
    }
    if (!nome_conteudo) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const conteudoAtualizado = await conteudoModel.atualizar(id_conteudo, { nome_conteudo }); 
    
    if (conteudoAtualizado) {
      res.status(200).json(conteudoAtualizado);
    } else {
      res.status(404).json({ mensagem: `conteudo com id_conteudo ${id_conteudo} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar conteudo', erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const id_conteudo = parseInt(req.params.id_conteudo); 
    
    if (isNaN(id_conteudo)) { 
      return res.status(400).json({ mensagem: 'id_conteudo inválido' }); 
    }
    
    const deletado = await conteudoModel.deletar(id_conteudo); 
    
    if (deletado) {
      res.status(200).json({ mensagem: `conteudo com id_conteudo ${id_conteudo} removido com sucesso` }); 
    } else {
      res.status(404).json({ mensagem: `conteudo com id_conteudo ${id_conteudo} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar conteudo', erro: erro.message });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;
    const conteudos = await conteudoModel.buscarPornome(nome);
    res.status(200).json(conteudos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar conteudos por nome', erro: erro.message });
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
