import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Component imports
import MouseGlow from './components/MouseGlow';
import MusicPlayer from './components/MusicPlayer';

// Scene imports
import OpeningScene from './components/scenes/OpeningScene';
import HeartTransition from './components/scenes/HeartTransition';
import MemoriesScene from './components/scenes/MemoriesScene';
import LoveMessageScene from './components/scenes/LoveMessageScene';
import LoveTimerScene from './components/scenes/LoveTimerScene';
import FinalScene from './components/scenes/FinalScene';

export default function App() {
  const [scene, setScene] = useState('opening'); // opening, transition, memories, love-message, love-timer, final

  const handleUnlock = () => {
    setScene('transition');
  };

  const handleTransitionComplete = () => {
    setScene('memories');
  };

  const handleMemoriesComplete = () => {
    setScene('love-message');
  };

  const handleLoveMessageComplete = () => {
    setScene('love-timer');
  };

  const handleLoveTimerComplete = () => {
    setScene('final');
  };

  const handleRestart = () => {
    setScene('opening');
  };

  // Define transition styles for continuous scene swapping
  const pageVariants = {
    initial: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-cairo select-none">
      {/* Premium cursor glowing mouse effect */}
      <MouseGlow />

      {/* Floating global music player */}
      <MusicPlayer isUnlocked={scene !== 'opening'} playHeartbeatOnly={scene === 'transition'} />

      {/* Animated Scenic Canvas */}
      <AnimatePresence mode="wait">
        {scene === 'opening' && (
          <motion.div
            key="opening"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <OpeningScene onUnlock={handleUnlock} />
          </motion.div>
        )}

        {scene === 'transition' && (
          <motion.div
            key="transition"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <HeartTransition onComplete={handleTransitionComplete} />
          </motion.div>
        )}

        {scene === 'memories' && (
          <motion.div
            key="memories"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <MemoriesScene onNextScene={handleMemoriesComplete} />
          </motion.div>
        )}

        {scene === 'love-message' && (
          <motion.div
            key="love-message"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <LoveMessageScene onNextScene={handleLoveMessageComplete} />
          </motion.div>
        )}

        {scene === 'love-timer' && (
          <motion.div
            key="love-timer"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <LoveTimerScene onNextScene={handleLoveTimerComplete} />
          </motion.div>
        )}

        {scene === 'final' && (
          <motion.div
            key="final"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <FinalScene onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
