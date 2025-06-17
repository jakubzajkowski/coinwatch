import { Kafka } from 'kafkajs';
import dotenv from "dotenv";
dotenv.config();

const kafka = new Kafka({
  clientId: 'ai-app',
  brokers: [`${process.env.KAFKA_URL}:9092`],
});



export default kafka;