export type PixelCharacter = {
  id: string;
  name: string;
  tags: string[];
  colors: [string, string, string, string];
  popular?: boolean;
};

const PALETTES: [string, string, string, string][] = [
  ["#1a1a1a", "#e8e8e8", "#ff3d6e", "#c0c0c0"],
  ["#0d0d0d", "#f5f5f5", "#e8ff47", "#666666"],
  ["#1c0a0a", "#d4a017", "#8b0000", "#2a2a2a"],
  ["#0a1628", "#4fc3f7", "#ff1744", "#ffffff"],
  ["#2d1b4e", "#b388ff", "#ffd54f", "#1a1a2e"],
  ["#0f2027", "#00e676", "#ff6d00", "#eceff1"],
  ["#3e2723", "#ffab91", "#5d4037", "#fff8e1"],
  ["#004d40", "#1de9b6", "#ffea00", "#263238"],
  ["#311b92", "#ea80fc", "#18ffff", "#fafafa"],
  ["#bf360c", "#ff6e40", "#212121", "#ffe082"],
  ["#01579b", "#40c4ff", "#ff4081", "#eceff1"],
  ["#1b5e20", "#69f0ae", "#ff1744", "#f5f5f5"],
  ["#880e4f", "#f48fb1", "#ce93d8", "#1a1a1a"],
  ["#37474f", "#90a4ae", "#ff5252", "#eceff1"],
  ["#4a148c", "#e040fb", "#00e5ff", "#212121"],
];

const NAMED: { name: string; tags: string[]; popular?: boolean; palette?: number }[] = [
  { name: "KISS Star", tags: ["rock", "glam"], popular: true, palette: 0 },
  { name: "Venom", tags: ["metal", "black"], popular: true, palette: 1 },
  { name: "Rock Star", tags: ["rock"], popular: true, palette: 2 },
  { name: "Pop Star", tags: ["pop"], popular: true, palette: 3 },
  { name: "Michael Jackson", tags: ["pop", "icon"], popular: true, palette: 0 },
  { name: "Hetfield", tags: ["metal", "thrash"], popular: true, palette: 1 },
  { name: "Dave Mustaine", tags: ["metal", "thrash"], popular: true, palette: 2 },
  { name: "King Crimson", tags: ["prog"], popular: true, palette: 4 },
  { name: "Motörhead", tags: ["metal", "rock"], popular: true, palette: 0 },
  { name: "Yes", tags: ["prog"], popular: true, palette: 5 },
  { name: "Led Zeppelin", tags: ["rock", "70s"], popular: true, palette: 2 },
  { name: "Sonic", tags: ["game", "fun"], popular: true, palette: 3 },
  { name: "SpongeBob", tags: ["fun", "cartoon"], popular: true, palette: 9 },
  { name: "Batman", tags: ["hero"], popular: true, palette: 0 },
  { name: "Spider-Man", tags: ["hero"], popular: true, palette: 10 },
  { name: "Groot", tags: ["hero", "fun"], popular: true, palette: 11 },
  { name: "Freddie", tags: ["rock", "icon"], popular: true, palette: 9 },
  { name: "Bowie Star", tags: ["art-rock"], popular: true, palette: 4 },
  { name: "Ozzy", tags: ["metal"], popular: true, palette: 1 },
  { name: "Dio Horns", tags: ["metal"], popular: true, palette: 2 },
  { name: "Punk Spike", tags: ["punk"], popular: true, palette: 12 },
  { name: "Raver", tags: ["electronic"], popular: true, palette: 8 },
  { name: "Lo-Fi Cat", tags: ["lo-fi"], popular: true, palette: 6 },
  { name: "Jazz Fox", tags: ["jazz"], popular: true, palette: 6 },
  { name: "Synth Wave", tags: ["80s"], popular: true, palette: 8 },
];

