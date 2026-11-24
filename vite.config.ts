import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://eladbrumer.github.io/Aux-cult/
// Dev stays at `/` so `npm run dev` is unchanged. Preview serves the
// production build, so it uses the same base as `vite build`.
const pagesBase = '/Aux-cult/'

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? pagesBase : '/',
}))
