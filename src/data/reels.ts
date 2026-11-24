export type Reel = {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  caption: string;
  gradient: [string, string, string];
  bpm: number;
  waveform: "prog" | "metal" | "chill" | "pop" | "punk" | "electronic";
  likes: number;
  comments: { id: string; user: string; text: string }[];
};

export const REELS: Reel[] = [
  {
    id: "r1",
    title: "21/8 Overture",
    artist: "Crimson Transit",
    genres: ["prog-rock", "art-rock"],
    caption: "When the time signature becomes the hook.",
    gradient: ["#1a0a2e", "#4a1942", "#e8ff47"],
    bpm: 112,
    waveform: "prog",
    likes: 2401,
    comments: [
      { id: "c1", user: "fretwizard", text: "That modulation though" },
      { id: "c2", user: "yesfan72", text: "Side 2 energy" },
    ],
  },
  {
    id: "r2",
    title: "Lattice Breakdown",
    artist: "Mesh Room",
    genres: ["prog-metal", "djent"],
    caption: "Low tuned and surgically precise.",
    gradient: ["#0a0a0b", "#1b4332", "#00e676"],
    bpm: 140,
    waveform: "metal",
    likes: 5102,
    comments: [{ id: "c3", user: "thall", text: "THALL" }],
  },
  {
    id: "r3",
    title: "Velvet Haze",
    artist: "Lantern Bloom",
    genres: ["psychedelic-rock", "indie"],
    caption: "Analog swirl for late drives.",
    gradient: ["#2d1b4e", "#ff6d00", "#ffd54f"],
    bpm: 96,
    waveform: "chill",
    likes: 1890,
    comments: [{ id: "c4", user: "haze", text: "headphones required" }],
  },
  {
    id: "r4",
    title: "Chrome Chorus",
    artist: "Night Arcade",
    genres: ["80s-pop", "synthwave"],
    caption: "Neon refrains, zero irony.",
    gradient: ["#0a1628", "#ff1744", "#40c4ff"],
    bpm: 118,
    waveform: "pop",
    likes: 3340,
    comments: [{ id: "c5", user: "retro", text: "this is pure 1985" }],
  },
  {
    id: "r5",
    title: "Rain Window Beats",
    artist: "Study Cat",
    genres: ["lo-fi", "jazz"],
    caption: "Soft drums, softer keys.",
    gradient: ["#1c1917", "#78716c", "#fbbf24"],
    bpm: 78,
    waveform: "chill",
    likes: 9200,
    comments: [{ id: "c6", user: "focus", text: "on loop for 3 hours" }],
  },
  {
    id: "r6",
    title: "Pit Protocol",
    artist: "Knock Circuit",
    genres: ["metalcore", "hardcore"],
    caption: "Open the floor carefully.",
    gradient: ["#450a0a", "#dc2626", "#fafafa"],
    bpm: 160,
    waveform: "metal",
    likes: 4100,
    comments: [{ id: "c7", user: "pit", text: "PICKUP THE CROWD KILLER" }],
  },
  {
    id: "r7",
    title: "Cathedral Growl",
    artist: "Ossuary",
    genres: ["death-metal"],
    caption: "Blast beats in stained glass.",
    gradient: ["#0c0a09", "#44403c", "#a8a29e"],
    bpm: 190,
    waveform: "metal",
    likes: 2200,
    comments: [{ id: "c8", user: "guttural", text: "riffs from the crypt" }],
  },
  {
    id: "r8",
    title: "Fog Machine Ballad",
    artist: "Stage Left",
    genres: ["70s-rock", "hard-rock"],
    caption: "Les Paul, open E, no notes wasted.",
    gradient: ["#451a03", "#b45309", "#fde68a"],
    bpm: 104,
    waveform: "prog",
    likes: 1560,
    comments: [{ id: "c9", user: "vintage", text: "smells like tape hiss" }],
  },
  {
    id: "r9",
    title: "Grid Runner",
    artist: "Pulse Dock",
    genres: ["electronic", "techno"],
    caption: "Four-on-the-floor until sunrise.",
    gradient: ["#020617", "#6366f1", "#22d3ee"],
    bpm: 128,
    waveform: "electronic",
    likes: 6700,
    comments: [{ id: "c10", user: "deck", text: "warehouse approved" }],
  },
  {
    id: "r10",
    title: "Spit & Sugar",
    artist: "Safety Pin",
    genres: ["punk", "pop-punk"],
    caption: "90 seconds. No encore needed.",
    gradient: ["#18181b", "#f43f5e", "#fafafa"],
    bpm: 178,
    waveform: "punk",
    likes: 3011,
    comments: [{ id: "c11", user: "spike", text: "THREE CHORDS FOREVER" }],
  },
  {
    id: "r11",
    title: "Odd Meter Garden",
    artist: "Haken Path",
    genres: ["prog-metal", "prog-rock"],
    caption: "Gardening in 15/8.",
    gradient: ["#052e16", "#86efac", "#fef08a"],
    bpm: 126,
    waveform: "prog",
    likes: 2800,
    comments: [{ id: "c12", user: "poly", text: "counted it twice" }],
  },
  {
    id: "r12",
    title: "Wall of Blush",
    artist: "Soft Pedal",
    genres: ["shoegaze", "indie"],
    caption: "Melody buried in glitter.",
    gradient: ["#4c1d95", "#f0abfc", "#fda4af"],
    bpm: 88,
    waveform: "chill",
    likes: 4450,
    comments: [{ id: "c13", user: "gaze", text: "can't see the stage, perfect" }],
  },
  {
    id: "r13",
    title: "Moonwalk Groove",
    artist: "Mirror Ball",
    genres: ["pop", "80s-pop", "rnb"],
    caption: "Glove optional. Groove mandatory.",
    gradient: ["#111827", "#fbbf24", "#f472b6"],
    bpm: 113,
    waveform: "pop",
    likes: 12040,
    comments: [{ id: "c14", user: "king", text: "smooth criminal energy" }],
  },
  {
    id: "r14",
    title: "Black Ice Ritual",
    artist: "Gate Choir",
    genres: ["black-metal"],
    caption: "Tremolo until the trees answer.",
    gradient: ["#000000", "#1f2937", "#e5e7eb"],
    bpm: 200,
    waveform: "metal",
    likes: 990,
    comments: [{ id: "c15", user: "frost", text: "kvlt" }],
  },
  {
    id: "r15",
    title: "Motorik Mile",
    artist: "Autobahn Kids",
    genres: ["krautrock", "electronic"],
    caption: "The road never ends.",
    gradient: ["#0f172a", "#94a3b8", "#ef4444"],
    bpm: 120,
    waveform: "electronic",
    likes: 2100,
    comments: [{ id: "c16", user: "neu", text: "hypnotic" }],
  },
  {
    id: "r16",
    title: "Clean / Heavy",
    artist: "Architect Line",
    genres: ["metalcore", "prog-metal"],
    caption: "Whiplash dynamics, on purpose.",
    gradient: ["#0c4a6e", "#38bdf8", "#f8fafc"],
    bpm: 150,
    waveform: "metal",
    likes: 5600,
    comments: [{ id: "c17", user: "core", text: "chorus hit different" }],
  },
  {
    id: "r17",
    title: "Dust Bowl Shuffle",
    artist: "Delta Static",
    genres: ["blues-rock", "70s-rock"],
    caption: "Bottle neck and amp hum.",
    gradient: ["#292524", "#a8a29e", "#f59e0b"],
    bpm: 92,
    waveform: "prog",
    likes: 870,
    comments: [{ id: "c18", user: "slide", text: "feel that room mic" }],
  },
  {
    id: "r18",
    title: "Future Bloom",
    artist: "Flume State",
    genres: ["future-bass", "electronic"],
    caption: "Glitter drops inbound.",
    gradient: ["#083344", "#22d3ee", "#f472b6"],
    bpm: 140,
    waveform: "electronic",
    likes: 7800,
    comments: [{ id: "c19", user: "bass", text: "festival ready" }],
  },
];

export function rankReels(genreScores: Record<string, number>): Reel[] {
  const scored = REELS.map((reel) => {
    let score = 0;
    for (const g of reel.genres) score += (genreScores[g] ?? 0) * 10;
    score += Math.random() * 3;
    return { reel, score };
  });
  scored.sort((a, b) => b.score - a.score);
  // Keep some variety: inject a few lower-ranked items
  const top = scored.slice(0, 12).map((s) => s.reel);
  const rest = scored.slice(12).map((s) => s.reel);
  const mixed = [...top];
  for (let i = 0; i < Math.min(4, rest.length); i++) {
    mixed.splice(2 + i * 3, 0, rest[i]);
  }
  return mixed;
}
