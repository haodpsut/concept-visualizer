import React, { useState, useEffect, useCallback } from 'react';
import { AITopic, ApiSettings, ChatMessage } from '../types';
import { generateExplanation, sendChatMessage } from '../services/aiService';
import PerceptronAnimation from './animations/PerceptronAnimation';
import QLearningAnimation from './animations/QLearningAnimation';
import GradientDescentAnimation from './animations/GradientDescentAnimation';
import NeuralNetworkAnimation from './animations/NeuralNetworkAnimation';
import { ChatInterface } from './ChatInterface';

interface AnimationViewProps {
  topic: AITopic;
  apiSettings: ApiSettings;
}

const AnimationView: React.FC<AnimationViewProps> = ({ topic, apiSettings }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(true);

  const fetchInitialExplanation = useCallback(async () => {
    setIsChatLoading(true);
    setChatHistory([]);
    try {
      const result = await generateExplanation(topic.name, apiSettings);
      setChatHistory([{ role: 'model', content: result }]);
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred.';
      setChatHistory([{ role: 'model', content: `Failed to load explanation for ${topic.name}. Please check your API key and network connection. Error: ${errorMessage}` }]);
    } finally {
      setIsChatLoading(false);
    }
  }, [topic, apiSettings]);

  useEffect(() => {
    fetchInitialExplanation();
  }, [fetchInitialExplanation]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isChatLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: message };
    const newHistory = [...chatHistory, newUserMessage];
    
    setChatHistory(newHistory);
    setIsChatLoading(true);

    try {
      const aiResponse = await sendChatMessage(topic.name, newHistory, apiSettings);
      setChatHistory([...newHistory, { role: 'model', content: aiResponse }]);
    } catch (err: any) {
      const errorMessage = err.message || "Sorry, I couldn't get a response. Please try again.";
      setChatHistory([...newHistory, { role: 'model', content: errorMessage }]);
    } finally {
      setIsChatLoading(false);
    }
  }, [chatHistory, isChatLoading, apiSettings, topic.name]);

  const renderAnimation = () => {
    switch (topic.id) {
      case 'perceptron':
        return <PerceptronAnimation />;
      case 'q-learning':
        return <QLearningAnimation />;
      case 'gradient-descent':
        return <GradientDescentAnimation />;
      case 'neural-network':
        return <NeuralNetworkAnimation />;
      default:
        return <div className="text-center text-gray-500">Animation not available.</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 min-h-[400px] flex items-center justify-center">
        {renderAnimation()}
      </div>
      <div className="lg:col-span-2 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex flex-col h-[60vh] max-h-[700px]">
         <ChatInterface
            topicName={topic.name}
            history={chatHistory}
            isLoading={isChatLoading}
            onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default AnimationView;