import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function MusicPlayer({ isUnlocked, playHeartbeatOnly }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const romanticAudioRef = useRef(null);
  const heartbeatAudioRef = useRef(null);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎵 AUDIO CONFIGURATION
  // We use the custom WhatsApp Audio copied to public/music.mp4!
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const romanticMusicSrc = '/music.mp4';
  const heartbeatSrc = 'https://assets.mixkit.co/active_storage/sfx/2906/2906-84.wav'; // Beating heartbeat transition fallback

  useEffect(() => {
    if (romanticAudioRef.current) {
      romanticAudioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!isUnlocked) return;

    if (playHeartbeatOnly) {
      // Transition scene: play heartbeat effect only
      if (romanticAudioRef.current) {
        romanticAudioRef.current.pause();
        setIsPlaying(false);
      }
      if (heartbeatAudioRef.current) {
        heartbeatAudioRef.current.loop = true;
        heartbeatAudioRef.current.volume = 0.9;
        heartbeatAudioRef.current.play().catch(e => 
          console.log("Heartbeat playback requires initial user interaction click:", e)
        );
      }
    } else {
      // Stopped heartbeat, play main romantic background music (music.mp4)
      if (heartbeatAudioRef.current) {
        heartbeatAudioRef.current.pause();
      }
      if (romanticAudioRef.current) {
        romanticAudioRef.current.loop = true;
        romanticAudioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Audio autoplay prevented by browser. Waiting for user interaction:", e));
      }
    }
  }, [isUnlocked, playHeartbeatOnly]);

  const togglePlay = () => {
    if (romanticAudioRef.current) {
      if (isPlaying) {
        romanticAudioRef.current.pause();
      } else {
        romanticAudioRef.current.play().catch(e => console.log("Play error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (romanticAudioRef.current) {
      romanticAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-end gap-3 font-cairo select-none">
      {/* Audio elements */}
      <audio ref={romanticAudioRef} src={romanticMusicSrc} />
      <audio ref={heartbeatAudioRef} src={heartbeatSrc} />

      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="glassmorphism-premium px-4 py-2.5 rounded-full flex items-center gap-3 text-white border border-romantic-pink/20 shadow-[0_8px_32px_0_rgba(255,23,68,0.2)]"
          >
            {/* Animated Equalizer Visualizer */}
            <div className="flex gap-[3px] items-end h-[16px] w-[18px] px-1 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-romantic-pink rounded-t"
                  animate={{
                    height: isPlaying && !playHeartbeatOnly ? [4, 16, 6, 14, 4] : 4,
                  }}
                  transition={{
                    duration: 0.7 + i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Play/Pause controls */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-romantic-red to-romantic-pink flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg shadow-romantic-red/30 cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={16} className="text-white fill-white" />
              ) : (
                <Play size={16} className="text-white fill-white translate-x-[1px]" />
              )}
            </button>

            {/* Volume controls */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: 70, marginLeft: 8 }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    className="overflow-hidden flex items-center"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-14 accent-romantic-pink bg-white/20 h-1 rounded-lg cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col text-left pr-1 leading-tight select-none">
              <span className="text-[9px] text-white/40">معزوفتنا الخاصة</span>
              <span className="text-[11px] font-semibold text-romantic-gold">Fatma & Karim 💖</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
