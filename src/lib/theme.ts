export type Theme = 'light' | 'dark'

export const themeStorageKey = 'urbiscor-theme'

export function readThemePreference(): Theme | null {
  try {
    const value = window.localStorage.getItem(themeStorageKey)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// Runs before styles and hydration so a saved preference never flashes the wrong theme.
export const themeBoot = `(()=>{let theme;try{theme=localStorage.getItem('${themeStorageKey}')}catch{}document.documentElement.dataset.theme=theme==='light'||theme==='dark'?theme:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`
