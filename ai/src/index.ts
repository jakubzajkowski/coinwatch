import express from 'express';
import { gemini } from './config/gemini.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',async (_req, res) => {
  async function main() {
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
  }

  await main();
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
