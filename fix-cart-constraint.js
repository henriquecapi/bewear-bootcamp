const { Client } = require('pg');
require('dotenv').config();

async function fixCartConstraint() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados');
    
    const result = await client.query('ALTER TABLE "cart" ALTER COLUMN "shipping_address_id" DROP NOT NULL;');
    console.log('✅ Constraint removido com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao executar a query:', error.message);
  } finally {
    await client.end();
    console.log('Conexão fechada');
  }
}

fixCartConstraint();