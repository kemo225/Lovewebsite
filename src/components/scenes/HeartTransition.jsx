import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from '../FloatingHearts';

export default function HeartTransition({ onComplete }) {
  useEffect(() => {
    // Standard movie transition duration
    const timer = setTimeout(() => {
      onComplete();
    }, 5500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-[100svh] bg-[#050505] flex flex-col justify-center items-center overflow-hidden z-25 font-cairo">
      {/* Cinematic Vignette Overlay */}
      <div className="vignette" />

      {/* Ambient pink lighting radial gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.2] }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,107,157,0.18) 0%, rgba(5,5,5,0) 70%)'
        }}
      />

      {/* Small glowing hearts falling from the top */}
      <FloatingHearts count={20} direction="down" />

      {/* Beating Realistic Heart */}
      <div className="flex flex-col items-center gap-6 relative z-10 px-4 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.15, 1, 1.2, 1, 1.2, 1, 1.2, 1, 0.8, 0],
            opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0],
            filter: [
              'drop-shadow(0 0 10px rgba(255,23,68,0.4))',
              'drop-shadow(0 0 30px rgba(255,23,68,0.8))',
              'drop-shadow(0 0 15px rgba(255,23,68,0.5))',
              'drop-shadow(0 0 35px rgba(255,23,68,0.9))',
              'drop-shadow(0 0 20px rgba(255,23,68,0.6))',
              'drop-shadow(0 0 35px rgba(255,23,68,0.9))',
              'drop-shadow(0 0 20px rgba(255,23,68,0.6))',
              'drop-shadow(0 0 35px rgba(255,23,68,0.9))',
              'drop-shadow(0 0 20px rgba(255,23,68,0.6))',
              'drop-shadow(0 0 10px rgba(255,23,68,0.3))',
              'drop-shadow(0 0 0px rgba(0,0,0,0))'
            ]
          }}
          transition={{
            duration: 5.5,
            times: [0, 0.1, 0.15, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75, 0.9, 1],
            ease: "easeInOut"
          }}
          className="text-romantic-red cursor-pointer"
        >
          <svg className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Transition narrative caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 4.5, times: [0, 0.2, 0.8, 1], delay: 0.5 }}
          className="text-romantic-gold text-base sm:text-lg md:text-xl font-bold tracking-wider filter drop-shadow-[0_0_10px_rgba(201,168,76,0.35)] px-4 leading-relaxed font-amiri"
        >
          دقات قلبي تعزف باسمك... فطومي ❤️
        </motion.p>
      </div>

      {/* Cinematic Blur fade overlay */}
      <motion.div
        initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
        animate={{ backdropFilter: ['blur(0px)', 'blur(0px)', 'blur(15px)'], opacity: [0, 0, 1] }}
        transition={{ duration: 5.5, times: [0, 0.8, 1] }}
        className="absolute inset-0 bg-black/40 pointer-events-none"
      />
    </div>
  );
}
