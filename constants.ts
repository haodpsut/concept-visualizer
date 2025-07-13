import { AITopic } from './types';

export const TOPICS: AITopic[] = [
  { 
    id: 'q-learning', 
    name: 'Q-Learning', 
    description: 'A model-free reinforcement learning algorithm to learn the quality of actions in a given state.'
  },
  { 
    id: 'perceptron', 
    name: 'Perceptron', 
    description: 'A simple algorithm for supervised learning of binary classifiers.' 
  },
  { 
    id: 'gradient-descent', 
    name: 'Gradient Descent', 
    description: 'An optimization algorithm used to find the local minimum of a function.'
  },
  {
    id: 'neural-network',
    name: 'Neural Network',
    description: 'A computational model inspired by the structure of biological neural networks.'
  }
];

export const OPENROUTER_MODELS: string[] = [
    "mistralai/mistral-7b-instruct:free",
    "google/gemma-7b-it:free",
    "nousresearch/nous-hermes-2-mixtral-8x7b-dpo:free",
    "openchat/openchat-7b:free",
];