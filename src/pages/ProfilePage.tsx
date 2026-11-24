import { useMemo, useRef, useState } from "react";
import { CHARACTERS } from "../data/characters";
import { ARTISTS } from "../data/artists";
import { useApp } from "../context/AppContext";
import { PixelAvatar } from "../components/PixelAvatar";

export function ProfilePage() {
  const { profile, updateProfile, signOut } = useApp();
  const [editingChar, setEditingChar] = useState(false);
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [filter, setFilter] = useState<"popular" | "all">("popular");
  const fileRef = useRef<HTMLInputElement>(null);

  const character = CHARACTERS.find((c) => c.id === profile?.characterId) ?? CHARACTERS[0];
  const likedArtists = useMemo(
    () => ARTISTS.filter((a) => profile?.artists.includes(a.id)),
    [profile?.artists],
  );

  const visible = filter === "popular" ? CHARACTERS.filter((c) => c.popular) : CHARACTERS;

  if (!profile) return null;

  return (
    <div className="profile-page">
      <header className="profile-hero">
        <p className="brand-mark sm">AUX CULT</p>
        <div className="profile-identity">
          <button
            type="button"
            className="avatar-wrap"
            onClick={() => fileRef.current?.click()}
            aria-label="Set profile picture"
          >
            {profile.avatarDataUrl ? (
              <img src={profile.avatarDataUrl} alt="" className="profile-pic" />
            ) : (
              <PixelAvatar character={character} size={88} />
            )}
            <span className="edit-badge">Photo</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                updateProfile({ avatarDataUrl: String(reader.result) });
              };
              reader.readAsDataURL(file);
            }}
          />
          <div>
            <h1>@{profile.username}</h1>
            <p className="char-name">{character.name}</p>
          </div>
        </div>
      </header>

      <section className="profile-section">
        <div className="section-head">
          <h2>Bio</h2>
          <button
            type="button"
            className="text-btn"
            onClick={() => updateProfile({ bio })}
          >
            Save
          </button>
        </div>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="What are you spinning lately?"
          rows={3}
          maxLength={280}
        />
      </section>

      <section className="profile-section">
        <div className="section-head">
          <h2>Pixel character</h2>
          <button type="button" className="text-btn" onClick={() => setEditingChar((v) => !v)}>
            {editingChar ? "Done" : "Edit"}
          </button>
        </div>
        <div className="current-char">
          <PixelAvatar character={character} size={72} />
          <div>
            <strong>{character.name}</strong>
            <p>{character.tags.join(" · ")}</p>
          </div>
        </div>
        {editingChar && (
          <>
            <div className="seg tight">
              <button
                type="button"
                className={filter === "popular" ? "on" : ""}
                onClick={() => setFilter("popular")}
              >
                Popular
              </button>
              <button
                type="button"
                className={filter === "all" ? "on" : ""}
                onClick={() => setFilter("all")}
              >
                All {CHARACTERS.length}
              </button>
            </div>
            <div className="char-grid">
              {visible.map((c) => (
                <div key={c.id} className="char-pick">
                  <PixelAvatar
                    character={c}
                    size={56}
                    selected={c.id === character.id}
                    onClick={() => updateProfile({ characterId: c.id })}
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="profile-section">
        <h2>Your artists</h2>
        {likedArtists.length === 0 ? (
          <p className="empty">You skipped artist picks — reels stay mixed.</p>
        ) : (
          <div className="artist-wrap">
            {likedArtists.map((a) => (
              <span key={a.id} className="mini-chip">
                {a.name}
              </span>
            ))}
          </div>
        )}
      </section>

      <button type="button" className="ghost-btn danger" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
