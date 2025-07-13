
import React from 'react';
import { AITopic } from '../types';

interface TopicSelectorProps {
  topics: AITopic[];
  selectedTopic: AITopic;
  onTopicSelect: (topic: AITopic) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, selectedTopic, onTopicSelect }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const topic = topics.find(t => t.id === selectedId);
    if (topic) {
      onTopicSelect(topic);
    }
  };

  return (
    <div className="mb-8">
      <label htmlFor="topic-select" className="block text-lg font-medium text-gray-300 mb-2">
        Choose a Concept
      </label>
      <div className="relative">
        <select
          id="topic-select"
          value={selectedTopic.id}
          onChange={handleSelectChange}
          className="w-full appearance-none bg-gray-800 border-2 border-gray-700 text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-cyan-500 transition-colors"
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id} className="bg-gray-800 text-white">
              {topic.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;
