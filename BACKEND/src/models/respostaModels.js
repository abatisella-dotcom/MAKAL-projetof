const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query('SELECT * FROM resposta ORDER BY id_resposta');
  return result.rows;
}

async function buscarPorid(id_resposta) {
  const result = await pool.query('SELECT * FROM resposta WHERE id_resposta = $1', [id_resposta]);
  return result.rows[0];
}

async function criar(dados) {
  const { comentario, material_apoio, id_pergunta } = dados;
  
  const sql = `
    INSERT INTO resposta (comentario, material_apoio, id_pergunta)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [comentario, material_apoio, id_pergunta]);
  return result.rows[0];
}

async function atualizar(id_resposta, dados) {
  const { comentario, material_apoio, id_pergunta } = dados;
  
  const sql = `
    UPDATE resposta
    SET comentario = $1, material_apoio = $2, id_pergunta = $3
    WHERE id_resposta = $4
    RETURNING *
  `;
  
  const result = await pool.query(sql, [comentario, material_apoio, id_pergunta, id_resposta]); 
  return result.rows[0] || null;
}

async function deletar(id_resposta) {
  const result = await pool.query('DELETE FROM resposta WHERE id_resposta = $1', [id_resposta]); 
  return result.rowCount > 0;
}

async function buscarPorComentario(comentario) {
  const sql = 'SELECT * FROM resposta WHERE comentario ILIKE $1';
  const result = await pool.query(sql, [`%${comentario}%`]);
  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorid,
  criar,
  atualizar,
  deletar,
  buscarPorComentario
};
