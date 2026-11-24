import type { PixelCharacter } from "../data/characters";

type Props = {
  character: PixelCharacter;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
};

/** Procedural pixel-art face — tribute-style avatars, not official IP art. */
export function PixelAvatar({ character, size = 64, selected, onClick }: Props) {
  const [bg, accent, detail, ink] = character.colors;
  const seed = character.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const eyeY = 10 + (seed % 3);
  const mouth = seed % 4;
  const hair = seed % 5;
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      className={`pixel-avatar ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{ width: size, height: size }}
      aria-label={character.name}
      title={character.name}
    >
      <svg viewBox="0 0 32 32" width={size} height={size} shapeRendering="crispEdges">
        <rect width="32" height="32" fill={bg} />
        {/* hair / crown */}
        {hair === 0 && <rect x="6" y="4" width="20" height="6" fill={accent} />}
        {hair === 1 && (
          <>
            <rect x="4" y="2" width="6" height="10" fill={accent} />
            <rect x="22" y="2" width="6" height="10" fill={accent} />
            <rect x="10" y="4" width="12" height="4" fill={detail} />
          </>
        )}
        {hair === 2 && <rect x="8" y="3" width="16" height="8" fill={detail} />}
        {hair === 3 && (
          <>
            <rect x="5" y="5" width="22" height="4" fill={accent} />
            <rect x="10" y="2" width="12" height="4" fill={ink} />
          </>
        )}
        {hair === 4 && (
          <>
            <rect x="6" y="4" width="4" height="8" fill={accent} />
            <rect x="22" y="4" width="4" height="8" fill={accent} />
            <rect x="12" y="3" width="8" height="5" fill={detail} />
          </>
        )}
        {/* face */}
        <rect x="8" y="10" width="16" height="14" fill={ink === "#ffffff" || ink === "#fafafa" || ink === "#eceff1" || ink === "#fff8e1" || ink === "#f5f5f5" || ink === "#e8e8e8" ? ink : "#e8d5c4"} />
        {/* eyes */}
        <rect x="11" y={eyeY} width="3" height="3" fill={bg} />
        <rect x="18" y={eyeY} width="3" height="3" fill={bg} />
        <rect x="12" y={eyeY + 1} width="1" height="1" fill={detail} />
        <rect x="19" y={eyeY + 1} width="1" height="1" fill={detail} />
        {/* mouth */}
        {mouth === 0 && <rect x="13" y="20" width="6" height="2" fill={bg} />}
        {mouth === 1 && (
          <>
            <rect x="12" y="19" width="8" height="2" fill={detail} />
            <rect x="13" y="21" width="6" height="1" fill={bg} />
          </>
        )}
        {mouth === 2 && <rect x="14" y="20" width="4" height="2" fill={accent} />}
        {mouth === 3 && (
          <>
            <rect x="12" y="20" width="2" height="2" fill={bg} />
            <rect x="18" y="20" width="2" height="2" fill={bg} />
          </>
        )}
        {/* accent mark */}
        <rect x="8" y="12" width="2" height="2" fill={accent} opacity="0.85" />
        <rect x="22" y="16" width="2" height="4" fill={detail} opacity="0.7" />
      </svg>
    </Tag>
  );
}
