import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tools } from '@/data/tools';
import PixelNav from '@/components/PixelNav';
import { ArrowLeft } from 'lucide-react';

const categoryIcons: Record<string, string> = {
  ai: '🍄',
  web: '⭐',
  hackathon: '🔥',
  utility: '🔧',
};

const ToolPage = () => {
  const { id } = useParams();
  const tool = tools.find(t => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-pixel text-primary text-center">
          <p className="text-lg mb-2">GAME OVER</p>
          <p className="text-sm text-muted-foreground mb-4">TOOL NOT FOUND</p>
          <Link to="/" className="text-xs text-secondary hover:text-primary">
            ← RETURN TO WORLD 1
          </Link>
        </div>
      </div>
    );
  }

  const emoji = categoryIcons[tool.category] || '🍄';

  return (
    <div className="min-h-screen bg-background">
      <PixelNav />

      <div className="pt-20 px-4 max-w-4xl mx-auto pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-pixel text-[10px]">
          <ArrowLeft className="w-3 h-3" />
          BACK TO WORLD
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Tool header - Question block style */}
          <div className="border-2 border-border bg-card p-6 relative overflow-hidden">
            {/* Question block accent */}
            <div className="absolute top-0 left-0 right-0 h-2 question-block" />

            <div className="relative z-10 pt-2">
              <span className="text-5xl mb-4 block animate-float">{emoji}</span>
              <h1 className="font-pixel text-lg sm:text-2xl text-primary mario-glow mb-2">
                {tool.name.toUpperCase()}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tool.tags.map(tag => (
                  <span key={tag} className="font-pixel text-[8px] px-2 py-1 bg-muted text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Demo area - looks like a game screen */}
          <div className="border-2 border-border bg-card">
            <div className="font-pixel text-[8px] text-secondary px-3 py-1 border-b-2 border-border bg-muted flex items-center gap-2">
              <span>🎮</span> DEMO SCREEN
            </div>
            <div
              className="h-64 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a2a5e 0%, #2a3a7e 50%, #228B22 90%, #8B4513 95%)',
              }}
            >
              {/* Clouds */}
              <div className="absolute top-6 left-10 text-2xl opacity-50">☁️</div>
              <div className="absolute top-10 right-16 text-xl opacity-40">☁️</div>

              <div className="text-center relative z-10">
                <p className="font-pixel text-[10px] text-foreground mb-4">
                  [ COMING SOON ]
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl animate-coin-spin inline-block">🪙</span>
                  <span className="text-2xl animate-coin-spin inline-block" style={{ animationDelay: '0.2s' }}>🪙</span>
                  <span className="text-2xl animate-coin-spin inline-block" style={{ animationDelay: '0.4s' }}>🪙</span>
                </div>
              </div>

              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-6 brick-pattern" />
            </div>
          </div>

          {/* Dev Notes - styled as game manual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-border bg-card p-4">
              <h3 className="font-pixel text-[10px] text-secondary mb-3 gold-glow flex items-center gap-2">
                <span>📋</span> POWER-UP INFO
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>▸ Built by DevX Crew</p>
                <p>▸ Version: {tool.version}</p>
                <p>▸ World: {tool.category.toUpperCase()}</p>
                <p>▸ Status: <span className="text-mario-green">ACTIVE</span></p>
              </div>
            </div>

            <div className="border-2 border-border bg-card p-4">
              <h3 className="font-pixel text-[10px] text-accent mb-3 flex items-center gap-2">
                <span>⭐</span> CHANGELOG
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>▸ v{tool.version} - Latest power-up</p>
                <p>▸ New abilities unlocked</p>
                <p>▸ Pixel UI overhaul</p>
                <p>▸ Boss bugs defeated</p>
              </div>
            </div>
          </div>

          {/* Launch button */}
          <motion.a
            href={tool.url}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="block text-center font-pixel text-sm py-4 border-4 border-primary bg-primary text-primary-foreground transition-all hover:bg-primary/90 animate-pulse-glow"
          >
            🍄 ENTER TOOL 🍄
          </motion.a>
        </motion.div>
      </div>

      {/* Ground */}
      <div className="brick-pattern h-4" />
      <div className="ground-pattern h-8" />
    </div>
  );
};

export default ToolPage;
