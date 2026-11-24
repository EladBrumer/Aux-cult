import { useMemo, useState } from "react";
import { genreScoreFromArtists } from "../data/artists";
import {
  haversineMiles,
  LOCATIONS,
  SAMPLE_SHOWS,
  type Show,
} from "../data/shows";
import { useApp } from "../context/AppContext";

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ShowsPage() {
  const { profile, toggleSaveShow } = useApp();
  const [radius, setRadius] = useState(100);
  const [locationId, setLocationId] = useState("nyc");
  const [custom, setCustom] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [view, setView] = useState<"all" | "yours" | "saved">("all");

  const location = LOCATIONS.find((l) => l.id === locationId) ?? LOCATIONS[0];
  const scores = genreScoreFromArtists(profile?.artists ?? []);

  const enriched = useMemo(() => {
    return SAMPLE_SHOWS.map((show) => {
      const miles = haversineMiles(location.lat, location.lng, show.lat, show.lng);
      let taste = 0;
      for (const g of show.genres) taste += scores[g] ?? 0;
      return { show, miles, taste };
    }).sort((a, b) => {
      if (b.taste !== a.taste) return b.taste - a.taste;
      return a.miles - b.miles;
    });
  }, [location, scores]);

  const yours = enriched.filter(
    (e) => e.show.source === "calendar" || e.show.source === "gmail",
  );
  const suggested = enriched.filter(
    (e) => e.show.source === "suggested" && e.miles <= radius,
  );
  const saved = enriched.filter((e) => profile?.savedShows.includes(e.show.id));

  const list =
    view === "yours" ? yours : view === "saved" ? saved : [...yours, ...suggested];

  return (
    <div className="shows-page">
      <header className="page-header">
        <p className="brand-mark sm">AUX CULT</p>
        <h1>Shows</h1>
        <p className="lede">
          Upcoming from your calendar & inbox, plus taste-matched suggestions nearby.
        </p>
        <p className="sample-note">
          Sample listings — connect Gmail/Calendar in a future update for live pulls.
        </p>
      </header>

      <div className="shows-controls">
        <div className="seg">
          <button type="button" className={view === "all" ? "on" : ""} onClick={() => setView("all")}>
            For you
          </button>
          <button type="button" className={view === "yours" ? "on" : ""} onClick={() => setView("yours")}>
            Your tickets
          </button>
          <button type="button" className={view === "saved" ? "on" : ""} onClick={() => setView("saved")}>
            Saved
          </button>
        </div>

        <label className="radius-label">
          Search radius: <strong>{radius} mi</strong>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </label>

        <label className="check-row">
          <input
            type="checkbox"
            checked={custom}
            onChange={(e) => setCustom(e.target.checked)}
          />
          Custom location
        </label>

        {custom ? (
          <div className="custom-loc">
            <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
              {LOCATIONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
            <input
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Label (optional)"
            />
          </div>
        ) : (
          <p className="loc-pill">Near {location.label}</p>
        )}
      </div>

      <div className="show-list">
        {list.length === 0 && <p className="empty">No shows in this range. Widen the radius or change location.</p>}
        {list.map(({ show, miles, taste }) => (
          <ShowCard
            key={show.id}
            show={show}
            miles={miles}
            taste={taste}
            saved={profile?.savedShows.includes(show.id) ?? false}
            onToggleSave={() => toggleSaveShow(show.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ShowCard({
  show,
  miles,
  taste,
  saved,
  onToggleSave,
}: {
  show: Show;
  miles: number;
  taste: number;
  saved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <article className="show-card">
      <div className="show-main">
        <div className="show-top">
          <span className={`source-tag ${show.source}`}>{show.source}</span>
          {taste > 0 && <span className="taste-tag">matches your taste</span>}
        </div>
        <h2>{show.artist}</h2>
        <p>
          {show.venue} · {show.city}
        </p>
        <p className="show-when">{formatWhen(show.date)} · ET</p>
        <p className="show-meta">
          {miles.toFixed(0)} mi away · from ${show.priceFrom}
        </p>
      </div>
      <div className="show-actions">
        <button
          type="button"
          className={`bookmark-btn ${saved ? "on" : ""}`}
          onClick={onToggleSave}
          aria-label={saved ? "Remove bookmark" : "Save show"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M7 4h10v16l-5-3-5 3V4z" />
          </svg>
        </button>
        <a className="buy-btn" href={show.ticketUrl} target="_blank" rel="noreferrer">
          Buy tickets
        </a>
      </div>
    </article>
  );
}