const EXTRA_NAMES = [
  "Pixel Slash", "Amp Fiend", "Stage Diver", "Vinyl Ghost", "Bass Witch",
  "Cymbal Kid", "Fretboard", "Mic Drop", "Tour Bus", "Backline",
  "Glowstick", "Mosh Pixie", "Encore", "Setlist", "Rider",
  "Green Room", "Soundcheck", "Roadie", "Pyro", "Fog Machine",
  "Wig Out", "Glam Fang", "Thrash Turtle", "Doom Owl", "Prog Squid",
  "Death Crow", "Core Wolf", "Shoegaze Moth", "Post-Rock Deer", "Indie Finch",
  "Grunge Toad", "Emo Raven", "Hardcore Ant", "Garage Rat", "Surf Crab",
  "Disco Bee", "Funk Frog", "Soul Dove", "RnB Panther", "Hip-Hop Lynx",
  "Trap Bunny", "Drill Hawk", "Afrobeat Lion", "Reggae Sun", "Dub Echo",
  "Ambient Cloud", "IDM Glitch", "House Pulse", "Techno Grid", "Drum n Bass",
  "Breakbeat", "Future Bass", "Vaporwave", "Chillwave", "Darkwave",
  "New Wave", "No Wave", "Kraut Bot", "Math Rock", "Noise Cat",
  "Drone Bear", "Folk Sprite", "Bluegrass", "Country Star", "Outlaw",
  "Blues Hound", "Delta Ghost", "Gospel Choir", "Opera Mask", "Ballet Punk",
  "Comic Hero", "Pixel Knight", "Neon Ninja", "Space Cadet", "Alien DJ",
  "Robot Drummer", "Cyborb", "Mecha Vocal", "Pixel Pirate", "Skater Kid",
  "BMX Bandit", "Skate Witch", "Graffiti", "Stencil", "Sticker Bomb",
  "Ticket Stub", "Wristband", "Lanyard", "Pit Pass", "VIP Ghost",
  "Opener", "Headliner", "Support Act", "Session Ace", "Sideman",
  "Frontman", "Frontwoman", "Beatbox", "MC Pixel", "Turntable",
  "Sampler", "808 Heart", "909 Pulse", "Modular", "Patch Cable",
  "Aux Cord", "Jack Plug", "Phantom Power", "DI Box", "Monitor Mix",
  "In-Ear", "Click Track", "Metronome", "Capo Kid", "Slide King",
  "Wah Pedal", "Fuzz Face", "Overdrive", "Reverb Hall", "Delay Loop",
  "Chorus Angel", "Flanger", "Phaser", "Tremolo", "Compressor",
  "Limiter", "EQ Smile", "High Pass", "Low End", "Mid Scoop",
  "Stereo Field", "Mono Club", "Quad Stack", "Wall of Amps", "Stack Attack",
  "Double Kick", "Blast Beat", "Ghost Note", "Palm Mute", "Tapping",
  "Sweep Pick", "Fingerstyle", "Slap Bass", "Upright", "Keys Wizard",
  "Synth Lead", "Pad Cloud", "Arp Runner", "Sequence", "Loop Station",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export const CHARACTERS: PixelCharacter[] = (() => {
  const list: PixelCharacter[] = NAMED.map((n, i) => ({
    id: `char-${i}`,
    name: n.name,
    tags: n.tags,
    colors: PALETTES[n.palette ?? i % PALETTES.length],
    popular: n.popular,
  }));
  let i = list.length;
  for (const name of EXTRA_NAMES) {
    if (list.length >= 150) break;
    const h = hash(name);
    list.push({
      id: `char-${i}`,
      name,
      tags: ["random"],
      colors: PALETTES[h % PALETTES.length],
      popular: false,
    });
    i++;
  }
  while (list.length < 150) {
    const n = list.length + 1;
    list.push({
      id: `char-${list.length}`,
      name: `Cultist ${n}`,
      tags: ["random"],
      colors: PALETTES[n % PALETTES.length],
    });
  }
  return list.slice(0, 150);
})();
