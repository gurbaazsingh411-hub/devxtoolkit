import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import PixelNav from '@/components/PixelNav';
import { ArrowLeft } from 'lucide-react';

const categoryIcons: Record<string, string> = {
    game: '🎮',
    experiment: '🧪',
    art: '🎨',
    other: '❓',
};

const ProjectPage = () => {
    const { id } = useParams();
    const project = projects.find(t => t.id === id);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="font-pixel text-purple-500 text-center">
                    <p className="text-lg mb-2">GAME OVER</p>
                    <p className="text-sm text-muted-foreground mb-4">PROJECT NOT FOUND</p>
                    <Link to="/" className="text-xs text-secondary hover:text-purple-400">
                        ← RETURN TO WORLD 1
                    </Link>
                </div>
            </div>
        );
    }

    const emoji = categoryIcons[project.category] || '👾';

    return (
        <div className="min-h-screen bg-background">
            <PixelNav />

            <div className="pt-20 px-4 max-w-4xl mx-auto pb-20">
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors mb-8 font-pixel text-[10px]">
                    <ArrowLeft className="w-3 h-3" />
                    BACK TO WORLD
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="border-2 border-border bg-card p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-purple-600" />

                        <div className="relative z-10 pt-2">
                            <span className="text-5xl mb-4 block animate-bounce">{emoji}</span>
                            <h1 className="font-pixel text-lg sm:text-2xl text-purple-500 mb-2">
                                {project.name.toUpperCase()}
                            </h1>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="font-pixel text-[8px] px-2 py-1 bg-muted text-muted-foreground border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-border bg-card">
                        <div className="font-pixel text-[8px] text-secondary px-3 py-1 border-b-2 border-border bg-muted flex items-center gap-2">
                            <span>🚀</span> LAUNCH SEQUENCE
                        </div>
                        <div
                            className="h-64 flex items-center justify-center relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #2a0a4a 0%, #4a1a7e 50%, #1a0a2a 90%, #000000 95%)',
                            }}
                        >
                            <div className="text-center relative z-10 text-white">
                                <p className="font-pixel text-[10px] mb-4">
                                    [ PREPARING TO LAUNCH ]
                                </p>
                                <div className="flex items-center justify-center gap-2 text-2xl animate-pulse">
                                    👾 🔥 🚀
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.a
                        href={project.url}
                        className="block text-center font-pixel text-sm py-4 border-4 border-purple-600 bg-purple-600 text-white transition-all hover:bg-purple-700 hover:scale-[1.02]"
                    >
                        👾 ENTER PROJECT 👾
                    </motion.a>
                </motion.div>
            </div>

            <div className="brick-pattern h-4" />
            <div className="ground-pattern h-8" />
        </div>
    );
};

export default ProjectPage;
