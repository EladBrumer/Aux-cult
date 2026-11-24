import { EyeButton } from "./EyeButton";

export type Tab = "shows" | "chat" | "reels" | "profile";

type Props = {
  tab: Tab;
  onChange: (t: Tab) => void;
  eyeHue: number;
};

export function BottomNav({ tab, onChange, eyeHue }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <div className="nav-side left">
        <button
          type="button"
          className={tab === "shows" ? "active" : ""}
          onClick={() => onChange("shows")}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16v12H4z" />
            <path d="M8 7V5a4 4 0 0 1 8 0v2" />
            <path d="M9 12h6" />
          </svg>
          <span>Shows</span>
        </button>
        <button
          type="button"
          className={tab === "chat" ? "active" : ""}
          onClick={() => onChange("chat")}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 6h14v10H8l-3 3V6z" />
          </svg>
          <span>Chats</span>
        </button>
      </div>

      <div className="eye-slot">
        <EyeButton active={tab === "reels"} hue={eyeHue} onClick={() => onChange("reels")} />
      </div>

      <div className="nav-side right">
        <button
          type="button"
          className={tab === "profile" ? "active" : ""}
          onClick={() => onChange("profile")}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
}
