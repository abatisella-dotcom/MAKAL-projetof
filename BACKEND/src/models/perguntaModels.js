const pool = require('../config/database');

// ======================
// CRUD
// ======================

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM pergunta ORDER BY id_pergunta'
  );
  return result.rows;
}

async function buscarPorid(id_pergunta) {
  const result = await pool.query(
    'SELECT * FROM pergunta WHERE id_pergunta = $1',
    [id_pergunta]
  );

  return result.rows[0];
}

async function criar(dados) {
  const { enunciado, dificuldade, id_conteudo, id_vest } = dados;

  const result = await pool.query(
    `INSERT INTO pergunta
    (enunciado, dificuldade, id_conteudo, id_vest)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [enunciado, dificuldade, id_conteudo, id_vest]
  );

  return result.rows[0];
}

async function atualizar(id_pergunta, dados) {
  const { enunciado, dificuldade, id_conteudo, id_vest } = dados;

  const result = await pool.query(
    `UPDATE pergunta
     SET enunciado = $1,
         dificuldade = $2,
         id_conteudo = $3,
         id_vest = $4
     WHERE id_pergunta = $5
     RETURNING *`,
    [enunciado, dificuldade, id_conteudo, id_vest, id_pergunta]
  );

  return result.rows[0] || null;
}

async function deletar(id_pergunta) {
  const result = await pool.query(
    'DELETE FROM pergunta WHERE id_pergunta = $1',
    [id_pergunta]
  );

  return result.rowCount > 0;
}

// ======================
// BUSCAS
// ======================

async function buscarPornome(nome) {
  const result = await pool.query(
    `SELECT *
     FROM pergunta
     WHERE enunciado ILIKE $1`,
    [`%${nome}%`]
  );

  return result.rows;
}

async function perguntaAnoView(ano) {
  const result = await pool.query(
    `SELECT *
     FROM perguntaanoview
     WHERE ano_prova = $1`,
    [ano]
  );

  return result.rows;
}

async function viewCompleta() {
  const result = await pool.query(
    'SELECT * FROM viewcompleta'
  );

  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorid,
  criar,
  atualizar,
  deletar,
  buscarPornome,
  perguntaAnoView,
  viewCompleta
};