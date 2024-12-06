import { GoogleGenerativeAI } from "@google/generative-ai";
export default defineEventHandler(async (event) => {
        const { history } = await readBody(event)
      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI();
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
      
        const chatSession = model.startChat({
          generationConfig,
          history
        });
      
        const result1 = await chatSession.sendMessageStream("INSERT_INPUT_HERE");
        for await (const item of result1.stream) {
          console.log(item.candidates[0].content.parts[0].text);
        }
        return sendStream(event, result1.response);
  })