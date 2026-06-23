const { Pool } = require('pg');

const passwords = ['postgres', 'admin', 'root', '123', '123456', 'senha', 'makal', ''];

async function testPasswords() {
  for (const pwd of passwords) {
    console.log(`Testing password: "${pwd}"`);
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'MAKAL-projetof',
      password: pwd,
      port: 5432,
      connectionTimeoutMillis: 2000
    });
    try {
      const client = await pool.connect();
      console.log(`🎉 SUCCESS! Password is: "${pwd}"`);
      client.release();
      await pool.end();
      return pwd;
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
      await pool.end();
    }
  }
  
  // Also try database name postgres
  console.log(`Testing database "postgres"`);
  for (const pwd of passwords) {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: pwd,
      port: 5432,
      connectionTimeoutMillis: 2000
    });
    try {
      const client = await pool.connect();
      console.log(`🎉 SUCCESS (db: postgres)! Password is: "${pwd}"`);
      client.release();
      await pool.end();
      return pwd;
    } catch (err) {
      console.log(`❌ Failed (db: postgres): ${err.message}`);
      await pool.end();
    }
  }
  
  console.log('Could not connect with any common passwords.');
  return null;
}

testPasswords();
