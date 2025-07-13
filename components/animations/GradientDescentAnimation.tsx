
import React from 'react';
import { motion } from 'framer-motion';

const GradientDescentAnimation: React.FC = () => {
    // A simple parabola: y = a(x - h)^2 + k
    const h = 175;
    const k = 50;
    const pathData = `M 0 300 Q ${h} -50, 350 300`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
            <h4 className="text-lg font-semibold text-white">Gradient Descent Optimization</h4>
            <motion.svg viewBox="0 0 350 350" className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                <motion.path
                    d={pathData}
                    stroke="#4f46e5"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                <motion.circle
                    r="10"
                    fill="#38bdf8"
                    stroke="white"
                    strokeWidth="2"
                >
                  <animateMotion
                    dur="5s"
                    repeatCount="indefinite"
                    path={pathData}
                    keyPoints="0;0.5;1"
                    keyTimes="0;0.5;1"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                  />
                </motion.circle>
                
                <text x={h} y={k - 15} textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">
                    Minimum
                </text>
                 <motion.line
                    x1={h} y1={k-10}
                    x2={h} y2={k}
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                />
            </motion.svg>
            <div className="w-full text-center mt-4 p-3 bg-gray-900 border border-gray-700 rounded-lg">
                <h5 className="text-md font-semibold text-gray-300 mb-2">Core Formula: Update Rule</h5>
                <code className="text-cyan-400 p-2 rounded-md text-sm md:text-base">
                    θ := θ - α · ∇J(θ)
                </code>
            </div>
        </div>
    );
};

export default GradientDescentAnimation;
