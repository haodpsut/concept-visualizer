
import React, { useState, useCallback } from 'react';
import { ApiProvider, ApiSettings } from '../types';
import { OPENROUTER_MODELS } from '../constants';

interface ApiKeySetupProps {
  onSave: (settings: ApiSettings) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onSave }) => {
  const [provider, setProvider] = useState<ApiProvider>(ApiProvider.Gemini);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
  const [openRouterModel, setOpenRouterModel] = useState(OPENROUTER_MODELS[0]);

  const handleSave = useCallback(() => {
    if (provider === ApiProvider.Gemini && !geminiApiKey) {
      alert('Please enter a Gemini API Key.');
      return;
    }
    if (provider === ApiProvider.OpenRouter && !openRouterApiKey) {
      alert('Please enter an OpenRouter API Key.');
      return;
    }
    onSave({
      provider,
      geminiApiKey,
      openRouterApiKey,
      openRouterModel,
    });
  }, [provider, geminiApiKey, openRouterApiKey, openRouterModel, onSave]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6 border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome to AI Visualizer</h2>
          <p className="mt-2 text-gray-400">Configure your AI provider to begin.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setProvider(ApiProvider.Gemini)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
              provider === ApiProvider.Gemini ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Google Gemini
          </button>
          <button
            onClick={() => setProvider(ApiProvider.OpenRouter)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
              provider === ApiProvider.OpenRouter ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            OpenRouter
          </button>
        </div>

        <div>
          {provider === ApiProvider.Gemini ? (
            <div className="space-y-4">
              <label htmlFor="gemini_key" className="block text-sm font-medium text-gray-300">
                Gemini API Key
              </label>
              <input
                id="gemini_key"
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Enter your Gemini API Key"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="openrouter_key" className="block text-sm font-medium text-gray-300">
                  OpenRouter API Key
                </label>
                <input
                  id="openrouter_key"
                  type="password"
                  value={openRouterApiKey}
                  onChange={(e) => setOpenRouterApiKey(e.target.value)}
                  placeholder="Enter your OpenRouter API Key"
                  className="w-full mt-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="openrouter_model" className="block text-sm font-medium text-gray-300">
                  Select a Free Model
                </label>
                <select
                  id="openrouter_model"
                  value={openRouterModel}
                  onChange={(e) => setOpenRouterModel(e.target.value)}
                  className="w-full mt-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500"
                >
                  {OPENROUTER_MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-bold text-lg transition-transform duration-200 transform hover:scale-105"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ApiKeySetup;
