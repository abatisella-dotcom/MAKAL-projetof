const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query('SELECT * FROM infoad ORDER BY id_infoad');
  return result.rows;
}

async function buscarPorid(id_infoad) {
  const result = await pool.query('SELECT * FROM infoad WHERE id_infoad = $1', [id_infoad]);
  return result.rows[0];
}

async function criar(dados) {
  const { bncc, rel_enem, id_pergunta } = dados;
  
  const sql = `
    INSERT INTO infoad (bncc, rel_enem, id_pergunta)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [bncc, rel_enem, id_pergunta]);
  return result.rows[0];
}

async function atualizar(id_infoad, dados) {
  const { bncc, rel_enem, id_pergunta } = dados;
  
  const sql = `
    UPDATE infoad
    SET bncc = $1, rel_enem = $2, id_pergunta = $3
    WHERE id_infoad = $4
    RETURNING *
  `;
  
  const result = await pool.query(sql, [bncc, rel_enem, id_pergunta, id_infoad]);
  return result.rows[0] || null;
}

async function deletar(id_infoad) {
  const result = await pool.query('DELETE FROM infoad WHERE id_infoad = $1', [id_infoad]);
  return result.rowCount > 0;
}

async function buscarPornome(nome) { 
  const sql = 'SELECT * FROM infoad WHERE bncc ILIKE $1';
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
