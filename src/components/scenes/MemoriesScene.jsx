import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, RotateCw } from 'lucide-react';
import FloatingHearts from '../FloatingHearts';

const memories = [
  {
    id: 1,
    url: '/photos/photo1.jpg',
    title: 'صنعنا قلباً بأيدينا 💖',
    message: 'في هذه اللحظة العفوية والجميلة، صنعنا قلباً بأيدينا فصنعنا وطناً من الدفء والوفاء... ممتن لكل ثانية أقضيها بجانبكِ يا فاطمة يا أجمل هدايا القدر لي.',
    glowColor: 'rgba(255,23,68,0.4)',
  },
  {
    id: 2,
    url: '/photos/photo2.jpg',
    title: 'ضحكتكِ تسرق قلبي 🌸',
    message: 'ضحكتكِ وابتسامتكِ العفوية هي أجمل نغمٍ تراه عيناي وتسمعه أذناي، وتفاصيلكِ البسيطة والمميزة تزيدني عشقاً وولهاً بكِ كل يوم أكثر من قبل.',
    glowColor: 'rgba(255,107,157,0.4)',
  },
  {
    id: 3,
    url: '/photos/photo3.jpg',
    title: 'عهد الحب الأبدي ✨',
    message: 'سندكِ وحبيبكِ الأول والأخير، سأظل بجانبكِ داعماً لكِ في كل خطوة ومشاركاً لكِ في كل نجاحاتكِ، ممتن لوجودكِ الداعم والجميل في حياتي وشغلي.',
    glowColor: 'rgba(201,168,76,0.4)',
  },
];

export default function MemoriesScene({ onNextScene }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto flip card to back and front to guide the emotional storytelling flow
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4500);

    return () => clearInterval(flipInterval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsFlipped(false);
    setDirection(1);
    
    // Give 300ms for card to unflip before transitioning slides
    setTimeout(() => {
      if (currentIndex < memories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onNextScene();
      }
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsFlipped(false);
    setDirection(-1);

    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const activeMemory = memories[currentIndex];

  return (
    <div className="relative w-full min-h-[100svh] bg-[#050505] flex flex-col justify-center items-center py-8 md:py-16 px-4 overflow-hidden font-cairo z-10">
      {/* Background decorations */}
      <div className="vignette" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-red/5 to-transparent pointer-events-none" />
      <FloatingHearts count={12} direction="up" />

      {/* Screen flash transition effect between slides */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white pointer-events-none z-30 mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl flex flex-col items-center gap-6 md:gap-8 relative z-10">
        
        {/* Shimmering Dynamic Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <span className="text-romantic-pink font-semibold text-xs tracking-widest uppercase mb-1 block select-none">
            صندوق ذكرياتنا السعيدة 📸
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-pink to-romantic-gold text-shimmer filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] font-amiri leading-relaxed select-none">
            كل لحظة معكِ هي عمرٌ كامل ❤️
          </h2>
        </motion.div>

        {/* 3D Flipping Card Showcase Container (Isolated floating-element here to prevent 3D render bugs) */}
        <div className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[370px] aspect-[3/4] flex items-center justify-center perspective-1000 floating-element select-none">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeMemory.id}
              custom={direction}
              initial={{ opacity: 0, scale: 0.85, rotateY: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateY: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full preserve-3d relative cursor-pointer interactive-card"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Inner Rotating Wrapper */}
              <div 
                className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    🃏 CARD FRONT SIDE (Image Only - Bulletproof 3D separation)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-[#0f0f0f] border border-white/10 flex items-center justify-center p-4"
                  style={{
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${activeMemory.glowColor}`,
                  }}
                >
                  {/* Blurred background photo layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-[15px] opacity-40 scale-110 pointer-events-none"
                    style={{ backgroundImage: `url(${activeMemory.url})` }}
                  />
                  
                  {/* Full photo displaying cleanly with object-contain */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/45 flex items-center justify-center">
                    <motion.img
                      src={activeMemory.url}
                      alt={activeMemory.title}
                      className="relative z-10 w-full h-full object-contain rounded-2xl select-none"
                      loading="lazy"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Film grain vignette overlay inside photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-15" />

                    {/* Animated heartbeat badge */}
                    <div className="absolute top-3 right-3 bg-black/55 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-20">
                      <Heart className="w-4 h-4 text-romantic-red fill-romantic-red animate-pulse" />
                    </div>

                    {/* Touch guide badge */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5 text-romantic-gold animate-spin" style={{ animationDuration: '8s' }} />
                      <span className="text-[9px] text-white/80 font-medium">انقري للقراءة</span>
                    </div>
                  </div>
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    🃏 CARD BACK SIDE (Text/Message Only - Completely isolated)
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between items-center text-center overflow-hidden border border-romantic-pink/20"
                  style={{
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, rgba(16,10,12,0.98), rgba(8,6,8,0.99))',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255, 107, 157, 0.25)`,
                  }}
                >
                  {/* Backdrop glowing sphere */}
                  <div className="absolute w-[200px] h-[200px] rounded-full bg-romantic-pink/10 blur-[50px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  {/* Floating particles back overlay */}
                  <FloatingHearts count={5} direction="up" />

                  {/* Quote decoration */}
                  <div className="text-romantic-pink/30 mt-4 select-none">
                    <svg className="w-7 h-7 rotate-180 fill-current" viewBox="0 0 24 24">
                      <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3z" />
                    </svg>
                  </div>

                  {/* Center message body with perfect padding preventing edge touching */}
                  <div className="flex-1 flex flex-col justify-center items-center px-4 w-full select-none">
                    <h4 className="text-lg sm:text-xl font-bold text-romantic-gold mb-3 filter drop-shadow-[0_0_8px_rgba(201,168,76,0.35)] font-amiri leading-normal">
                      {activeMemory.title}
                    </h4>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light text-right w-full">
                      {activeMemory.message}
                    </p>
                  </div>

                  {/* Pulsating heartbeat heart decoration */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-romantic-red mb-4 select-none"
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Dynamic Controls Navigation */}
        <div className="flex justify-between items-center w-full max-w-xs mt-4 relative z-20 px-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all cursor-pointer ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-white/5 hover:bg-romantic-pink/20 hover:border-romantic-pink/40 text-white'
            }`}
          >
            <ChevronRight size={20} />
          </button>

          <span className="text-white/60 font-semibold tracking-wider text-sm select-none">
            {currentIndex + 1} / {memories.length}
          </span>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-romantic-pink/20 hover:border-romantic-pink/40 text-white flex items-center justify-center transition-all cursor-pointer animate-pulse"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Continuation Button (fades in on last slide) */}
        {currentIndex === memories.length - 1 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNextScene}
            className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-romantic-red to-romantic-pink text-white font-bold tracking-wide hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg shadow-romantic-red/20 cursor-pointer text-sm sm:text-base"
          >
            افتحي رسالة قلبي 💌
          </motion.button>
        )}
      </div>
    </div>
  );
}
