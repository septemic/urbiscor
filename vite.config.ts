import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    // The site ships no Netlify Edge Functions, and the emulator bundled with
    // this plugin launches Deno with `eval --allow-scripts`, a flag Deno 2.9
    // dropped. Turning the (unused) Edge Functions emulation off keeps local
    // dev working; Netlify Functions, Image CDN and redirects stay emulated.
    netlify({ dev: { edgeFunctions: { enabled: false } } }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
