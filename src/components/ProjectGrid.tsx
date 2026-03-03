import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects, projectCategories } from '@/data/projects';
import { playCoinSound, playClickSound, playPipeSound } from '@/lib/sounds';

const categoryIcons: Record<string, string> = {
    game: '🎮',
    experiment: '🧪',
    art: '🎨',
    other: '❓',
};

const ProjectGrid = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const navigate = useNavigate();

    const filtered = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="px-4 pb-20">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
                {projectCategories.map((cat) => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { playClickSound(); setActiveCategory(cat.id); }}
                        className={`px-4 py-2 font-pixel text-[8px] sm:text-[10px] transition-all border-2 ${activeCategory === cat.id
                                ? 'question-block text-secondary-foreground border-purple-600'
                                : 'bg-card text-foreground hover:border-purple-400 border-border'
                            }`}
                    >
                        <span className="mr-1">{cat.icon}</span>
                        {cat.name}
                    </motion.button>
                ))}
            </div>

            {/* Project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {filtered.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -8 }}
                        onHoverStart={() => playCoinSound()}
                        onClick={() => { playPipeSound(); navigate(`/project/${project.id}`); }}
                        className="cursor-pointer group"
                    >
                        <div className="bg-card border-2 border-border p-4 relative overflow-hidden transition-all group-hover:border-purple-500">
                            {/* Header */}
                            <div className="h-28 mb-3 flex items-center justify-center relative bg-muted border border-border group-hover:bg-purple-900 transition-colors">
                                <span className="text-5xl relative z-10 group-hover:animate-pulse">
                                    {categoryIcons[project.category] || '👾'}
                                </span>

                                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                                    <span className="text-xl inline-block animate-spin">✨</span>
                                </div>
                            </div>

                            {/* Info */}
                            <h3 className="font-pixel text-[10px] text-purple-400 mb-2 leading-relaxed">
                                {project.name.toUpperCase()}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-[8px] px-1.5 py-0.5 bg-muted text-muted-foreground font-pixel border border-border"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action */}
                            <div className="font-pixel text-[8px] text-center py-2 border-2 border-border group-hover:border-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                ▶ EXPLORE
                            </div>

                            {/* Version */}
                            <div className="absolute top-2 right-2 font-pixel text-[7px] text-muted-foreground bg-card/80 px-1">
                                v{project.version}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
