
import React from 'react';
import { motion, Variants } from 'framer-motion';

const GRID_SIZE = 4;
const CELL_SIZE = 70;
const PADDING = 10;
const VIEW_BOX_SIZE = GRID_SIZE * CELL_SIZE + 2 * PADDING;

const QLearningAnimation: React.FC = () => {
    const goal = { x: 3, y: 3 };
    const trap = { x: 2, y: 1 };

    const agentPathD = `M${1 * CELL_SIZE + CELL_SIZE/2},${1 * CELL_SIZE + CELL_SIZE/2} L${1 * CELL_SIZE + CELL_SIZE/2},${2 * CELL_SIZE + CELL_SIZE/2} L${2 * CELL_SIZE + CELL_SIZE/2},${2 * CELL_SIZE + CELL_SIZE/2} L${3 * CELL_SIZE + CELL_SIZE/2},${2 * CELL_SIZE + CELL_SIZE/2} L${3 * CELL_SIZE + CELL_SIZE/2},${3 * CELL_SIZE + CELL_SIZE/2}`;

    const agentMotionPath = `M0,0 L0,${CELL_SIZE} L${CELL_SIZE},${CELL_SIZE} L${2 * CELL_SIZE},${CELL_SIZE} L${2 * CELL_SIZE},${2*CELL_SIZE}`;

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 4, ease: "easeInOut", repeat: Infinity },
                opacity: { duration: 0.01 }
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 p-2">
            <h4 className="text-lg font-semibold text-white">Q-Learning Grid World</h4>
            <motion.svg viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`} className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] bg-gray-900 rounded-lg border border-gray-600">
                <g transform={`translate(${PADDING}, ${PADDING})`}>
                    {Array.from({ length: GRID_SIZE }).map((_, y) =>
                        Array.from({ length: GRID_SIZE }).map((_, x) => {
                            let fill = "transparent";
                            if (x === goal.x && y === goal.y) fill = "#10b981"; // Goal
                            if (x === trap.x && y === trap.y) fill = "#f43f5e"; // Trap

                            return (
                                <motion.rect
                                    key={`${x}-${y}`}
                                    x={x * CELL_SIZE}
                                    y={y * CELL_SIZE}
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    fill={fill}
                                    stroke="#4b5563"
                                    strokeWidth="2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    transition={{ delay: (x + y) * 0.1 }}
                                />
                            );
                        })
                    )}
                    
                    <motion.path
                        d={agentPathD}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        initial="hidden"
                        animate="visible"
                    />

                    <motion.circle
                        cx={1 * CELL_SIZE + CELL_SIZE/2}
                        cy={1 * CELL_SIZE + CELL_SIZE/2}
                        r={CELL_SIZE / 4}
                        fill="#f0f0f0"
                        stroke="#38bdf8"
                        strokeWidth="3"
                    >
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            path={agentMotionPath}
                            calcMode="linear"
                        />
                    </motion.circle>
                </g>
            </motion.svg>
            <div className="w-full text-center mt-4 p-3 bg-gray-900 border border-gray-700 rounded-lg">
                <h5 className="text-md font-semibold text-gray-300 mb-2">Core Formula: Bellman Equation</h5>
                <code className="text-cyan-400 p-2 rounded-md text-xs md:text-sm">
                    Q(s,a) ← Q(s,a) + α·[R + γ·maxQ(s',a') - Q(s,a)]
                </code>
            </div>
        </div>
    );
};

export default QLearningAnimation;
