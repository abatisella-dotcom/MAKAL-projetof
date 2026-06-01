const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query('SELECT * FROM pergunta ORDER BY id_pergunta');
  return result.rows;
}

async function buscarPorid(id_pergunta) {
  const result = await pool.query('SELECT * FROM pergunta WHERE id_pergunta = $1', [id_pergunta]);
  return result.rows[0];
}

async function criar(dados) {
  const { enunciado, dificuldade, id_conteudo, id_vest } = dados;
  
  const sql = `
    INSERT INTO pergunta (enunciado, dificuldade, id_conteudo, id_vest)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [enunciado, dificuldade, id_conteudo, id_vest]);
  return result.rows[0];
}

async function atualizar(id_pergunta, dados) {
  const { enunciado, dificuldade, id_conteudo, id_vest } = dados;
  
  const sql = `
    UPDATE pergunta
    SET enunciado = $1, dificuldade = $2, id_conteudo = $3, id_vest = $4
    WHERE id_pergunta = $5
    RETURNING *
  `;
  
  const result = await pool.query(sql, [enunciado, dificuldade, id_conteudo, id_vest, id_pergunta]); 
  return result.rows[0] || null;
}

async function deletar(id_pergunta) {
  const result = await pool.query('DELETE FROM pergunta WHERE id_pergunta = $1', [id_pergunta]); 
  return result.rowCount > 0;
}

async function buscarPornome(enunciado) {
  const sql = 'SELECT * FROM pergunta WHERE enunciado ILIKE $1'; 
  const result = await pool.query(sql, [`%${enunciado}%`]);
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
