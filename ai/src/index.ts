import express from 'express';
import { startGeminiAnalyseConsumer } from './kafka/comsumers/geminiAnalyseConsumer.js';
import { startGeminiAnalyseProducer } from './kafka/producers/geminiAnalyseProducer.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function initKafka() {
  await startGeminiAnalyseConsumer();
  await startGeminiAnalyseProducer();
}

app.listen(PORT,async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await initKafka();
});
