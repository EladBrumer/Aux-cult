import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { APP_TERMS_VERSION } from "../data/terms";
import { load, remove, save } from "../lib/storage";

export type UserProfile = {
  username: string;
  password: string;
  bio: string;
  characterId: string;
  avatarDataUrl: string | null;
  artists: string[];
  onboardingDone: boolean;
  termsVersion: string;
  is18: boolean;
  likedReels: string[];
  savedShows: string[];
  reelComments: Record<string, { id: string; user: string; text: string }[]>;
  chatMessages: Record<string, { id: string; user: string; text: string; at: number }[]>;
};

type Session = {
  username: string;
};

type AppState = {
  session: Session | null;
  profile: UserProfile | null;
  accounts: Record<string, UserProfile>;
  signUp: (username: string, password: string) => string | null;
  signIn: (username: string, password: string) => string | null;
  acceptTerms: () => void;
  completeOnboarding: (artists: string[]) => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  toggleLike: (reelId: string) => void;
  addComment: (reelId: string, text: string) => void;
  toggleSaveShow: (showId: string) => void;
  sendChat: (roomId: string, text: string) => void;
  setIs18: (v: boolean) => void;
  signOut: () => void;
  needsTerms: boolean;
  needsOnboarding: boolean;
};

const AppContext = createContext<AppState | null>(null);

function emptyProfile(username: string, password: string): UserProfile {
  return {
    username,
    password,
    bio: "",
    characterId: "char-0",
    avatarDataUrl: null,
    artists: [],
    onboardingDone: false,
    termsVersion: "",
    is18: false,
    likedReels: [],
    savedShows: [],
    reelComments: {},
    chatMessages: {},
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Record<string, UserProfile>>(() =>
    load("accounts", {}),
  );
  const [session, setSession] = useState<Session | null>(() => load("session", null));

  const profile = session ? (accounts[session.username] ?? null) : null;

  const persistAccounts = useCallback((next: Record<string, UserProfile>) => {
    setAccounts(next);
    save("accounts", next);
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<UserProfile>) => {
      if (!session) return;
      const current = accounts[session.username];
      if (!current) return;
      const next = {
        ...accounts,
        [session.username]: { ...current, ...patch },
      };
      persistAccounts(next);
    },
    [accounts, persistAccounts, session],
  );

  const signUp = useCallback(
    (username: string, password: string) => {
      const key = username.trim().toLowerCase();
      if (key.length < 3) return "Username must be at least 3 characters.";
      if (!/^[a-z0-9_]+$/i.test(key)) return "Use letters, numbers, and underscores only.";
      if (password.length < 4) return "Password must be at least 4 characters.";
      if (accounts[key]) return "That username is taken.";
      const next = { ...accounts, [key]: emptyProfile(key, password) };
      persistAccounts(next);
      const s = { username: key };
      setSession(s);
      save("session", s);
      return null;
    },
    [accounts, persistAccounts],
  );

  const signIn = useCallback(
    (username: string, password: string) => {
      const key = username.trim().toLowerCase();
      const acc = accounts[key];
      if (!acc || acc.password !== password) return "Wrong username or password.";
      const s = { username: key };
      setSession(s);
      save("session", s);
      return null;
    },
    [accounts],
  );

  const acceptTerms = useCallback(() => {
    updateProfile({ termsVersion: APP_TERMS_VERSION });
  }, [updateProfile]);

  const completeOnboarding = useCallback(
    (artists: string[]) => {
      updateProfile({ artists, onboardingDone: true });
    },
    [updateProfile],
  );

  const toggleLike = useCallback(
    (reelId: string) => {
      if (!profile) return;
      const liked = profile.likedReels.includes(reelId)
        ? profile.likedReels.filter((id) => id !== reelId)
        : [...profile.likedReels, reelId];
      updateProfile({ likedReels: liked });
    },
    [profile, updateProfile],
  );

  const addComment = useCallback(
    (reelId: string, text: string) => {
      if (!profile || !text.trim()) return;
      const existing = profile.reelComments[reelId] ?? [];
      const entry = {
        id: `u-${Date.now()}`,
        user: profile.username,
        text: text.trim(),
      };
      updateProfile({
        reelComments: { ...profile.reelComments, [reelId]: [...existing, entry] },
      });
    },
    [profile, updateProfile],
  );

  const toggleSaveShow = useCallback(
    (showId: string) => {
      if (!profile) return;
      const saved = profile.savedShows.includes(showId)
        ? profile.savedShows.filter((id) => id !== showId)
        : [...profile.savedShows, showId];
      updateProfile({ savedShows: saved });
    },
    [profile, updateProfile],
  );

  const sendChat = useCallback(
    (roomId: string, text: string) => {
      if (!profile || !text.trim()) return;
      const existing = profile.chatMessages[roomId] ?? [];
      const entry = {
        id: `m-${Date.now()}`,
        user: profile.username,
        text: text.trim(),
        at: Date.now(),
      };
      updateProfile({
        chatMessages: { ...profile.chatMessages, [roomId]: [...existing, entry] },
      });
    },
    [profile, updateProfile],
  );

  const setIs18 = useCallback(
    (v: boolean) => updateProfile({ is18: v }),
    [updateProfile],
  );

  const signOut = useCallback(() => {
    setSession(null);
    remove("session");
  }, []);

  const needsTerms = !!profile && profile.termsVersion !== APP_TERMS_VERSION;
  const needsOnboarding = !!profile && !needsTerms && !profile.onboardingDone;

  const value = useMemo(
    () => ({
      session,
      profile,
      accounts,
      signUp,
      signIn,
      acceptTerms,
      completeOnboarding,
      updateProfile,
      toggleLike,
      addComment,
      toggleSaveShow,
      sendChat,
      setIs18,
      signOut,
      needsTerms,
      needsOnboarding,
    }),
    [
      session,
      profile,
      accounts,
      signUp,
      signIn,
      acceptTerms,
      completeOnboarding,
      updateProfile,
      toggleLike,
      addComment,
      toggleSaveShow,
      sendChat,
      setIs18,
      signOut,
      needsTerms,
      needsOnboarding,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
