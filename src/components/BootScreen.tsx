import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playStartSound } from '@/lib/sounds';

const bootLines = [
  '♪ ♫ ♪',
  '> ★ DevX PRESENTS ★',
  '> SUPER DEVX BROS. v4.2.0',
  '> Loading World 1-1...',
  '> Mushrooms.......... ✓',
  '> Fire Flowers....... ✓',
  '> Star Power......... ✓',
  '> 8 TOOLS IN INVENTORY',
  '> MADE WITH 🔥 BY DevX',
  '> ',
  '> PRESS START',
];

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const delay = visibleLines === 0 ? 500 : Math.random() * 200 + 100;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const handler = () => {
        playStartSound();
        setTimeout(() => onComplete(), 600);
      };
      window.addEventListener('keydown', handler);
      window.addEventListener('click', handler);
      return () => {
        window.removeEventListener('keydown', handler);
        window.removeEventListener('click', handler);
      };
    }
  }, [visibleLines, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => { playStartSound(); setTimeout(() => onComplete(), 300); }}
          className="absolute top-4 right-4 z-50 font-pixel text-[9px] text-muted-foreground border border-border px-3 py-1.5 hover:text-secondary hover:border-secondary transition-colors"
        >
          SKIP ▶▶
        </motion.button>
        {/* Pixel stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-secondary rounded-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-2xl w-full p-8 relative z-10">
          {/* Mario coin animation at top */}
          <div className="text-center mb-8">
            <span className="text-4xl animate-coin-spin inline-block">🪙</span>
          </div>

          <div className="font-mono text-sm sm:text-base leading-loose">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  i === bootLines.length - 1
                    ? 'text-primary font-pixel text-center text-lg mt-4 animate-pulse'
                    : i === 1
                    ? 'text-secondary font-pixel text-sm gold-glow'
                    : i === 0
                    ? 'text-secondary text-center text-2xl'
                    : 'text-muted-foreground'
                }`}
              >
                {line}
              </motion.div>
            ))}
            {showCursor && visibleLines < bootLines.length && (
              <span className="inline-block w-3 h-4 bg-secondary ml-1" />
            )}
          </div>

          {/* Ground blocks at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 brick-pattern" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootScreen;
