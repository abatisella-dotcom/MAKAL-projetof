// src/config/database.js

console.log('⚡ Utilizando BANCO DE DADOS EM MEMÓRIA (Sem PostgreSQL necessário)!');

// Bancos de dados em memória de mentirinha
const dbs = {
  conteudo: [
    { id_conteudo: 1, nome_conteudo: 'Matemática Básica' },
    { id_conteudo: 2, nome_conteudo: 'Física Clássica' },
    { id_conteudo: 3, nome_conteudo: 'Química Geral' }
  ],
  vestibular: [
    { id_vest: 1, nome_vest: 'ENEM', ano_prova: 2025 },
    { id_vest: 2, nome_vest: 'FUVEST', ano_prova: 2025 },
    { id_vest: 3, nome_vest: 'UNICAMP', ano_prova: 2025 }
  ],
  infoad: [
    { id_infoad: 1, descricao: 'Informações Adicionais sobre vestibulares' }
  ],
  pergunta: [
    { id_pergunta: 1, enunciado: 'Quanto é 2 + 2?' }
  ],
  resposta: [
    { id_resposta: 1, texto: '4' }
  ]
};

// Simulador de Pool de conexões do pg
const pool = {
  connect: (callback) => {
    console.log('✅ Conectado com sucesso ao Banco de Dados em Memória de Mentirinha!');
    if (callback) {
      callback(null, {}, () => {});
    }
  },
  
  query: async (sql, params = []) => {
    const queryLower = sql.toLowerCase();
    
    // Identifica qual tabela está sendo consultada na SQL
    let tableName = 'conteudo';
    if (queryLower.includes('vestibular')) tableName = 'vestibular';
    else if (queryLower.includes('infoad')) tableName = 'infoad';
    else if (queryLower.includes('pergunta')) tableName = 'pergunta';
    else if (queryLower.includes('resposta')) tableName = 'resposta';
    
    const db = dbs[tableName];
    
    // Identifica a chave primária correta da tabela
    const idKey = tableName === 'conteudo' ? 'id_conteudo' : 
                  tableName === 'vestibular' ? 'id_vest' : 
                  tableName === 'infoad' ? 'id_infoad' : 
                  tableName === 'pergunta' ? 'id_pergunta' : 'id_resposta';

    // 1. OPERAÇÃO: INSERT (Criar)
    if (queryLower.includes('insert into')) {
      const newItem = {};
      if (tableName === 'conteudo') {
        newItem.id_conteudo = db.length > 0 ? Math.max(...db.map(x => x.id_conteudo)) + 1 : 1;
        newItem.nome_conteudo = params[0];
      } else if (tableName === 'vestibular') {
        newItem.id_vest = db.length > 0 ? Math.max(...db.map(x => x.id_vest)) + 1 : 1;
        newItem.nome_vest = params[0];
        newItem.ano_prova = params[1];
      }
      db.push(newItem);
      return { rows: [newItem], rowCount: 1 };
    }

    // 2. OPERAÇÃO: UPDATE (Atualizar)
    if (queryLower.includes('update ')) {
      const idToFind = params[params.length - 1];
      const item = db.find(x => x[idKey] === idToFind);
      if (item) {
        if (tableName === 'conteudo') {
          item.nome_conteudo = params[0];
        } else if (tableName === 'vestibular') {
          item.nome_vest = params[0];
          item.ano_prova = params[1];
        }
        return { rows: [item], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    // 3. OPERAÇÃO: DELETE (Deletar)
    if (queryLower.includes('delete from')) {
      const idToFind = params[0];
      const initialLength = db.length;
      dbs[tableName] = db.filter(x => x[idKey] !== idToFind);
      const rowCount = initialLength - dbs[tableName].length;
      return { rows: [], rowCount };
    }

    // 4. OPERAÇÃO: SELECT por ID
    if (queryLower.includes('where') && queryLower.includes(`${idKey} = $1`)) {
      const idToFind = params[0];
      const item = db.find(x => x[idKey] === idToFind);
      return { rows: item ? [item] : [], rowCount: item ? 1 : 0 };
    }

    // 5. OPERAÇÃO: SELECT com busca por texto (ILIKE)
    if (queryLower.includes('ilike')) {
      const searchTerm = params[0].replace(/%/g, '').toLowerCase();
      const filtered = db.filter(x => {
        const value = (x.nome_conteudo || x.nome_vest || '').toLowerCase();
        return value.includes(searchTerm);
      });
      return { rows: filtered, rowCount: filtered.length };
    }

    // 6. OPERAÇÃO: SELECT Geral (Listar Todos)
    return { rows: db, rowCount: db.length };
  }
};

module.exports = pool;
