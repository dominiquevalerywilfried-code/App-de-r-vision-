
import * as webllm from "@mlc-ai/web-llm";

let engine: webllm.MLCEngine | null = null;

export const initGemma = async (onProgress: (progress: number) => void) => {
  if (engine) return engine;

  const modelId = "gemma-2b-it-q4f16_1-MLC";
  engine = new webllm.MLCEngine();
  
  engine.setInitProgressCallback((report: webllm.InitProgressReport) => {
    // Extrait le pourcentage du rapport de progression
    const match = report.text.match(/(\d+)%/);
    if (match) {
      onProgress(parseInt(match[1]));
    }
    console.log(report.text);
  });

  await engine.reload(modelId);
  return engine;
};

export const askGemmaLocal = async (question: string) => {
  if (!engine) throw new Error("Gemma n'est pas initialisé");

  const messages: webllm.ChatCompletionMessageParam[] = [
    { role: "system", content: "Tu es Gemma, mentor expert pour la 2nde C au Cameroun. Réponds de manière scientifique et précise." },
    { role: "user", content: question }
  ];

  const reply = await engine.chat.completions.create({
    messages,
  });

  return reply.choices[0].message.content;
};
