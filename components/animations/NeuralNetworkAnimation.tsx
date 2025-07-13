
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const layers = {
  input: { x: 50, count: 2, color: '#38bdf8' },
  hidden: { x: 200, count: 3, color: '#a78bfa' },
  output: { x: 350, count: 1, color: '#f472b6' },
};

const totalHeight = 300;

const stepDescriptions = [
    "A simple neural network with one hidden layer. Click 'Next' to begin.",
    "Step 1: Input data is fed into the input layer.",
    "Step 2: Data passes through weighted connections to the hidden layer, where it's processed by an activation function.",
    "Step 3: The hidden layer's output is passed to the output layer, which produces the final result.",
    "This process is a 'forward pass'. Training involves repeating this and adjusting weights. Click 'Reset'."
];

const stepMath = [
    "",
    "Input: x = [x₁, x₂]",
    "Hidden Layer: aₕ = g(Wₕ * x + bₕ)",
    "Output Layer: y = g(Wₒ * aₕ + bₒ)",
    "The network computes a function y = f(x)."
];


const NeuralNetworkAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;

  const handleNext = () => setStep(s => Math.min(s + 1, maxSteps));
  const handleReset = () => setStep(0);

  const getNodeY = (layerCount: number, index: number) => {
    return (totalHeight / (layerCount + 1)) * (index + 1);
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  };
  
  const nodeVariants: Variants = {
    initial: { scale: 1, fill: '#4b5563' },
    active: { scale: 1.2, fill: 'currentColor', transition: { duration: 0.4 } }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4">
      <h4 className="text-lg font-semibold text-white mb-2">Neural Network Walkthrough</h4>
      <motion.svg viewBox="0 0 400 300" className="w-full h-full bg-gray-900 rounded-lg border border-gray-600">
        {/* Connections */}
        {/* Input -> Hidden */}
        {Array.from({ length: layers.input.count }).map((_, i) =>
          Array.from({ length: layers.hidden.count }).map((_, j) => (
            <motion.line
              key={`i-h-${i}-${j}`}
              x1={layers.input.x}
              y1={getNodeY(layers.input.count, i)}
              x2={layers.hidden.x}
              y2={getNodeY(layers.hidden.count, j)}
              stroke="#6b7280"
              strokeWidth="1"
              variants={lineVariants}
              initial="hidden"
              animate={step >= 2 ? "visible" : "hidden"}
            />
          ))
        )}
        {/* Hidden -> Output */}
        {Array.from({ length: layers.hidden.count }).map((_, i) =>
          Array.from({ length: layers.output.count }).map((_, j) => (
            <motion.line
              key={`h-o-${i}-${j}`}
              x1={layers.hidden.x}
              y1={getNodeY(layers.hidden.count, i)}
              x2={layers.output.x}
              y2={getNodeY(layers.output.count, j)}
              stroke="#6b7280"
              strokeWidth="1"
              variants={lineVariants}
              initial="hidden"
              animate={step >= 3 ? "visible" : "hidden"}
            />
          ))
        )}
        
        {/* Nodes */}
        {Object.entries(layers).map(([layerKey, layer]) =>
          Array.from({ length: layer.count }).map((_, nodeIndex) => (
            <motion.circle
              key={`${layerKey}-node-${nodeIndex}`}
              cx={layer.x}
              cy={getNodeY(layer.count, nodeIndex)}
              r="12"
              stroke={layer.color}
              strokeWidth="3"
              variants={nodeVariants}
              initial="initial"
              animate={
                (layerKey === 'input' && step >= 1) ||
                (layerKey === 'hidden' && step >= 2) ||
                (layerKey === 'output' && step >= 3)
                ? 'active'
                : 'initial'
              }
              style={{ color: layer.color }}
            />
          ))
        )}

         {/* Layer Labels */}
        <text x={layers.input.x} y="285" textAnchor="middle" fill="#9ca3af" fontSize="12">Input</text>
        <text x={layers.hidden.x} y="285" textAnchor="middle" fill="#9ca3af" fontSize="12">Hidden</text>
        <text x={layers.output.x} y="285" textAnchor="middle" fill="#9ca3af" fontSize="12">Output</text>

      </motion.svg>
      <div className="w-full text-center mt-4 min-h-[80px]">
        <AnimatePresence mode="wait">
            <motion.div 
                key={step}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-gray-300">{stepDescriptions[step]}</p>
                {step > 0 && stepMath[step] && (
                    <code className="mt-2 block bg-gray-900 text-cyan-400 p-2 rounded-md text-sm">
                        {stepMath[step]}
                    </code>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex space-x-4 mt-2">
        <button
          onClick={handleReset}
          disabled={step === 0}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset
        </button>
        <button
          onClick={handleNext}
          disabled={step === maxSteps}
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === maxSteps ? 'Finished' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default NeuralNetworkAnimation;
