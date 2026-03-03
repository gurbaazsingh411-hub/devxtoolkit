import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playStartSound } from '@/lib/sounds';

interface DevXSplashProps {
  onComplete: () => void;
}

// Generate random particles for the explosion effect
const particles = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  const distance = 80 + Math.random() * 120;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: Math.random() > 0.5 ? 'w-2 h-2' : 'w-3 h-3',
    color: ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-[hsl(var(--mario-green))]'][i % 4],
    delay: Math.random() * 0.2,
    duration: 0.6 + Math.random() * 0.4,
  };
});

const sparkEmojis = ['✨', '💥', '⭐', '🔥', '💫'];

const DevXSplash = ({ onComplete }: DevXSplashProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => { playStartSound(); setPhase(4); }, 2800),
      setTimeout(() => onComplete(), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-background overflow-hidden"
        // Screen shake when logo pops (phase 2)
        animate={phase === 2 ? {
          x: [0, -6, 5, -4, 3, -2, 0],
          y: [0, 4, -5, 3, -2, 1, 0],
        } : { x: 0, y: 0 }}
        transition={{ duration: phase === 2 ? 0.4 : 0.5 }}
      >
        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onComplete}
          className="absolute top-4 right-4 z-50 font-pixel text-[9px] text-muted-foreground border border-border px-3 py-1.5 hover:text-secondary hover:border-secondary transition-colors"
        >
          SKIP ▶▶
        </motion.button>

        {/* Pixel stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-col items-center gap-6">
          {/* Mario pipe rising */}
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Pipe top */}
            <div className="w-28 h-8 bg-[hsl(var(--mario-green))] border-4 border-[hsl(120_40%_25%)] relative z-10 mx-auto" 
                 style={{ boxShadow: 'inset 4px 0 0 hsl(120 60% 45%), inset -4px 0 0 hsl(120 40% 20%)' }} />
            {/* Pipe body */}
            <div className="w-24 h-12 bg-[hsl(var(--mario-green))] border-x-4 border-[hsl(120_40%_25%)] mx-auto"
                 style={{ boxShadow: 'inset 4px 0 0 hsl(120 60% 45%), inset -4px 0 0 hsl(120 40% 20%)' }} />
          </motion.div>

          {/* Particle explosion on logo pop */}
          {phase >= 2 && (
            <>
              {particles.map((p, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute ${p.size} ${p.color} z-10`}
                  initial={{ x: 0, y: -40, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y - 40, opacity: 0, scale: 0 }}
                  transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                />
              ))}
              {/* Emoji sparks */}
              {sparkEmojis.map((emoji, i) => (
                <motion.span
                  key={`spark-${i}`}
                  className="absolute text-xl z-30"
                  initial={{ x: 0, y: -40, opacity: 1, scale: 1.5 }}
                  animate={{
                    x: (Math.cos((i / sparkEmojis.length) * Math.PI * 2) * 100),
                    y: (Math.sin((i / sparkEmojis.length) * Math.PI * 2) * 80) - 40,
                    opacity: 0,
                    scale: 0,
                    rotate: 360,
                  }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                >
                  {emoji}
                </motion.span>
              ))}
              {/* Flash ring */}
              <motion.div
                className="absolute top-[-40px] w-4 h-4 rounded-full border-4 border-secondary z-5"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 20, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </>
          )}

          {/* DevX Logo popping out of pipe */}
          <motion.div
            initial={{ y: 80, scale: 0, opacity: 0 }}
            animate={phase >= 2 ? { y: -60, scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.7 }}
            className="absolute top-0 z-20"
          >
            {/* The logo block */}
            <div className="relative">
              {/* Question block container */}
              <div className="question-block px-6 py-4 relative">
                {/* Corner rivets */}
                <div className="absolute top-1 left-1 w-2 h-2 bg-[hsl(30_80%_30%)]" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-[hsl(30_80%_30%)]" />
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-[hsl(30_80%_30%)]" />
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-[hsl(30_80%_30%)]" />

                <motion.div
                  animate={phase >= 2 ? { rotateY: [0, 360] } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="font-pixel text-2xl sm:text-4xl text-primary drop-shadow-[0_2px_0_hsl(0_0%_0%)]"
                        style={{ 
                          textShadow: '2px 2px 0 hsl(0 60% 30%), -1px -1px 0 hsl(0 85% 65%), 0 0 10px hsl(0 85% 50% / 0.5)',
                          letterSpacing: '4px'
                        }}>
                    DevX
                  </span>
                </motion.div>
              </div>

              {/* Floating mushroom */}
              <motion.span
                className="absolute -top-6 -right-4 text-2xl"
                animate={phase >= 2 ? { y: [0, -8, 0], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🍄
              </motion.span>

              {/* Floating star */}
              <motion.span
                className="absolute -top-4 -left-4 text-xl"
                animate={phase >= 2 ? { y: [0, -6, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              >
                ⭐
              </motion.span>
            </div>
          </motion.div>

          {/* Coins flying out */}
          {phase >= 2 && (
            <>
              {[-40, -20, 20, 40].map((x, i) => (
                <motion.span
                  key={i}
                  className="absolute text-lg z-30"
                  initial={{ y: -20, x: 0, opacity: 1 }}
                  animate={{ y: -120 - i * 20, x, opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  🪙
                </motion.span>
              ))}
            </>
          )}

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="absolute -bottom-16 text-center"
          >
            <p className="font-pixel text-[10px] sm:text-xs text-secondary gold-glow tracking-widest">
              ★ PRESENTS ★
            </p>
          </motion.div>

          {/* Power-up bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 1 ? { scaleX: 1 } : {}}
            transition={{ duration: 2.5, ease: 'linear' }}
            className="absolute -bottom-28 w-48 h-2 origin-left"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--mario-red)), hsl(var(--mario-gold)), hsl(var(--mario-green)))',
              boxShadow: '0 0 8px hsl(var(--mario-gold) / 0.5)',
            }}
          />
          <div className="absolute -bottom-28 w-48 h-2 border-2 border-border" />
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="brick-pattern h-4" />
          <div className="ground-pattern h-8" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DevXSplash;
