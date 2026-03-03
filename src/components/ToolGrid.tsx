import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { tools, categories } from '@/data/tools';
import { playCoinSound, playClickSound, playPipeSound } from '@/lib/sounds';

const categoryIcons: Record<string, string> = {
  ai: '🍄',
  web: '⭐',
  hackathon: '🔥',
  utility: '🔧',
};

const ToolGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  const filtered = activeCategory === 'all'
    ? tools
    : tools.filter(t => t.category === activeCategory);

  return (
    <div className="px-4 pb-20">
      {/* Category filter - styled as Mario world select */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
            className={`px-4 py-2 font-pixel text-[8px] sm:text-[10px] transition-all border-2 ${
              activeCategory === cat.id
                ? 'question-block text-secondary-foreground border-mario-brown'
                : 'bg-card text-foreground hover:border-secondary border-border'
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Tool cards as question blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {filtered.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => playCoinSound()}
            onClick={() => { playPipeSound(); navigate(`/tool/${tool.id}`); }}
            className="cursor-pointer group"
          >
            <div className="bg-card border-2 border-border p-4 relative overflow-hidden transition-all group-hover:border-secondary">
              {/* Question block header */}
              <div
                className="h-28 mb-3 flex items-center justify-center relative question-block"
              >
                {/* ? symbol background */}
                <span className="absolute text-6xl opacity-10 font-pixel text-mario-brown">?</span>
                <span className="text-4xl relative z-10 group-hover:animate-bounce-mario">
                  {categoryIcons[tool.category] || '🍄'}
                </span>

                {/* Coin pop on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg animate-coin-spin inline-block">🪙</span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-pixel text-[10px] text-primary mb-2 leading-relaxed mario-glow">
                {tool.name.toUpperCase()}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {tool.description}
              </p>

              {/* Tags as power-up items */}
              <div className="flex flex-wrap gap-1 mb-3">
                {tool.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[8px] px-1.5 py-0.5 bg-muted text-muted-foreground font-pixel border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Press Start button */}
              <div className="font-pixel text-[8px] text-center py-2 border-2 border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                ▶ PRESS START
              </div>

              {/* Version */}
              <div className="absolute top-2 right-2 font-pixel text-[7px] text-muted-foreground bg-card/80 px-1">
                v{tool.version}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolGrid;
