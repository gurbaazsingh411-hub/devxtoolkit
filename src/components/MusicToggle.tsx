import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { startBackgroundMusic, stopBackgroundMusic, isMusicPlaying } from '@/lib/sounds';

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => { stopBackgroundMusic(); };
  }, []);

  const toggle = () => {
    if (playing) {
      stopBackgroundMusic();
    } else {
      startBackgroundMusic();
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-card border-2 border-border hover:border-secondary flex items-center justify-center font-pixel text-lg transition-colors"
      title={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? '🔊' : '🔇'}
    </motion.button>
  );
};

export default MusicToggle;
