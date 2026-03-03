import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DevXSplash from '@/components/DevXSplash';
import BootScreen from '@/components/BootScreen';
import ArcadeLobby3D from '@/components/ArcadeLobby3D';
import ToolGrid from '@/components/ToolGrid';
import PixelNav from '@/components/PixelNav';
import MusicToggle from '@/components/MusicToggle';

const Index = () => {
  const [phase, setPhase] = useState<'splash' | 'boot' | 'main'>('splash');

  if (phase === 'splash') {
    return <DevXSplash onComplete={() => setPhase('boot')} />;
  }

  if (phase === 'boot') {
    return <BootScreen onComplete={() => setPhase('main')} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background"
      >
        <PixelNav />

        {/* Floating clouds background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute text-3xl opacity-10"
              style={{
                top: `${15 + i * 20}%`,
                animation: `cloud-drift ${25 + i * 10}s linear infinite`,
                animationDelay: `${i * 8}s`,
              }}
            >
              ☁️
            </div>
          ))}
        </div>

        {/* Hero */}
        <div className="pt-16 relative z-10">
          <div className="text-center py-8 px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
              className="text-4xl mb-4"
            >
              🍄
            </motion.div>
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-pixel text-xl sm:text-3xl text-primary mario-glow mb-3"
            >
              SUPER DEVX BROS
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-pixel text-[10px] sm:text-xs text-secondary gold-glow"
            >
              MADE BY <span className="text-accent animate-star-power inline-block">DevX</span>
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-sm max-w-md mx-auto mt-2"
            >
              Hit the ? blocks to discover tools. Collect them all!
            </motion.p>

            {/* Coin counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-4 font-pixel text-[10px]"
            >
              <span className="text-secondary">WORLD 1-1</span>
              <span className="text-muted-foreground">×</span>
              <span className="text-foreground flex items-center gap-1">
                <span className="animate-coin-spin inline-block">🪙</span>
                ×00
              </span>
            </motion.div>
          </div>

          {/* 3D Lobby */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ArcadeLobby3D />
          </motion.div>

          {/* Pipe divider */}
          <div className="flex items-center justify-center gap-4 py-8 px-4">
            <div className="h-1 flex-1 max-w-24 bg-mario-green" />
            <span className="text-2xl">🟢</span>
            <span className="font-pixel text-[10px] text-muted-foreground">WARP ZONE</span>
            <span className="text-2xl">🟢</span>
            <div className="h-1 flex-1 max-w-24 bg-mario-green" />
          </div>

          {/* 2D Grid */}
          <ToolGrid />
        </div>

        {/* Ground footer */}
        <footer className="relative">
          <div className="brick-pattern h-4" />
          <div className="ground-pattern py-8 text-center space-y-2">
            <p className="font-pixel text-xs text-secondary gold-glow">
              ⭐ A DevX PRODUCTION ⭐
            </p>
            <p className="font-pixel text-[8px] text-foreground/70">
              © 2026 DEVX · ALL WORLDS RESERVED
            </p>
            <p className="font-pixel text-[7px] text-muted-foreground">
              CRAFTED WITH 🔥 BY THE DevX TEAM
            </p>
          </div>
        </footer>

        <MusicToggle />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
