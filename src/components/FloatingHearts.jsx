import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts({ count = 25, direction = 'up' }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.4 + 0.3,
      color: Math.random() > 0.5 ? '#ff1744' : '#ff6b9d',
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart) => (
        <motion.svg
          key={heart.id}
          className="absolute"
          viewBox="0 0 24 24"
          fill={heart.color}
          style={{
            left: `${heart.x}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            filter: 'drop-shadow(0 0 6px rgba(255, 23, 68, 0.4))',
            opacity: heart.opacity,
            bottom: direction === 'up' ? '-5%' : 'auto',
            top: direction === 'down' ? '-5%' : 'auto',
          }}
          animate={
            direction === 'up'
              ? {
                  y: [0, -1100],
                  x: [0, Math.random() * 40 - 20, 0],
                  rotate: [0, Math.random() * 90 - 45],
                }
              : {
                  y: [0, 1100],
                  x: [0, Math.random() * 40 - 20, 0],
                  rotate: [0, Math.random() * 90 - 45],
                }
          }
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      ))}
    </div>
  );
}
