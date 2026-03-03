export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'ai' | 'web' | 'utility' | 'hackathon';
  version: string;
  url: string;
  color: string;
  tags: string[];
}

export const tools: Tool[] = [
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Instantly generate high-quality QR codes from any website link.',
    category: 'utility',
    version: '1.0.0',
    url: 'https://qrcodedevx.netlify.app',
    color: '#00FFFF',
    tags: ['QR Code', 'Utility', 'Generator'],
  },
  {
    id: 'devx-ai-assistant',
    name: 'AI Assistant',
    description: 'An intelligent coding companion that helps you debug, refactor, and ship faster. Powered by cutting-edge LLMs.',
    category: 'ai',
    version: '2.1.0',
    url: '#',
    color: '#00FF88',
    tags: ['AI', 'Productivity', 'Code'],
  },
  {
    id: 'pixel-deploy',
    name: 'Pixel Deploy',
    description: 'One-click deployment pipeline for hackathon projects. Zero config, maximum speed.',
    category: 'web',
    version: '1.4.2',
    url: '#',
    color: '#00C3FF',
    tags: ['DevOps', 'Deploy', 'CI/CD'],
  },
  {
    id: 'hack-timer',
    name: 'Hack Timer',
    description: 'The ultimate hackathon countdown timer with team sync, milestone tracking, and submission alerts.',
    category: 'hackathon',
    version: '3.0.0',
    url: '#',
    color: '#9D4EDD',
    tags: ['Hackathon', 'Timer', 'Team'],
  },
  {
    id: 'code-arena',
    name: 'Code Arena',
    description: 'Competitive coding challenges with real-time leaderboards. Battle other devs in timed rounds.',
    category: 'utility',
    version: '1.2.0',
    url: '#',
    color: '#FF3366',
    tags: ['Competition', 'Code', 'Gaming'],
  },
  {
    id: 'api-forge',
    name: 'API Forge',
    description: 'Generate mock APIs instantly. Perfect for frontend devs who can\'t wait for the backend.',
    category: 'web',
    version: '2.0.1',
    url: '#',
    color: '#00FF88',
    tags: ['API', 'Mock', 'Backend'],
  },
  {
    id: 'neural-sketch',
    name: 'Neural Sketch',
    description: 'Draw UI wireframes and watch AI turn them into production-ready components.',
    category: 'ai',
    version: '0.9.0',
    url: '#',
    color: '#00C3FF',
    tags: ['AI', 'Design', 'UI'],
  },
  {
    id: 'git-quest',
    name: 'Git Quest',
    description: 'Learn Git through an RPG adventure. Complete quests, earn XP, master version control.',
    category: 'utility',
    version: '1.5.3',
    url: '#',
    color: '#9D4EDD',
    tags: ['Education', 'Git', 'RPG'],
  },
  {
    id: 'team-radar',
    name: 'Team Radar',
    description: 'Find the perfect hackathon teammates based on skills, availability, and vibe.',
    category: 'hackathon',
    version: '1.1.0',
    url: '#',
    color: '#FF3366',
    tags: ['Team', 'Hackathon', 'Social'],
  },
];

export const categories = [
  { id: 'all', name: 'ALL TOOLS', icon: '🍄' },
  { id: 'ai', name: 'AI KINGDOM', icon: '🧠' },
  { id: 'web', name: 'STAR ROAD', icon: '⭐' },
  { id: 'utility', name: 'PIPE MAZE', icon: '🟢' },
  { id: 'hackathon', name: 'FIRE WORLD', icon: '🔥' },
];
