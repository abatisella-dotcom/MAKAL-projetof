const perguntaModel = require('../models/perguntaModels');

async function listarTodos(req, res) {
  try {
    const perguntas = await perguntaModel.listarTodos();
    res.status(200).json(perguntas);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar perguntas', erro: erro.message });
  }
}

async function buscarPorid(req, res) {
  try {
    const id_pergunta = parseInt(req.params.id_pergunta); 
    
    if (isNaN(id_pergunta)) {
      return res.status(400).json({ mensagem: 'id_pergunta inválido' }); 
    }
    
    const pergunta = await perguntaModel.buscarPorid(id_pergunta); 
    
    if (pergunta) {
      res.status(200).json(pergunta);
    } else {
      res.status(404).json({ mensagem: `pergunta com id_pergunta ${id_pergunta} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar pergunta', erro: erro.message });
  }
}

async function criar(req, res) {
  try {
    const { enunciado, dificuldade, id_conteudo, id_vest } = req.body;

    if (!enunciado || !dificuldade || !id_conteudo || !id_vest) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const novopergunta = await perguntaModel.criar({ enunciado, dificuldade, id_conteudo, id_vest });
    res.status(201).json(novopergunta);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao criar pergunta', erro: erro.message });
  }
}


async function atualizar(req, res) {
  try {
    const id_pergunta = parseInt(req.params.id_pergunta); 
    const { enunciado, dificuldade, id_conteudo, id_vest } = req.body;
    
    if (isNaN(id_pergunta)) {
      return res.status(400).json({ mensagem: 'id_pergunta inválido' }); 
    }
    if (!enunciado || !dificuldade || !id_conteudo || !id_vest) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    
    const perguntaAtualizado = await perguntaModel.atualizar(id_pergunta, { enunciado, dificuldade, id_conteudo, id_vest }); 
    
    if (perguntaAtualizado) {
      res.status(200).json(perguntaAtualizado);
    } else {
      res.status(404).json({ mensagem: `pergunta com id_pergunta ${id_pergunta} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar pergunta', erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const id_pergunta = parseInt(req.params.id_pergunta); 
    
    if (isNaN(id_pergunta)) {
      return res.status(400).json({ mensagem: 'id_pergunta inválido' }); 
    }
    
    const deletado = await perguntaModel.deletar(id_pergunta); 
    
    if (deletado) {
      res.status(200).json({ mensagem: `pergunta com id_pergunta ${id_pergunta} removido com sucesso` }); 
    } else {
      res.status(404).json({ mensagem: `pergunta com id_pergunta ${id_pergunta} não encontrado` }); 
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar pergunta', erro: erro.message });
  }
}

async function buscarPornome(req, res) {
  try {
    const { nome } = req.params;
    const perguntas = await perguntaModel.buscarPornome(nome);
    res.status(200).json(perguntas);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar perguntas por nome', erro: erro.message });
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
