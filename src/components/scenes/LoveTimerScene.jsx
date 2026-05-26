import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from '../FloatingHearts';
import GlowingParticles from '../GlowingParticles';

export default function LoveTimerScene({ onNextScene }) {
  const [elapsed, setElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date('2026-04-16T00:00:00');
      const now = new Date();
      
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      
      if (days < 0) {
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonthEnd.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }
      
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();
      
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonthEnd.getDate();
        months--;
        if (months < 0) {
          months += 12;
          years--;
        }
      }
      
      setElapsed({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'سنة 📅', value: elapsed.years, color: 'from-romantic-gold to-yellow-500' },
    { label: 'شهر 🌙', value: elapsed.months, color: 'from-romantic-pink to-rose-400' },
    { label: 'يوم ☀️', value: elapsed.days, color: 'from-romantic-red to-pink-500' },
    { label: 'ساعة ⏰', value: elapsed.hours, color: 'from-purple-500 to-indigo-500' },
    { label: 'دقيقة ⏳', value: elapsed.minutes, color: 'from-blue-500 to-cyan-500' },
    { label: 'ثانية 💓', value: elapsed.seconds, color: 'from-emerald-500 to-teal-400' },
  ];

  return (
    <div className="relative w-full min-h-[100svh] bg-[#050505] flex flex-col justify-center items-center py-10 sm:py-16 px-4 overflow-hidden font-cairo z-10 text-center">
      {/* Background decoration overlays */}
      <div className="vignette" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,157,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <FloatingHearts count={16} direction="up" />
      <GlowingParticles count={20} />

      <div className="w-full max-w-4xl flex flex-col items-center gap-8 sm:gap-12 relative z-10">
        
        {/* Pulsating heart header decoration */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-romantic-pink drop-shadow-[0_0_15px_rgba(255,107,157,0.5)]"
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          
          {/* Shimmer gradient Arabic Title */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-pink to-romantic-gold text-shimmer filter drop-shadow-[0_0_8px_rgba(255,107,157,0.25)] leading-relaxed px-2 font-amiri">
            تعرفي انا بقالي قد اي بحبك؟ ❤️
          </h2>
        </motion.div>

        {/* Live Counters Grid (fully responsive 2 columns on mobile, 3 on tablet, 6 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full max-w-3xl px-2">
          {timeBlocks.map((block, idx) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 90 }}
              className="glassmorphism-premium p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center border border-white/5 shadow-lg group relative overflow-hidden interactive-card"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,157,0.3)' }}
            >
              {/* Colorful gradient indicator bar */}
              <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${block.color}`} />
              
              {/* Counter string */}
              <motion.span
                key={block.value}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wider filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] font-mono"
              >
                {String(block.value).padStart(2, '0')}
              </motion.span>
              
              {/* Category label */}
              <span className="text-xs sm:text-sm font-semibold text-romantic-gold/90 mt-2 select-none">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Cinematic trigger button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onNextScene}
          className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-romantic-red via-romantic-pink to-romantic-gold text-white font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl shadow-romantic-red/35 cursor-pointer"
        >
          حكايتنا مستمرة... 💫
        </motion.button>
      </div>
    </div>
  );
}
