const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query('SELECT * FROM conteudo ORDER BY id_conteudo');
  return result.rows;
}

async function buscarPorid(id_conteudo) {
  const result = await pool.query('SELECT * FROM conteudo WHERE id_conteudo = $1', [id_conteudo]);
  return result.rows[0];
}

async function criar(dados) {
  const { nome_conteudo } = dados;
  
  const sql = `
    INSERT INTO conteudo (nome_conteudo)
    VALUES ($1)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [nome_conteudo]);
  return result.rows[0];
}

async function atualizar(id_conteudo, dados) {
  const { nome_conteudo } = dados;
  
  const sql = `
    UPDATE conteudo
    SET nome_conteudo = $1
    WHERE id_conteudo = $2
    RETURNING *
  `;
  
  const result = await pool.query(sql, [nome_conteudo, id_conteudo]);
  return result.rows[0] || null;
}

async function deletar(id_conteudo) {
  const result = await pool.query('DELETE FROM conteudo WHERE id_conteudo = $1', [id_conteudo]);
  return result.rowCount > 0;
}

async function buscarPornome(nome) {
  const sql = 'SELECT * FROM conteudo WHERE nome_conteudo ILIKE $1';
  const result = await pool.query(sql, [`%${nome}%`]);
  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorid,
  criar,
  atualizar,
  deletar,
  buscarPornome
};
