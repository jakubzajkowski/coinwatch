import kafka from "../../config/kafka.js";

export const geminiAnalyseProducer = kafka.producer();

export async function startGeminiAnalyseProducer() {
  await geminiAnalyseProducer.connect();
}