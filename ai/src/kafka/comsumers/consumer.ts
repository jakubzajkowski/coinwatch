import kafka from "../../config/kafka.js";
import { handleAnalyse } from "../../services/aiService.js";

const consumer = kafka.consumer({ groupId: 'ai-test-group' });
const topic = 'ai-test-topic';

export async function startGeminiAnalyseConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic,  message }) => {
      handleAnalyse(message.value?.toString() as string);
    },
  });

  console.log(`Kafka consumer subscribed to topic: ${topic}`);
}

export async function disconnectGeminiAnalyseConsumer() {
  await consumer.disconnect();
  console.log('Kafka consumer disconnected');
}