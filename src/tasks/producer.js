const AWS = require('aws-sdk');
//import AWS from "aws-sdk";

// Configurar o SQS
const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

/**
 * Envia uma mensagem para a fila SQS.
 * @param {Object} message - A mensagem que será enviada (deve ser um objeto JSON).
 */
async function sendMessageToQueue(message) {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify(message), // Mensagem precisa ser em formato string
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log('Mensagem enviada com sucesso:', result.MessageId);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}

// Exemplo de envio de mensagem
const exampleMessage = {
  event: 'user.signup',
  data: {
    userId: 123,
    name: 'Dyego Dias',
    email: 'hpdyegoa@gmail.com',
  },
};

sendMessageToQueue(exampleMessage);
