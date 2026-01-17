
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const askGemini = async (question: string) => {
  if (!process.env.API_KEY) {
    return "Erreur : Clé API non détectée. Assurez-vous que l'application est correctement configurée.";
  }

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Tu es 'Gemini', le mentor d'élite pour les élèves de 2nde C au Cameroun (Programme OBC).
        Ton but : préparer l'élève aux concours les plus difficiles (Polytechnique, MIT).
        - Réponds avec une rigueur scientifique absolue (Physique, Chimie, Maths).
        - Utilise des notations claires pour les formules.
        - Sois motivant mais exigeant.
        - Priorise le programme officiel de l'OBC tout en ouvrant vers des concepts de haut niveau.`,
        temperature: 0.7,
      },
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return "Erreur de connexion. Vérifie ton accès internet ou ton crédit data.";
  }
};
