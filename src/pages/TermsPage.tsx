import { APP_TERMS_VERSION, TERMS_BODY, TERMS_TITLE } from "../data/terms";
import { useApp } from "../context/AppContext";

export function TermsPage() {
  const { acceptTerms, profile } = useApp();
  const updating = !!profile?.termsVersion;

  return (
    <div className="terms-screen">
      <div className="terms-panel">
        <p className="brand-mark sm">AUX CULT</p>
        <h1>{updating ? "Updated terms" : TERMS_TITLE}</h1>
        <p className="lede">
          {updating
            ? "We refreshed the legal language with the latest app changes. Please review and accept to continue."
            : "Please read and accept before setting up your account."}
        </p>
        <p className="terms-version">Version {APP_TERMS_VERSION}</p>
        <pre className="terms-body">{TERMS_BODY}</pre>
        <button type="button" className="primary-btn" onClick={acceptTerms}>
          Accept & continue
        </button>
      </div>
    </div>
  );
}
