import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    // Marketing routes have no request-specific data. Prerender their generated
    // HTML so the CDN can serve it directly; Nitro keeps SSR for unmatched routes.
    tanstackStart({
      prerender: { enabled: true, autoSubfolderIndex: false, crawlLinks: false, failOnError: true },
      // This site's small stylesheet can paint with the HTML, without a
      // render-blocking network round trip on slower mobile connections.
      server: { build: { inlineCss: true } },
    }),
    // Vercel builds through Nitro (Build Output API v3). Nitro detects the
    // Vercel preset during a Vercel build.
    nitro(),
    viteReact(),
  ],
})

export default config
