import kafka from "../../config/kafka.js";
import { handleAnalyse } from "../../services/geminiService.js";

const geminiAnalyseConsumer = kafka.consumer({ groupId: 'ai-test-group',
    heartbeatInterval: 3000,       
    sessionTimeout: 10000, 
 });
const topic = 'ai-test-topic';

export async function startGeminiAnalyseConsumer() {
  await geminiAnalyseConsumer.connect();
  await geminiAnalyseConsumer.subscribe({ topic, fromBeginning: false });

  console.log(`Kafka consumer subscribed to topic: ${topic}`);

  await geminiAnalyseConsumer.run({
    eachMessage: async ({ topic,  message }) => {
      console.log(message.value?.toString());
      handleAnalyse(message.value?.toString() as string);
    },
  });
}

export async function disconnectGeminiAnalyseConsumer() {
  await geminiAnalyseConsumer.disconnect();
  console.log('Kafka consumer disconnected');
}