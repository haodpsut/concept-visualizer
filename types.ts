export enum ApiProvider {
  Gemini = 'gemini',
  OpenRouter = 'openrouter',
}

export interface AITopic {
  id: string;
  name: string;
  description: string;
}

export interface ApiSettings {
  provider: ApiProvider;
  geminiApiKey: string;
  openRouterApiKey: string;
  openRouterModel: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
