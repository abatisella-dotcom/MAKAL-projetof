const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM infoad ORDER BY id_infoad'
  );

  return result.rows;
}

async function buscarPorid(id_infoad) {
  const result = await pool.query(
    'SELECT * FROM infoad WHERE id_infoad = $1',
    [id_infoad]
  );

  return result.rows[0];
}

// VIEW infoadview
async function infoAdView(bncc) {
  const result = await pool.query(
    `SELECT *
     FROM infoadview
     WHERE bncc ILIKE $1`,
    [`%${bncc}%`]
  );

  return result.rows;
}

async function criar(dados) {
  const { bncc, rel_enem, id_pergunta } = dados;

  const result = await pool.query(
    `INSERT INTO infoad
    (bncc, rel_enem, id_pergunta)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [bncc, rel_enem, id_pergunta]
  );

  return result.rows[0];
}

async function atualizar(id_infoad, dados) {
  const { bncc, rel_enem, id_pergunta } = dados;

  const result = await pool.query(
    `UPDATE infoad
     SET bncc = $1,
         rel_enem = $2,
         id_pergunta = $3
     WHERE id_infoad = $4
     RETURNING *`,
    [bncc, rel_enem, id_pergunta, id_infoad]
  );

  return result.rows[0] || null;
}

async function deletar(id_infoad) {
  const result = await pool.query(
    'DELETE FROM infoad WHERE id_infoad = $1',
    [id_infoad]
  );

  return result.rowCount > 0;
}

async function buscarPornome(nome) {
  const result = await pool.query(
    'SELECT * FROM infoad WHERE bncc ILIKE $1',
    [`%${nome}%`]
  );

  return result.rows;
}

module.exports = {
  listarTodos,
  buscarPorid,
  infoAdView,
  criar,
  atualizar,
  deletar,
  buscarPornome
};