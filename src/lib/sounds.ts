// Mario-style 8-bit sound engine using Web Audio API

let audioCtx: AudioContext | null = null;
let musicPlaying = false;
let musicOscillators: OscillatorNode[] = [];
let musicGain: GainNode | null = null;
let musicInterval: ReturnType<typeof setTimeout> | null = null;

const getCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

const playTone = (
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15,
  delay = 0
) => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
};

// Classic Mario coin sound: B5 → E6
export const playCoinSound = () => {
  playTone(988, 0.08, 'square', 0.12);
  playTone(1319, 0.4, 'square', 0.12, 0.08);
};

// Mario jump sound: pitch sweep up
export const playJumpSound = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
};

// Power-up / 1-UP sound
export const playPowerUpSound = () => {
  const notes = [523, 659, 784, 1047, 1319, 1568];
  notes.forEach((freq, i) => {
    playTone(freq, 0.1, 'square', 0.1, i * 0.06);
  });
};

// Click / select sound
export const playClickSound = () => {
  playTone(660, 0.06, 'square', 0.08);
  playTone(880, 0.06, 'square', 0.08, 0.05);
};

// Pipe warp sound
export const playPipeSound = () => {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
};

// Boot / start sound — Mario theme opening notes (simplified)
export const playStartSound = () => {
  // E5, E5, rest, E5, rest, C5, E5, G5
  const melody: [number, number][] = [
    [659, 0], [659, 0.15], [659, 0.4], [523, 0.55],
    [659, 0.7], [784, 0.9],
  ];
  melody.forEach(([freq, delay]) => {
    playTone(freq, 0.12, 'square', 0.1, delay);
  });
};

// Background music — Mario overworld theme (simplified loop)
const marioMelody: [number, number][] = [
  // Bar 1
  [659, 0.15], [659, 0.15], [0, 0.15], [659, 0.15],
  [0, 0.15], [523, 0.15], [659, 0.15], [0, 0.15],
  // Bar 2
  [784, 0.3], [0, 0.3], [392, 0.3], [0, 0.3],
  // Bar 3
  [523, 0.2], [0, 0.1], [392, 0.2], [0, 0.1], [330, 0.2], [0, 0.1],
  // Bar 4
  [440, 0.15], [494, 0.15], [0, 0.1], [466, 0.15], [440, 0.15],
  // Bar 5
  [392, 0.13], [659, 0.13], [784, 0.13],
  [880, 0.15], [0, 0.1], [698, 0.15], [784, 0.15],
  // Bar 6
  [0, 0.1], [659, 0.15], [0, 0.1], [523, 0.15], [587, 0.15], [494, 0.15],
];

export const startBackgroundMusic = () => {
  if (musicPlaying) return;
  musicPlaying = true;

  const playLoop = () => {
    if (!musicPlaying) return;
    const ctx = getCtx();
    musicGain = ctx.createGain();
    musicGain.gain.setValueAtTime(0.04, ctx.currentTime);
    musicGain.connect(ctx.destination);

    let time = 0;
    marioMelody.forEach(([freq, dur]) => {
      if (freq > 0) {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(1, ctx.currentTime + time);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur * 0.9);
        osc.connect(noteGain);
        noteGain.connect(musicGain!);
        osc.start(ctx.currentTime + time);
        osc.stop(ctx.currentTime + time + dur);
        musicOscillators.push(osc);
      }
      time += dur;
    });

    musicInterval = setTimeout(() => {
      musicOscillators = [];
      if (musicPlaying) playLoop();
    }, time * 1000);
  };

  playLoop();
};

export const stopBackgroundMusic = () => {
  musicPlaying = false;
  musicOscillators.forEach(osc => {
    try { osc.stop(); } catch {}
  });
  musicOscillators = [];
  if (musicInterval) clearTimeout(musicInterval);
  musicInterval = null;
};

export const isMusicPlaying = () => musicPlaying;
