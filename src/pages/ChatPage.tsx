import { useEffect, useMemo, useRef, useState } from "react";
import { CHATROOMS } from "../data/genres";
import { useApp } from "../context/AppContext";

const SEED: Record<string, { user: string; text: string }[]> = {
  gatekeeper: [
    { user: "archivist", text: "Name three deep cuts or leave." },
    { user: "vinyl_judge", text: "If your top artist is on TikTok, silence." },
  ],
  "prog-metal": [
    { user: "polyrhythm", text: "Anyone else counting in 17?" },
    { user: "fretless", text: "Haken tour rumor thread…" },
  ],
  "lo-fi": [
    { user: "rainloop", text: "Best rainy-day playlist drops here." },
  ],
  "80s-pop": [
    { user: "neon", text: "Depeche Mode or New Order — pick a side." },
  ],
};

export function ChatPage() {
  const { profile, setIs18, sendChat } = useApp();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [agePrompt, setAgePrompt] = useState(!profile?.is18);
  const endRef = useRef<HTMLDivElement>(null);

  const room = CHATROOMS.find((r) => r.id === roomId) ?? null;

  const messages = useMemo(() => {
    if (!room) return [];
    const seeded = (SEED[room.id] ?? [{ user: "host", text: `Welcome to ${room.name}.` }]).map(
      (m, i) => ({
        id: `seed-${room.id}-${i}`,
        user: m.user,
        text: m.text,
        at: Date.now() - 600000 + i * 1000,
      }),
    );
    const mine = profile?.chatMessages[room.id] ?? [];
    return [...seeded, ...mine];
  }, [room, profile?.chatMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, roomId]);

  if (agePrompt) {
    return (
      <div className="age-gate">
        <p className="brand-mark sm">AUX CULT</p>
        <h1>Chatrooms are 18+</h1>
        <p className="lede">
          Confirm you are at least 18 years old to enter community chats.
        </p>
        <div className="age-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() => {
              setIs18(true);
              setAgePrompt(false);
            }}
          >
            I am 18 or older
          </button>
          <p className="sample-note">If you are under 18, chatrooms stay locked. Use Reels, Shows, and Profile instead.</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="chat-lobby">
        <header className="page-header">
          <p className="brand-mark sm">AUX CULT</p>
          <h1>Chatrooms</h1>
          <p className="lede">Genre rooms, subgenres, and the Gatekeeper.</p>
        </header>
        <div className="room-grid">
          {CHATROOMS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`room-card ${r.gatekeeper ? "gatekeeper" : ""}`}
              onClick={() => setRoomId(r.id)}
            >
              <strong>{r.name}</strong>
              <span>{r.description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const gk = !!room.gatekeeper;

  return (
    <div className={`chat-room ${gk ? "gatekeeper-theme" : ""}`}>
      <header className="chat-head">
        <button type="button" className="back" onClick={() => setRoomId(null)}>
          ←
        </button>
        <div>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
        </div>
      </header>
      <div className="chat-stream">
        {messages.map((m) => (
          <div key={m.id} className={`bubble ${m.user === profile?.username ? "mine" : ""}`}>
            <strong>@{m.user}</strong>
            <p>{m.text}</p>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="chat-compose"
        onSubmit={(e) => {
          e.preventDefault();
          sendChat(room.id, draft);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={gk ? "Speak carefully…" : "Message the room"}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
