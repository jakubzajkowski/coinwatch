import express from 'express';
import { startGeminiAnalyseConsumer } from './kafka/comsumers/consumer.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function initKafka() {
  await startGeminiAnalyseConsumer();
}

app.listen(PORT,async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await initKafka();
});
