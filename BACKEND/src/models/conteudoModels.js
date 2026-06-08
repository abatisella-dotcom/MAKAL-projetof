const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM conteudo ORDER BY id_conteudo'
  );
  return result.rows;
}

async function buscarPorid(id_conteudo) {
  const result = await pool.query(
    'SELECT * FROM conteudo WHERE id_conteudo = $1',
    [id_conteudo]
  );

  return result.rows[0];
}

// VIEW buscaporconteudo
async function buscaPorConteudo(nome) {
  const result = await pool.query(
    `SELECT *
     FROM buscaporconteudo
     WHERE nome_conteudo ILIKE $1`,
    [`%${nome}%`]
  );

  return result.rows;
}

async function criar(dados) {
  const { nome_conteudo } = dados;

  const result = await pool.query(
    `INSERT INTO conteudo (nome_conteudo)
     VALUES ($1)
     RETURNING *`,
    [nome_conteudo]
  );

  return result.rows[0];
}

async function atualizar(id_conteudo, dados) {
  const { nome_conteudo } = dados;

  const result = await pool.query(
    `UPDATE conteudo
     SET nome_conteudo = $1
     WHERE id_conteudo = $2
     RETURNING *`,
    [nome_conteudo, id_conteudo]
  );

  return result.rows[0] || null;
}

async function deletar(id_conteudo) {
  const result = await pool.query(
    'DELETE FROM conteudo WHERE id_conteudo = $1',
    [id_conteudo]
  );

  return result.rowCount > 0;
}

async function buscarPornome(nome) {
  const result = await pool.query(
    'SELECT * FROM conteudo WHERE nome_conteudo ILIKE $1',
    [`%${nome}%`]
  );

  return result.rows;
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