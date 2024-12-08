require('dotenv').config();
const { processMessages } = require('./tasks/producer');
const cron = require('node-cron');

// Log worker initialization
console.log('Worker Service com SQS está iniciando...');

// Agendar o consumo de mensagens a cada minuto
cron.schedule('* * * * *', async () => {
  console.log('Produzindo mensagens da fila SQS...');
  await processMessages();
});

// Mantenha o processo em execução
process.on('SIGINT', () => {
  console.log('Worker Service está encerrando...');
  process.exit();
});
