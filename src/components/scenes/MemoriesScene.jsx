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

  // Auto flip card every 4.5 seconds to show text and back side
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4500);

    return () => clearInterval(flipInterval);
  }, [currentIndex]); // Reset interval when active slide changes

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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-romantic-pink to-romantic-gold text-shimmer filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] font-amiri leading-relaxed">
            كل سنه يحيبيبي وانت عيدي ❤️ 
          </h2>
        </motion.div>

        {/* 3D Flipping Card Showcase Container */}
        <div className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] aspect-[3/4] flex items-center justify-center perspective-1000">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeMemory.id}
              custom={direction}
              initial={{ opacity: 0, scale: 0.85, rotateY: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotateY: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              
              // Swaying floating animation on the parent container
              className="w-full h-full preserve-3d relative floating-element cursor-pointer interactive-card select-none"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Inner container to handle the actual 3D rotate transition */}
              <div 
                className="w-full h-full duration-700 preserve-3d relative"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    🃏 CARD FRONT SIDE
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div 
                  className="absolute inset-0 bg-[#0f0f0f] p-4 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-4 backface-hidden"
                  style={{
                    boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${activeMemory.glowColor}`,
                  }}
                >
                  {/* Photo Frame (Full Image correctly preserved + cinematic blur background) */}
                  <div className="relative w-full flex-1 rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
                    
                    {/* Blurred background photo layer */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center filter blur-[15px] opacity-40 scale-110 pointer-events-none"
                      style={{ backgroundImage: `url(${activeMemory.url})` }}
                    />
                    
                    {/* Full photo displaying cleanly with object-contain */}
                    <motion.img
                      src={activeMemory.url}
                      alt={activeMemory.title}
                      className="relative z-10 w-full h-full object-contain rounded-2xl select-none"
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Film grain vignette overlay inside photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none z-15" />

                    {/* Pulsating heart badge */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 z-20">
                      <Heart className="w-4 h-4 text-romantic-red fill-romantic-red animate-pulse" />
                    </div>
                  </div>

                  {/* Title & Floating Hint Icon */}
                  <div className="text-right flex justify-between items-center px-1">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-romantic-gold">
                        {activeMemory.title}
                      </h3>
                      <p className="text-[10px] text-white/40 mt-0.5">دوسي لقلب البطاقة وقراءة الرسالة 💫</p>
                    </div>
                    <RotateCw className="w-4 h-4 text-romantic-pink opacity-60 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    🃏 CARD BACK SIDE
                    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div 
                  className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 border border-romantic-pink/20 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,10,12,0.95), rgba(8,6,8,0.98))',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255, 107, 157, 0.25)`,
                  }}
                >
                  {/* Subtle pink backdrop ambient glow */}
                  <div className="absolute w-[200px] h-[200px] rounded-full bg-romantic-pink/10 blur-[50px] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Hearts overlay background */}
                  <FloatingHearts count={6} direction="up" />

                  {/* Top Quote Icon */}
                  <div className="text-romantic-pink/30 self-center">
                    <svg className="w-8 h-8 rotate-180 fill-current" viewBox="0 0 24 24">
                      <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3z" />
                    </svg>
                  </div>

                  {/* Message body with premium typography */}
                  <div className="flex-1 flex flex-col justify-center items-center px-2">
                    <h4 className="text-lg font-bold text-romantic-gold mb-3 filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                      {activeMemory.title}
                    </h4>
                    <p className="text-sm sm:text-base text-white/95 leading-relaxed font-light text-right select-none">
                      {activeMemory.message}
                    </p>
                  </div>

                  {/* Bottom animated beating heart decoration */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-romantic-red mt-2"
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
            افتحي رسالة يا فطومي 💌
          </motion.button>
        )}
      </div>
    </div>
  );
}
