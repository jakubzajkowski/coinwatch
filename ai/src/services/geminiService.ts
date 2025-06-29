import { gemini } from "../config/gemini.js";
import { geminiAnalyseProducer } from "../kafka/producers/geminiAnalyseProducer.js";

interface AnalyseMessage {
    text: string
    userId: number
    cryptoId: string
}

export const handleAnalyse = async (message: string, userId: number, cryptoId: string) => {

    const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
    config: {
        systemInstruction: `You are a professional cryptocurrency market analyst. You are given a time series of average prices for a cryptocurrency (e.g., Bitcoin) over the past month. Based on these data points, your task is to provide a concise market analysis report.
            Write a short market analysis (2-3 paragraphs) that includes:
            - A summary of the price trend (upward, downward, or sideways)
            - Potential causes or macroeconomic factors influencing this trend
            - A brief recommendation for investors (e.g., observe, buy, hold, or stay cautious)

            Use a professional tone, like a financial advisor or crypto analyst at a fintech company.
            Avoid hype. Stick to data and logical interpretation write plain text.
        `,
        },
    });

    const analyseMessage : AnalyseMessage = {
        text: response.text as string,
        userId: userId,
        cryptoId: cryptoId
    }


    await geminiAnalyseProducer.send({
        topic: 'ai-response-topic',
        messages: [{ value: JSON.stringify(analyseMessage)}],
    });
}