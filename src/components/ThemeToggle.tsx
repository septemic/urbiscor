import { useEffect, useRef, useState } from 'react'
import { readThemePreference, themeStorageKey, type Theme } from '@/lib/theme'
import { Icon } from './Icons'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const preference = useRef<Theme | null>(null)

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const syncTheme = () => {
      const theme = preference.current ?? (system.matches ? 'dark' : 'light')
      document.documentElement.dataset.theme = theme
      setDark(theme === 'dark')
    }
    preference.current = readThemePreference()
    syncTheme()
    // Enable motion only after the saved/system theme has painted.
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.dataset.themeReady = 'true'
    })

    const onStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey && event.key !== null) return
      preference.current = readThemePreference()
      syncTheme()
    }
    system.addEventListener('change', syncTheme)
    window.addEventListener('storage', onStorage)
    return () => {
      window.cancelAnimationFrame(frame)
      delete document.documentElement.dataset.themeReady
      system.removeEventListener('change', syncTheme)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggleTheme = () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    preference.current = theme
    document.documentElement.dataset.theme = theme
    setDark(theme === 'dark')
    try {
      window.localStorage.setItem(themeStorageKey, theme)
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Mod întunecat"
      aria-pressed={dark}
      title={dark ? 'Activează modul luminos' : 'Activează modul întunecat'}
      className="theme-toggle"
    >
      <Icon name="moon" size={21} className="theme-icon-moon" />
      <Icon name="sun" size={21} className="theme-icon-sun" />
    </button>
  )
}
