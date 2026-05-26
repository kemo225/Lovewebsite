import React from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from '../FloatingHearts';
import GlowingParticles from '../GlowingParticles';

export default function LoveMessageScene({ onNextScene }) {
  const loveText = 'بحبك يفطومي ربنا يخليكي ليا ، بحب كل حاجه فيكي وانتي دايما واقفه معايا ف شغلي وبتدعميني في كل حاجه 🌚♥️';
  
  const words = loveText.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16, // Staggered reveal speed
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      filter: 'blur(6px)',
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 14,
      },
    },
  };

  return (
    <div className="relative w-full min-h-[100svh] bg-[#050505] flex flex-col justify-center items-center py-10 sm:py-16 px-4 overflow-hidden font-cairo z-10 text-center">
      {/* Background vignette & ambient gradients */}
      <div className="vignette" />
      <motion.div
        animate={{
          opacity: [0.1, 0.22, 0.1],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,23,68,0.2) 0%, rgba(255,107,157,0.06) 70%)',
        }}
      />

      <FloatingHearts count={16} direction="up" />
      <GlowingParticles count={15} />

      <div className="w-full max-w-2xl flex flex-col items-center gap-6 sm:gap-10 relative z-10">
        
        {/* Heart beat icon with soft gold shadow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            filter: [
              'drop-shadow(0 0 10px rgba(255,23,68,0.4))',
              'drop-shadow(0 0 25px rgba(255,107,157,0.8))',
              'drop-shadow(0 0 10px rgba(255,23,68,0.4))',
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-romantic-red cursor-pointer"
        >
          <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Dynamic staggered word reveal letter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glassmorphism-premium p-6 sm:p-10 md:p-12 rounded-3xl border border-romantic-pink/15 shadow-2xl relative w-full flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-3 sm:gap-y-4 max-w-xl leading-relaxed text-right select-none"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-glow to-romantic-pink text-shimmer filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] inline-block leading-relaxed"
            >
              {word}
            </motion.span>
          ))}

          {/* Underline aesthetic border */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-romantic-pink to-transparent blur-[1px]" />
        </motion.div>

        {/* Continuation trigger */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 1 }}
          onClick={onNextScene}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-romantic-red via-romantic-pink to-romantic-gold text-white font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl shadow-romantic-red/35 cursor-pointer"
        >
     عارفه بقالي اد اي بحبك  
        </motion.button>
      </div>
    </div>
  );
}
