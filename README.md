# Aux Cult

Social app for music lovers — reels, shows, genre chatrooms, and pixel profiles.

## Run locally

```bash
npm install
npm run dev
```

## Notes

- Account data is stored in the browser (`localStorage`).
- Show listings use sample data until Gmail/Calendar are connected in-app.
- Reels play generated genre-matched audio in the browser (tap unmute if needed).
- Bump `APP_TERMS_VERSION` in `src/data/terms.ts` whenever legal text changes so users re-accept.
