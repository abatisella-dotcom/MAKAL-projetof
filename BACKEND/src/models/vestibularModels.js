const pool = require('../config/database');

// ======================
// CRUD
// ======================

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM vestibular ORDER BY id_vest'
  );

  return result.rows;
}

async function buscarPorid(id_vest) {
  const result = await pool.query(
    'SELECT * FROM vestibular WHERE id_vest = $1',
    [id_vest]
  );

  return result.rows[0];
}

async function criar(dados) {
  const { nome_vest, ano_prova } = dados;

  const result = await pool.query(
    `INSERT INTO vestibular
    (nome_vest, ano_prova)
    VALUES ($1, $2)
    RETURNING *`,
    [nome_vest, ano_prova]
  );

  return result.rows[0];
}

async function atualizar(id_vest, dados) {
  const { nome_vest, ano_prova } = dados;

  const result = await pool.query(
    `UPDATE vestibular
     SET nome_vest = $1,
         ano_prova = $2
     WHERE id_vest = $3
     RETURNING *`,
    [nome_vest, ano_prova, id_vest]
  );

  return result.rows[0] || null;
}

async function deletar(id_vest) {
  const result = await pool.query(
    'DELETE FROM vestibular WHERE id_vest = $1',
    [id_vest]
  );

  return result.rowCount > 0;
}

async function buscarPornome(nome) {
  const result = await pool.query(
    `SELECT *
     FROM vestibular
     WHERE nome_vest ILIKE $1`,
    [`%${nome}%`]
  );

  return result.rows;
}

// ======================
// VIEW buscaporvest
// ======================

async function buscaPorVest(nome) {
  const result = await pool.query(
    `SELECT *
     FROM buscaporvest
     WHERE nome_vest ILIKE $1`,
    [`%${nome}%`]
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
  buscaPorVest
};