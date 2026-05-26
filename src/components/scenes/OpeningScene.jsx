import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from '../StarField';
import GlowingParticles from '../GlowingParticles';

export default function OpeningScene({ onUnlock }) {
  const [dateInput, setDateInput] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [brokenHearts, setBrokenHearts] = useState([]);

  const correctDate = '16-4-2026';

  const triggerBrokenHearts = () => {
    const hearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 35,
    }));
    setBrokenHearts(hearts);
    setTimeout(() => setBrokenHearts([]), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedInput = dateInput.trim();
    if (formattedInput === correctDate) {
      setIsWrong(false);
      onUnlock();
    } else {
      setIsWrong(true);
      setErrorMessage('جربي تاني يا فطومي ❤️');
      triggerBrokenHearts();
      setTimeout(() => {
        setIsWrong(false);
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-[100svh] bg-[#050505] flex flex-col justify-center items-center overflow-hidden font-cairo z-10 px-4">
      {/* Cinematic Vignette Overlay */}
      <div className="vignette" />
      
      {/* Ambient background particles */}
      <StarField />
      <GlowingParticles count={15} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10 text-center flex flex-col items-center gap-6 md:gap-8"
      >
        {/* Glowing floating beating heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-romantic-red drop-shadow-[0_0_20px_rgba(255,23,68,0.7)] cursor-pointer"
        >
          <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Shimmer gradient Arabic Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-pink to-romantic-gold text-shimmer filter drop-shadow-[0_0_10px_rgba(255,107,157,0.3)] px-2 leading-relaxed">
          اكتبي التاريخ اللي غير حياتي ❤️
        </h1>

        {/* Input box inside glassmorphism container */}
        <motion.form
          onSubmit={handleSubmit}
          animate={isWrong ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center gap-5 md:gap-6 px-2"
        >
          <div className="w-full relative group">
            <input
              type="text"
              dir="ltr"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              placeholder="dd-m-yyyy"
              className="w-full px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-center text-lg sm:text-xl font-bold tracking-widest text-white bg-white/5 border border-white/10 outline-none backdrop-blur-lg focus:border-romantic-pink/60 transition-all duration-300 shadow-inner focus:shadow-[0_0_20px_rgba(255,107,157,0.2)] hover:bg-white/10"
            />
            {/* Soft pink focus glow outline */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-romantic-red/5 to-romantic-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-romantic-red to-romantic-pink text-white font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg shadow-romantic-red/25 cursor-pointer"
          >
            افتحي ناخد جوله 🌟
          </button>
        </motion.form>

        {/* Animated cute warning feedback */}
        <AnimatePresence>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-romantic-pink font-semibold text-base sm:text-lg drop-shadow-[0_0_6px_rgba(255,107,157,0.3)]"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating broken hearts on incorrect input */}
      {brokenHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl sm:text-3xl pointer-events-none z-20 select-none"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          initial={{ opacity: 1, scale: 0.8, y: 0 }}
          animate={{ opacity: 0, scale: 1.4, y: 120, rotate: [0, 30, -30] }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          💔
        </motion.div>
      ))}
    </div>
  );
}
