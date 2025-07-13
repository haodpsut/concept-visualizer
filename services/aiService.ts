
import { GoogleGenAI, GenerateContentResponse, Content } from '@google/genai';
import { ApiSettings, ApiProvider, ChatMessage } from '../types';

// This function gets the initial, one-off explanation for a topic.
export const generateExplanation = async (topicName: string, settings: ApiSettings): Promise<string> => {
  if (settings.provider === ApiProvider.Gemini) {
    return fetchGeminiExplanation(topicName, settings.geminiApiKey);
  } else if (settings.provider === ApiProvider.OpenRouter) {
    return fetchOpenRouterExplanation(topicName, settings.openRouterApiKey, settings.openRouterModel);
  } else {
    throw new Error("Invalid AI provider selected.");
  }
};

// This function handles subsequent chat messages, using the history for context.
export const sendChatMessage = async (topicName: string, history: ChatMessage[], settings: ApiSettings): Promise<string> => {
    if (settings.provider === ApiProvider.Gemini) {
        return sendGeminiChatMessage(topicName, history, settings.geminiApiKey);
    } else if (settings.provider === ApiProvider.OpenRouter) {
        return sendOpenRouterChatMessage(topicName, history, settings.openRouterApiKey, settings.openRouterModel);
    } else {
        throw new Error("Invalid AI provider selected.");
    }
};


async function fetchGeminiExplanation(topicName: string, apiKey: string): Promise<string> {
  if (!apiKey) throw new Error("Gemini API key is not provided.");
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the concept of "${topicName}" in simple, intuitive terms for a student learning about AI. Focus on the core idea and avoid complex math. Keep it under 150 words.`,
      config: {
          temperature: 0.5,
          topP: 0.95,
      }
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to fetch from Gemini API.");
  }
}

async function fetchOpenRouterExplanation(topicName: string, apiKey: string, model: string): Promise<string> {
  if (!apiKey) throw new Error("OpenRouter API key is not provided.");
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: `You are an expert educator specializing in AI, specifically ${topicName}. Your goal is to explain complex topics simply.` },
          { role: "user", content: `Explain the concept of "${topicName}" in simple, intuitive terms for a student. Focus on the core idea and avoid complex math. Keep it under 150 words.` }
        ]
      })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `OpenRouter API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("OpenRouter API Error:", error);
    throw new Error(error.message || "Failed to fetch from OpenRouter API.");
  }
}

async function sendGeminiChatMessage(topicName: string, history: ChatMessage[], apiKey: string): Promise<string> {
    if (!apiKey) throw new Error("Gemini API key is not provided.");
    try {
        const ai = new GoogleGenAI({ apiKey });

        const contents: Content[] = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: `You are an expert educator specializing in AI. The user is currently learning about ${topicName}. Answer their questions concisely and in the context of ${topicName}.`,
                temperature: 0.6,
            }
        });
        return response.text;
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        throw new Error(error.message || "Failed to send chat message to Gemini.");
    }
}

async function sendOpenRouterChatMessage(topicName: string, history: ChatMessage[], apiKey: string, model: string): Promise<string> {
    if (!apiKey) throw new Error("OpenRouter API key is not provided.");
    try {
        const messages = [
            { role: "system", content: `You are an expert educator specializing in AI. The user is currently learning about ${topicName}. Answer their questions concisely and in the context of ${topicName}.` },
            ...history.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user', // OpenRouter uses 'assistant'
                content: msg.content
            }))
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ model, messages })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `OpenRouter API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error: any) {
        console.error("OpenRouter Chat Error:", error);
        throw new Error(error.message || "Failed to send chat message to OpenRouter.");
    }
}
