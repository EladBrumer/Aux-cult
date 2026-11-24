import { useEffect, useMemo, useRef, useState } from "react";
import { genreScoreFromArtists } from "../data/artists";
import { rankReels, type Reel } from "../data/reels";
import { useApp } from "../context/AppContext";
import { ensureAudio, playReelAudio, stopReelAudio } from "../lib/audio";

type Props = {
  onHueChange: (hue: number) => void;
};

function hueFromGradient(g: [string, string, string]): number {
  const hex = g[1].replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const gch = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, gch, b);
  const min = Math.min(r, gch, b);
  if (max === min) return 40;
  let h = 0;
  const d = max - min;
  if (max === r) h = ((gch - b) / d) % 6;
  else if (max === gch) h = (b - r) / d + 2;
  else h = (r - gch) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return h;
}

export function ReelsPage({ onHueChange }: Props) {
  const { profile, toggleLike, addComment } = useApp();
  const scores = useMemo(
    () => genreScoreFromArtists(profile?.artists ?? []),
    [profile?.artists],
  );
  const feed = useMemo(() => rankReels(scores), [scores]);
  const [index, setIndex] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [muted, setMuted] = useState(false);
  const touchY = useRef<number | null>(null);
  const reel = feed[index % feed.length];

  useEffect(() => {
    if (!reel) return;
    onHueChange(hueFromGradient(reel.gradient));
  }, [reel, onHueChange]);

  useEffect(() => {
    if (!reel || muted) {
      stopReelAudio();
      return;
    }
    let cancelled = false;
    (async () => {
      await ensureAudio();
      if (!cancelled) playReelAudio(reel);
    })();
    return () => {
      cancelled = true;
      stopReelAudio();
    };
  }, [reel, muted]);

  const go = (dir: 1 | -1) => {
    setCommentOpen(false);
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return feed.length - 1;
      return next % feed.length;
    });
  };

  const liked = profile?.likedReels.includes(reel.id) ?? false;
  const userComments = profile?.reelComments[reel.id] ?? [];
  const allComments = [...reel.comments, ...userComments];

  return (
    <div
      className="reels-page"
      onTouchStart={(e) => {
        touchY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchY.current == null) return;
        const dy = e.changedTouches[0].clientY - touchY.current;
        if (dy < -50) go(1);
        if (dy > 50) go(-1);
        touchY.current = null;
      }}
      onWheel={(e) => {
        if (Math.abs(e.deltaY) < 30) return;
        go(e.deltaY > 0 ? 1 : -1);
      }}
    >
      <ReelStage reel={reel} />
      <div className="reel-overlay">
        <div className="reel-copy">
          <p className="brand-watermark">AUX CULT</p>
          <h2>{reel.title}</h2>
          <p className="reel-artist">{reel.artist}</p>
          <p className="reel-caption">{reel.caption}</p>
          <div className="reel-tags">
            {reel.genres.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </div>
        </div>
        <div className="reel-actions">
          <button
            type="button"
            className={liked ? "liked" : ""}
            onClick={() => toggleLike(reel.id)}
            aria-label="Like"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
            </svg>
            <span>{reel.likes + (liked ? 1 : 0)}</span>
          </button>
          <button type="button" onClick={() => setCommentOpen(true)} aria-label="Comments">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 6h14v10H9l-4 3V6z" />
            </svg>
            <span>{allComments.length}</span>
          </button>
          <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute" : "Mute"}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
              {muted ? (
                <>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" />
                  <path d="M17 9l4 6M21 9l-4 6" />
                </>
              ) : (
                <>
                  <path d="M4 9v6h4l5 4V5L8 9H4z" />
                  <path d="M16 8a5 5 0 0 1 0 8" />
                </>
              )}
            </svg>
            <span>{muted ? "Muted" : "Sound"}</span>
          </button>
          <button type="button" className="nav-mini" onClick={() => go(1)} aria-label="Next reel">
            ↓
          </button>
        </div>
      </div>

      {commentOpen && (
        <div className="comments-sheet">
          <div className="sheet-head">
            <h3>Comments</h3>
            <button type="button" onClick={() => setCommentOpen(false)}>
              Close
            </button>
          </div>
          <ul className="comment-list">
            {allComments.map((c) => (
              <li key={c.id}>
                <strong>@{c.user}</strong>
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
          <form
            className="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(reel.id, draft);
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a comment…"
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

function ReelStage({ reel }: { reel: Reel }) {
  return (
    <div
      className="reel-stage"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${reel.gradient[2]}55, transparent 50%),
          linear-gradient(160deg, ${reel.gradient[0]}, ${reel.gradient[1]} 55%, ${reel.gradient[2]})`,
      }}
    >
      <div className="reel-viz" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
      <div className="vinyl-spin" aria-hidden />
    </div>
  );
}
