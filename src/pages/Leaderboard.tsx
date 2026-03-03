import { motion } from 'framer-motion';
import PixelNav from '@/components/PixelNav';
import { tools } from '@/data/tools';

const mockLeaderboard = tools
  .map(t => ({ ...t, score: Math.floor(Math.random() * 5000) + 500 }))
  .sort((a, b) => b.score - a.score);

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <PixelNav />

      <div className="pt-20 px-4 max-w-2xl mx-auto pb-20">
        <div className="text-center mb-8">
          <span className="text-3xl">🏆</span>
          <h1 className="font-pixel text-lg text-secondary gold-glow mt-2">
            HIGH SCORES
          </h1>
          <p className="font-pixel text-[8px] text-muted-foreground mt-2">
            TOP TOOLS IN THE MUSHROOM KINGDOM
          </p>
        </div>

        <div className="border-4 border-mario-brown bg-card">
          {/* Header */}
          <div className="question-block grid grid-cols-[40px_1fr_80px] gap-2 px-4 py-2 font-pixel text-[8px] text-secondary-foreground">
            <span>RNK</span>
            <span>TOOL</span>
            <span className="text-right">PTS</span>
          </div>

          {/* Rows */}
          {mockLeaderboard.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`grid grid-cols-[40px_1fr_80px] gap-2 px-4 py-3 items-center border-b border-border ${
                i === 0 ? 'bg-secondary/10' : ''
              }`}
            >
              <span className="font-pixel text-[10px]">
                {i === 0 ? '🍄' : i === 1 ? '⭐' : i === 2 ? '🔥' : `${i + 1}`}
              </span>
              <div>
                <span className="font-pixel text-[9px] text-foreground">{tool.name.toUpperCase()}</span>
                <span className="block text-[10px] text-muted-foreground">{tool.category}</span>
              </div>
              <span className="font-pixel text-[10px] text-right text-secondary">
                {tool.score.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="brick-pattern h-4" />
      <div className="ground-pattern h-8" />
    </div>
  );
};

export default Leaderboard;
