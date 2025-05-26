import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ai-app',
  brokers: ['localhost:9092'],
});

export default kafka;