import { motion } from 'framer-motion';
import PixelNav from '@/components/PixelNav';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <PixelNav />

      <div className="pt-20 px-4 max-w-2xl mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="text-center mb-4">
            <span className="text-4xl">❓</span>
            <h1 className="font-pixel text-lg text-primary mario-glow mt-2">
              ABOUT DEVX
            </h1>
          </div>

          <div className="border-4 border-mario-brown bg-card p-6 space-y-4 relative overflow-hidden">
            {/* Question block accent */}
            <div className="absolute top-0 left-0 right-0 h-2 question-block" />

            <div className="font-mono text-sm text-muted-foreground leading-relaxed space-y-3 pt-2">
              <p className="text-secondary font-pixel text-[10px]">{'>'} PLAYER SELECT</p>
              <p>
                DevX is a crew of builders, hackers, and dreamers who create
                power-ups for developers everywhere.
              </p>
              <p>
                Every tool in our kingdom was born from a hackathon, a late-night
                coding session, or a "what if?" moment that couldn't wait.
              </p>
              <p className="text-accent font-pixel text-[10px]">
                "IT'S-A ME, DEVX!"
              </p>

              <div className="h-px bg-border my-4" />

              <p className="text-secondary font-pixel text-[10px]">{'>'} GAME STATS</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { label: 'TOOLS', value: '8+', icon: '🍄' },
                  { label: 'BUILDERS', value: '50+', icon: '🏃' },
                  { label: 'WORLDS', value: '4', icon: '🗺️' },
                  { label: 'POWER LEVEL', value: '∞', icon: '⭐' },
                ].map(stat => (
                  <div key={stat.label} className="border-2 border-border p-3 text-center bg-muted/30">
                    <span className="text-xl block mb-1">{stat.icon}</span>
                    <span className="font-pixel text-lg text-secondary block gold-glow">
                      {stat.value}
                    </span>
                    <span className="font-pixel text-[7px] text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border my-4" />

              <p className="text-secondary font-pixel text-[10px]">{'>'} MISSION</p>
              <p className="text-primary font-pixel text-[10px] leading-relaxed mario-glow text-center py-3">
                "BUILD COOL STUFF.<br/>SAVE THE PRINCESS.<br/>SHIP IT."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="brick-pattern h-4" />
      <div className="ground-pattern h-8" />
    </div>
  );
};

export default About;
