import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '../StarField';
import FloatingHearts from '../FloatingHearts';

export default function FinalScene({ onRestart }) {
  const [lanterns, setLanterns] = useState([]);

  useEffect(() => {
    // Generate beautiful warm floating lanterns for cinematic Rapunzel-style ending
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      size: Math.random() * 20 + 12,
      delay: Math.random() * 7,
      duration: Math.random() * 8 + 10,
    }));
    setLanterns(generated);
  }, []);

  return (
    <div className="relative w-full min-h-[100svh] bg-[#030303] flex flex-col justify-center items-center py-10 sm:py-16 px-4 overflow-hidden font-cairo z-10 text-center">
      {/* Background decorations */}
      <div className="vignette" />
      <StarField />
      <FloatingHearts count={8} direction="up" />

      {/* Floating lanterns layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {lanterns.map((l) => (
          <motion.div
            key={l.id}
            className="absolute rounded-t-xl rounded-b-md"
            style={{
              left: `${l.x}%`,
              width: `${l.size}px`,
              height: `${l.size * 1.3}px`,
              bottom: '-12%',
              background: 'linear-gradient(to top, rgba(230,126,34,0.75), rgba(241,196,15,0.4))',
              boxShadow: '0 0 12px rgba(241,196,15,0.7), 0 0 20px rgba(230,126,34,0.4)',
              border: '1px solid rgba(241,196,15,0.25)',
            }}
            animate={{
              y: [0, -1150],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: l.duration,
              repeat: Infinity,
              delay: l.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Narrative Card */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-8 sm:gap-12 relative z-20 px-2 select-none">
        
        {/* Pulsating realistic glowing heart */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-romantic-red filter drop-shadow-[0_0_20px_rgba(255,23,68,0.7)] cursor-pointer"
        >
          <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Breathtaking Ending Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-pink to-romantic-gold text-shimmer filter drop-shadow-[0_0_15px_rgba(255,107,157,0.35)] leading-snug font-amiri px-2">
            وهفضل أحبك كل يوم أكتر من اللي قبله ❤️
          </h2>
        </motion.div>

        {/* Made with Love by Karim Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="flex flex-col items-center gap-1 select-none"
        >
          <span className="text-white/40 text-[10px] sm:text-xs tracking-widest uppercase">صُنع بحب مخلص بواسطة</span>
          <span className="text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-romantic-gold to-white filter drop-shadow-[0_0_6px_rgba(201,168,76,0.3)]">
            Karim 💖
          </span>
        </motion.div>

        {/* Replay option */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          onClick={onRestart}
          className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm sm:text-base font-semibold hover:bg-romantic-pink/20 hover:border-romantic-pink/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50"
        >
          عيدي الحكاية من الأول 💖
        </motion.button>
      </div>
    </div>
  );
}
