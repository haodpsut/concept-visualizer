
import React, { useState, useEffect, useCallback } from 'react';
import ApiKeySetup from './components/ApiKeySetup';
import TopicSelector from './components/TopicSelector';
import AnimationView from './components/AnimationView';
import { ApiProvider, AITopic, ApiSettings } from './types';
import { TOPICS } from './constants';

const App: React.FC = () => {
  const [apiSettings, setApiSettings] = useState<ApiSettings | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<AITopic>(TOPICS[0]);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('apiSettings');
      if (savedSettings) {
        setApiSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to parse API settings from localStorage", error);
      localStorage.removeItem('apiSettings');
    }
  }, []);

  const handleSaveSettings = useCallback((settings: ApiSettings) => {
    localStorage.setItem('apiSettings', JSON.stringify(settings));
    setApiSettings(settings);
  }, []);

  const handleTopicSelect = useCallback((topic: AITopic) => {
    setSelectedTopic(topic);
  }, []);

  const handleResetSettings = useCallback(() => {
    localStorage.removeItem('apiSettings');
    setApiSettings(null);
  }, []);

  if (!apiSettings) {
    return <ApiKeySetup onSave={handleSaveSettings} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">
            AI Concept Visualizer
          </h1>
          <button
            onClick={handleResetSettings}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L8 5.138A5.992 5.992 0 005.138 8L3.17 8.51c-1.56.38-1.56 2.6 0 2.98L5.138 12A5.992 5.992 0 008 14.862L8.51 16.83c.38 1.56 2.6 1.56 2.98 0L12 14.862A5.992 5.992 0 0014.862 12L16.83 11.49c1.56-.38 1.56-2.6 0-2.98L14.862 8A5.992 5.992 0 0012 5.138L11.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Reset Keys
          </button>
        </header>

        <main>
          <TopicSelector
            topics={TOPICS}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
          />
          <AnimationView
            key={selectedTopic.id}
            topic={selectedTopic}
            apiSettings={apiSettings}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
