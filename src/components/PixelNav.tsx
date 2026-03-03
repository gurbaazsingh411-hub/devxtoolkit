import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playClickSound } from '@/lib/sounds';

const navItems = [
  { path: '/', label: 'WORLD', icon: '🏰' },
  { path: '/map', label: 'MAP', icon: '🗺️' },
  { path: '/leaderboard', label: 'SCORE', icon: '🏆' },
  { path: '/about', label: 'INFO', icon: '❓' },
];

const PixelNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-2 bg-card/95 backdrop-blur-sm border-b-4 border-mario-brown">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-lg">🍄</span>
        <div className="flex flex-col">
          <span className="font-pixel text-xs text-primary mario-glow group-hover:animate-glitch">
            DevX
          </span>
          <span className="font-pixel text-[6px] text-muted-foreground leading-none">
            TOOLS ARCADE
          </span>
        </div>
      </Link>

      {/* Coin counter */}
      <div className="hidden sm:flex items-center gap-1 font-pixel text-[8px] text-secondary">
        <span className="animate-coin-spin inline-block">🪙</span>
        <span>×8</span>
      </div>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => playClickSound()}>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[8px] sm:text-[10px] transition-all border-2 ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'text-foreground hover:text-secondary hover:border-secondary border-transparent'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default PixelNav;
