import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'

function hydrate() {
  startTransition(() => {
    hydrateRoot(document, <StrictMode><StartClient /></StrictMode>)
  })
}

// The complete page is already in the HTML. Give it a paint opportunity before
// hydration uses the main thread; never wait for idle time or delay downloads.
// Background tabs do not reliably receive animation frames.
if (document.visibilityState === 'hidden') {
  hydrate()
} else {
  requestAnimationFrame(() => requestAnimationFrame(hydrate))
}
