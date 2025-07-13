
import React from 'react';
import { motion } from 'framer-motion';

const PerceptronAnimation: React.FC = () => {
  const points = React.useMemo(() => [
    { x: 50, y: 50, class: 0 }, { x: 70, y: 90, class: 0 }, { x: 100, y: 120, class: 0 },
    { x: 130, y: 60, class: 0 }, { x: 160, y: 110, class: 0 },
    { x: 200, y: 220, class: 1 }, { x: 230, y: 180, class: 1 }, { x: 250, y: 250, class: 1 },
    { x: 280, y: 200, class: 1 }, { x: 310, y: 260, class: 1 },
  ], []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
        <h4 className="text-lg font-semibold text-white">Perceptron Classification</h4>
        <motion.svg viewBox="0 0 350 350" className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-gray-900 rounded-lg border border-gray-600">
            {points.map((p, i) => (
                <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill={p.class === 0 ? '#38bdf8' : '#f472b6'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                />
            ))}
            <motion.line
                x1="0"
                y1="175"
                x2="350"
                y2="175"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={{
                    pathLength: 1,
                    rotate: [-20, 25, 10]
                }}
                transition={{
                    pathLength: { duration: 1, delay: 0.5 },
                    rotate: { duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                }}
                style={{ transformOrigin: "175px 175px" }}
            />
        </motion.svg>
        <div className="w-full text-center mt-4 p-3 bg-gray-900 border border-gray-700 rounded-lg">
            <h5 className="text-md font-semibold text-gray-300 mb-2">Core Formula: Update Rule</h5>
            <code className="text-cyan-400 p-2 rounded-md text-sm md:text-base whitespace-nowrap">
                w(t+1) = w(t) + α · (y - ŷ) · x
            </code>
        </div>
    </div>
  );
};

export default PerceptronAnimation;
