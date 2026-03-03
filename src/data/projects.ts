export interface Project {
    id: string;
    name: string;
    description: string;
    category: 'game' | 'experiment' | 'art' | 'other';
    version: string;
    url: string;
    color: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: 'devx-holi',
        name: 'DevX Holi',
        description: 'A colorful holi shooter game.',
        category: 'game',
        version: '1.0.0',
        url: 'https://devxholi.netlify.app',
        color: '#FF00FF',
        tags: ['Game', 'Shooter', 'Holi', 'Chaos'],
    },
    {
        id: 'grim-date',
        name: 'Grim Date',
        description: 'A dating game made for when people are dead.',
        category: 'game',
        version: '1.0.0',
        url: 'https://grimdategame.netlify.app/',
        color: '#FF0000',
        tags: ['Game', 'Dating', 'Chaos', 'Dead'],
    },
    {
        id: 'crazy-canvas',
        name: 'Crazy Canvas',
        description: 'An infinite public canvas where anyone can draw a single pixel per minute.',
        category: 'experiment',
        version: '1.0.0',
        url: '#',
        color: '#FF00FF',
        tags: ['Art', 'Public', 'Chaos'],
    },
    {
        id: 'flappy-dev',
        name: 'Flappy Dev',
        description: 'Avoid the bugs and merge conflicts in this frustratingly addictive clone.',
        category: 'game',
        version: '2.1.0',
        url: '#',
        color: '#FFFF00',
        tags: ['Game', 'Frustration', 'Fun'],
    },
    {
        id: 'random-walk',
        name: 'Random Walk',
        description: 'A visualizer for various random walk algorithms in 2D space.',
        category: 'art',
        version: '0.9.5',
        url: '#',
        color: '#00FFFF',
        tags: ['Math', 'Art', 'Generative'],
    }
];

export const projectCategories = [
    { id: 'all', name: 'ALL PROJECTS', icon: '👾' },
    { id: 'game', name: 'GAMES', icon: '🎮' },
    { id: 'experiment', name: 'WEIRD STUFF', icon: '🧪' },
    { id: 'art', name: 'PIXELS', icon: '🎨' },
    { id: 'other', name: '???', icon: '❓' },
];
