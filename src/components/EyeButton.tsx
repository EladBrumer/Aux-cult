import type { CSSProperties } from "react";

type Props = {
  active: boolean;
  hue: number;
  onClick: () => void;
};

export function EyeButton({ active, hue, onClick }: Props) {
  const iris = `hsl(${hue} 90% 55%)`;
  const glow = `hsl(${hue} 100% 60% / 0.55)`;

  return (
    <button
      type="button"
      className={`eye-btn ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label="Reels"
      style={{ "--iris": iris, "--glow": glow } as CSSProperties}
    >
      <span className="eye-orbit">
        <span className="eye-lid">
          <span className="eye-white">
            <span className="eye-iris">
              <span className="eye-pupil" />
              <span className="eye-shine" />
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
