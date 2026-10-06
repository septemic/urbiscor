import { useEffect, useState } from 'react'
import { site, whatsappMessage } from '@/config/site'
import { socialProfiles } from '@/config/social'
import { Icon, WhatsAppIcon } from './Icons'

const actions = [
  { label: 'WhatsApp', icon: 'whatsapp' as const, url: whatsappMessage() },
  ...socialProfiles.filter((profile) => profile.url),
]

/** Native links and CSS motion; tooltip state changes only on interaction. */
export function ContactRail() {
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
  return (
    <nav
      className="contact-rail"
      aria-label="Contact și rețele sociale"
      onPointerLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setActive(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.matches(':hover') && !event.currentTarget.contains(event.relatedTarget)) setActive(false)
      }}
    >
      <ul>
        {actions.map((action) => (
          <li key={action.label} className={action.icon === 'whatsapp' ? 'contact-rail-primary' : 'contact-rail-social'}>
            <a
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${action.icon === 'whatsapp' ? 'Discută proiectul pe WhatsApp' : `${site.name} pe ${action.label}`} (se deschide într-o filă nouă)`}
              className="contact-rail-link"
              data-tooltip-dismissed={dismissed || undefined}
              onPointerEnter={activate}
              onFocus={activate}
            >
              {action.icon === 'whatsapp' ? (
                <WhatsAppIcon size={24} viewBox="-1 -1 26 26" />
              ) : (
                <Icon
                  name={action.icon}
                  size={24}
                  fill={action.icon === 'facebook' ? 'currentColor' : 'none'}
                  strokeWidth={action.icon === 'facebook' ? 0 : 1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <span className="contact-rail-label" aria-hidden="true">
                {action.icon === 'whatsapp' ? 'Discută pe WhatsApp' : action.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
