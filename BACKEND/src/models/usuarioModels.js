const pool = require('../config/database');

async function buscarPorUsername(username) {
  const result = await pool.query(
    'SELECT * FROM usuario WHERE LOWER(username) = LOWER($1)',
    [username]
  );
  return result.rows[0];
}

module.exports = {
  buscarPorUsername
};
