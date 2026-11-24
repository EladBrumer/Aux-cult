import { useMemo, useState } from "react";
import { ARTISTS } from "../data/artists";
import { useApp } from "../context/AppContext";

export function OnboardingPage() {
  const { completeOnboarding } = useApp();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ARTISTS;
    return ARTISTS.filter(
      (a) => a.name.toLowerCase().includes(q) || a.genres.some((g) => g.includes(q)),
    );
  }, [query]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 10) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="onboard-screen">
      <header className="onboard-header">
        <p className="brand-mark sm">AUX CULT</p>
        <h1>Who are you listening to?</h1>
        <p className="lede">Pick up to 10 artists. This tunes your reels and show suggestions.</p>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists or genres"
        />
        <p className="pick-count">{selected.length} / 10 selected</p>
      </header>

      <div className="artist-grid">
        {filtered.map((a) => {
          const on = selected.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              className={`artist-chip ${on ? "on" : ""}`}
              onClick={() => toggle(a.id)}
            >
              <span className="artist-initial">{a.name.slice(0, 1)}</span>
              <span className="artist-meta">
                <strong>{a.name}</strong>
                <small>{a.genres.slice(0, 2).join(" · ")}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="onboard-footer">
        <button
          type="button"
          className="primary-btn"
          disabled={selected.length === 0}
          onClick={() => completeOnboarding(selected)}
        >
          Continue
        </button>
        <button type="button" className="skip-btn" onClick={() => completeOnboarding([])}>
          Skip for now
        </button>
      </div>
    </div>
  );
}
