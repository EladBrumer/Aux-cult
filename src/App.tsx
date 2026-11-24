import { useCallback, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { BottomNav, type Tab } from "./components/BottomNav";
import { AuthPage } from "./pages/AuthPage";
import { TermsPage } from "./pages/TermsPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { ReelsPage } from "./pages/ReelsPage";
import { ShowsPage } from "./pages/ShowsPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";

function Shell() {
  const { session, needsTerms, needsOnboarding } = useApp();
  const [tab, setTab] = useState<Tab>("reels");
  const [eyeHue, setEyeHue] = useState(48);
  const onHueChange = useCallback((h: number) => setEyeHue(h), []);

  if (!session) return <AuthPage />;
  if (needsTerms) return <TermsPage />;
  if (needsOnboarding) return <OnboardingPage />;

  return (
    <div className="app-shell">
      <main className="app-main">
        {tab === "reels" && <ReelsPage onHueChange={onHueChange} />}
        {tab === "shows" && <ShowsPage />}
        {tab === "chat" && <ChatPage />}
        {tab === "profile" && <ProfilePage />}
      </main>
      <BottomNav tab={tab} onChange={setTab} eyeHue={eyeHue} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
