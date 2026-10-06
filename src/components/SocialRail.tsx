import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { socialProfiles } from '@/config/social'
import { Icon } from './Icons'

const profiles = socialProfiles.filter((profile) => profile.url)

/** Native links and CSS motion; tooltip state changes only on interaction. */
export function SocialRail() {
  const [active, setActive] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Escape also dismisses mouse-hover labels when keyboard focus is elsewhere.
  // Listen only while a label is active; there is no document listener at idle.
  useEffect(() => {
    if (!active || dismissed) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDismissed(true)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, dismissed])

  const activate = () => {
    setActive(true)
    setDismissed(false)
  }
  if (!profiles.length) return null

  return (
    <nav
      className="social-rail"
      aria-label="Urmărește-ne pe rețelele sociale"
      onPointerLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setActive(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.matches(':hover') && !event.currentTarget.contains(event.relatedTarget)) setActive(false)
      }}
    >
      <ul>
        {profiles.map((profile) => (
          <li key={profile.label}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} pe ${profile.label} (se deschide într-o filă nouă)`}
              className="social-rail-link"
              data-tooltip-dismissed={dismissed || undefined}
              onPointerEnter={activate}
              onFocus={activate}
            >
              <Icon
                name={profile.icon}
                size={24}
                fill={profile.icon === 'facebook' ? 'currentColor' : 'none'}
                strokeWidth={profile.icon === 'facebook' ? 0 : 1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <span className="social-rail-label" aria-hidden="true">{profile.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
