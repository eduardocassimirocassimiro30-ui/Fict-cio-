
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const fetchLatestGTANews = async (query: string = "notícias recentes sobre GTA San Andreas mods e comunidade") => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "Não foi possível obter notícias no momento.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Erro ao buscar notícias com Gemini:", error);
    return { text: "Erro ao conectar com o servidor da Weasel News.", sources: [] };
  }
};

export const getLoreAssistant = async (question: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: "Você é CJ (Carl Johnson) do GTA San Andreas. Responda como ele, usando gírias de Grove Street, mas seja informativo sobre o jogo e sua história. Se falarem de comida, mencione o Cluckin' Bell ou Burger Shot.",
        temperature: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    return "Ei mano, o sinal tá ruim aqui na Grove. Tenta de novo depois!";
  }
};
