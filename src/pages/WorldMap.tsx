import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PixelNav from '@/components/PixelNav';
import { tools } from '@/data/tools';

const zones = [
  { id: 'ai', name: 'MUSHROOM KINGDOM', subtitle: 'AI TOOLS', icon: '🍄', color: '#E03030', x: '20%', y: '30%' },
  { id: 'web', name: 'STAR ROAD', subtitle: 'WEB TOOLS', icon: '⭐', color: '#FFD700', x: '70%', y: '25%' },
  { id: 'utility', name: 'PIPE MAZE', subtitle: 'UTILITIES', icon: '🟢', color: '#228B22', x: '25%', y: '65%' },
  { id: 'hackathon', name: 'BOWSER CASTLE', subtitle: 'HACKATHON', icon: '🔥', color: '#FF3366', x: '72%', y: '62%' },
];

const WorldMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PixelNav />

      <div className="pt-20 px-4 max-w-5xl mx-auto pb-20">
        <h1 className="font-pixel text-lg text-primary mario-glow text-center mb-2">
          WORLD MAP
        </h1>
        <p className="font-pixel text-[8px] text-secondary text-center mb-8">
          SELECT YOUR WORLD
        </p>

        {/* Map area */}
        <div className="relative border-4 border-mario-brown bg-card aspect-[16/10] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1a2a5e 0%, #3a5aae 40%, #228B22 70%, #8B4513 90%)',
          }}
        >
          {/* Clouds */}
          <div className="absolute top-[8%] left-[10%] text-3xl opacity-40">☁️</div>
          <div className="absolute top-[5%] right-[15%] text-2xl opacity-30">☁️</div>
          <div className="absolute top-[15%] left-[45%] text-xl opacity-35">☁️</div>

          {/* Path lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <line x1="25%" y1="35%" x2="72%" y2="30%" stroke="#FFD700" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="25%" y1="35%" x2="28%" y2="70%" stroke="#FFD700" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="72%" y1="30%" x2="75%" y2="67%" stroke="#FFD700" strokeWidth="3" strokeDasharray="8 4" />
            <line x1="28%" y1="70%" x2="75%" y2="67%" stroke="#FFD700" strokeWidth="3" strokeDasharray="8 4" />
          </svg>

          {/* Zones */}
          {zones.map((zone, i) => {
            const zoneTools = tools.filter(t => t.category === zone.id);
            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2, type: 'spring', bounce: 0.4 }}
                className="absolute cursor-pointer group"
                style={{ left: zone.x, top: zone.y, transform: 'translate(-50%, -50%)' }}
                onClick={() => navigate(`/?category=${zone.id}`)}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Floating icon */}
                  <div className="text-3xl sm:text-4xl mb-1 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                    {zone.icon}
                  </div>
                  <div
                    className="font-pixel text-[6px] sm:text-[8px] whitespace-nowrap px-2 py-1 border-2"
                    style={{
                      color: zone.color,
                      borderColor: zone.color,
                      background: 'rgba(0,0,0,0.7)',
                    }}
                  >
                    {zone.name}
                  </div>
                  <span className="font-pixel text-[6px] text-foreground/60 mt-1">
                    {zoneTools.length} TOOLS
                  </span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Mario character at center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl animate-bounce-mario pointer-events-none">
            🏃
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] brick-pattern" />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 font-pixel text-[8px]">
          CLICK A WORLD TO WARP THERE
        </p>
      </div>

      <div className="brick-pattern h-4" />
      <div className="ground-pattern h-8" />
    </div>
  );
};

export default WorldMap;
