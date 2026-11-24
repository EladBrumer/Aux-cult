import { useState } from "react";
import { useApp } from "../context/AppContext";

export function AuthPage() {
  const { signIn, signUp } = useApp();
  const [mode, setMode] = useState<"in" | "up">("up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = mode === "up" ? signUp(username, password) : signIn(username, password);
    setError(err);
  };

  return (
    <div className="auth-screen">
      <div className="auth-atmosphere" aria-hidden />
      <header className="auth-hero">
        <p className="brand-mark">AUX CULT</p>
        <h1>Where your taste finds its people.</h1>
        <p className="lede">Reels, shows, and chatrooms for the music-obsessed.</p>
      </header>

      <form className="auth-card" onSubmit={submit}>
        <div className="auth-tabs">
          <button type="button" className={mode === "up" ? "on" : ""} onClick={() => setMode("up")}>
            Create account
          </button>
          <button type="button" className={mode === "in" ? "on" : ""} onClick={() => setMode("in")}>
            Sign in
          </button>
        </div>
        <label>
          Username
          <input
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your_handle"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="primary-btn">
          {mode === "up" ? "Join Aux Cult" : "Enter"}
        </button>
      </form>
    </div>
  );
}
